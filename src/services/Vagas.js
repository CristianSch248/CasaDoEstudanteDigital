const Vagas = require('../repositories/Vagas')
const { sequelize } = require('../db')

async function novaVaga(body){
    const t = await sequelize.transaction()
    
    try{
        let VagaCriada = await Vagas.create({
            dt_entrada: body.dt_entrada,
            id_aluno: body.id_aluno,
            id_apartamento: body.id_apartamento,
            ativo: true
        }, t)
		if (!VagaCriada) return { success: false, message: 'Houve um erro ao cadastrar o Apartamento.'}
        
        await VagaCriada.save({ transaction: t })
		await t.commit()

		return { success: true, message: 'Vaga criada com sucesso!'}
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao cadastrar a vaga!'}
    }
}

async function buscarVagas(){
    try {
        let Vagas = await Vagas.findAll([], [])
        return { success: true, message: Vagas}
    } catch (error) {
        console.log('error:', error)
        return { success: false, message: 'Houve um problema ao consultar a lista de Vagas!'}
    }
}

async function buscarVaga(id){
    try {
        let Vaga = await Vagas.findOne([], [{ id : id }])
        if (!Vaga) return { success: false, message: 'Vaga não encontrada.' }  
        return { success: true, message: Vaga}
    } catch (error) {
        console.log("error:", error)
        return { success: false, message: 'Erro ao buscar Vaga.'}
    }
}

async function apagarVaga(id){
    const t = await sequelize.transaction()
    try{
        let Vaga = await Vagas.deleteItem(id, t)
		if (!Vaga) return { success: false, message: 'Houve um erro ao apagar Vaga.'}

		await t.commit()

		return { success: true, message: 'Vaga apagada!'}
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao apagar Vaga!'}
    }
}

async function atualizarVaga(body){
    const t = await sequelize.transaction()

    try{
        let Vaga = await Vagas.findOne([], [{ id : body.id }])
        if (!Vaga) return { success: false, message: 'Vagas não encontrada'}
    
        if(body.ativo) Vaga.ativo = body.ativo
        if(body.observacao) Vaga.observacao = body.observacao
        if(body.dt_saida) Vaga.dt_saida = body.dt_saida

        await Vaga.save({transaction: t})
        await t.commit()
        console.log('(log) - Vaga alterada com sucesso')
        
        return { success: true, message: Vaga } 
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao editar o Apartamento'}
    }
}

module.exports = {
    novaVaga,
    buscarVagas,
    buscarVaga,
    apagarVaga,
    atualizarVaga,
}