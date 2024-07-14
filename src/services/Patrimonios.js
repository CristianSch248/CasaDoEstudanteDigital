const Patrimonios = require('../repositories/Patrimonios')
const { sequelize } = require('../db')

async function novoPatrimonio(body){
    const t = await sequelize.transaction()
    try{
        let patrimonioCriado = await Patrimonios.create({
            descricao: body.descricao,
            estado: body.estado,
        }, t)
		if (!patrimonioCriado) return { success: false, message: 'Houve um erro ao cadastrar o Patrimônio.'}
        
        await patrimonioCriado.save({ transaction: t })
		await t.commit()

		return { success: true, message: 'Patrimônio cadastrado com sucesso!'}
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao cadastrar Patrimônio!'}
    }
}

async function buscarPatrimonios(){
    try {
        let patrimonio = await Patrimonios.findAll(['id', 'descricao', 'estado'], [{ id_apartamento: null }])
        return { success: true, message: patrimonio}
    } catch (error) {
        console.log('error:', error)
        return { success: false, message: 'Houve um problema ao consultar a lista de Patrimônio!'}
    }
}

async function buscarPatrimonio(id){
    try {
        let patrimonio = await Patrimonios.findOne([], [{ id: id }])
        if (!patrimonio) return { success: false, message: 'Patrimônio não encontrado.' }  
        return { success: true, message: patrimonio}
    } catch (error) {
        console.log("error:", error)
        return { success: false, message: 'Erro ao buscar Patrimônio.'}
    }
}

async function apagarPatrimonio(id){
    const t = await sequelize.transaction()
    try{
        let patrimonio = await Patrimonios.deleteItem(id, t)
		if (!patrimonio) return { success: false, message: 'Houve um erro ao apagar o Patrimônio.'}

		await t.commit()

		return { success: true, message: 'Patrimônio apagado!'}
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao apagar Patrimônio!'}
    }
}

async function atualizarPatrimonio(body){
    console.log("🚀 ~ atualizarPatrimonio ~ body:", body)
    const t = await sequelize.transaction()

    try {
        let patrimonio = await Patrimonios.findOne([], [{ id : body.id }])
        if (!patrimonio) return { success: false, message: 'Patrimônio não encontrado'}

        if (body.descricao) patrimonio.descricao = body.descricao
        if (body.estado) patrimonio.estado = body.estado
        if (body.id_apartamento) patrimonio.id_apartamento = body.id_apartamento

        await patrimonio.save({transaction: t})
        await t.commit()
        
        return { success: true, message: 'Patrimônio alterado com sucesso!' } 
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao editar o Patrimônio'}
    }
}

module.exports = {
    novoPatrimonio,
    buscarPatrimonios,
    buscarPatrimonio,
    apagarPatrimonio,
    atualizarPatrimonio,
}