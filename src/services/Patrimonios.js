const Patrimonios = require('../repositories/Patrimonios')
const { sequelize } = require('../db')

async function novoPatrimonio(body){
    const t = await sequelize.transaction()
    try{
        let patrimonioCriado = await Patrimonios.create({
            descricao: body.numero,
            estado: body.bloco,
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
        let patrimonio = await Patrimonios.findAll(['id', 'descricao', 'estado'], [])
        return { success: true, message: patrimonio}
    } catch (error) {
        console.log('error:', error)
        return { success: false, message: 'Houve um problema ao consultar a lista de Patrimônio!'}
    }
}

async function buscarPatrimonio(id){
    try {
        let patrimonio = await Patrimonios.findOne([], [{ id : id }])
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
    const t = await sequelize.transaction()

    try{
        let patrimonio = await Patrimonios.findOne([], [{ id : body.id }])
        if (!patrimonio) return { success: false, message: 'Patrimônio não encontrado'}

        if (body.bloco) patrimonio.descricao = body.bloco
        if (body.bloco) patrimonio.estado = body.bloco
        if (body.id_apartamento) patrimonio.estado = body.id_apartamento

        await patrimonio.save({transaction: t})
        await t.commit()
        console.log('(log) - Patrimônio alterado com sucesso')
        
        return { success: true, message: Apto } 
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