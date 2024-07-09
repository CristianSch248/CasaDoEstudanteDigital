const Vistorias = require('../repositories/Vistorias')
const Vagas = require('../repositories/Vagas')
const { sequelize } = require('../db')
const moment = require('moment');

async function novaVistoria(body, id){
    const t = await sequelize.transaction()
    
    try {
        
        let vaga = await Vagas.findOne(['id', 'id_aluno', 'id_apartamento'], { id_aluno : id })
        if (!vaga) {
            await t.rollback();
            return { success: false, message: 'Vaga do aluno não encontrada' };
        }

        const dt_vistoria = moment(body.dt_vistoria, 'YYYY/MM/DD').format('YYYY-MM-DD');
        const hora_vistoria = moment(body.hora_vistoria, 'HH:mm').format('HH:mm:ss');

        let VistoriaCriada = await Vistorias.create({
            id_aluno: vaga.id_aluno,
            id_usuario_confirmador: null,
            id_apartamento: vaga.id_apartamento,
            dt_vistoria: dt_vistoria,
            hora_vistoria: hora_vistoria,
            status: 1, 
            Observacoes: null
        }, t)
		if (!VistoriaCriada) return { success: false, message: 'Houve um erro ao cadastrar o Usuario.'}
        
        await VistoriaCriada.save({ transaction: t })
		await t.commit()

		return { success: true, message: 'Vistoria cadastrada'}
    } catch (error) {
        console.log("novaVistoria ~ error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao cadastrar vistoria!'}
    }
}

async function buscarVistorias(status){
    try {
        let Vistoria = await Vistorias.findAll(['id', 'dt_vistoria', 'hora_vistoria'], [{ status: 1 }])
        return { success: true, message: Vistoria}
    } catch (error) {
        console.log('buscarVistorias ~ error:', error)
        return { success: false, message: 'Houve um problema ao consultar as vistorias!'}
    }
}

async function buscarVistoria(id){
    try {
        let Vistoria = await Vistorias.findOne([], [{ id: id }])
        return { success: true, message: Vistoria}
    } catch (error) {
        console.log('buscarVistoria ~ error:', error)
        return { success: false, message: 'Houve um problema ao consultar a vistoria!'}
    }
}

async function apagarVistoria(id){
    const t = await sequelize.transaction()
    try{
        let Vistoria = await Vistorias.deleteItem(id, t)
		if (!Vistoria) return { success: false, message: 'Houve um erro ao apagar o Apartamento.'}

		await t.commit()

		return { success: true, message: 'Vistoria apagada!'}
    } catch (error){
        console.log("apagarVistoria ~ error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao apagar vistoria!'}
    }
}

async function atualizarVistoria(body){
    const t = await sequelize.transaction()

    try{
        let Vistoria = await Vistorias.findOne([], [{ id : body.id }])
        if (!Vistoria) return { success: false, message: 'Vistoria não encontrada'}
    
        if(body.id_usuario_confirmador) Vistoria.id_usuario_confirmador = body.id_usuario_confirmador
        if(body.dt_vistoria) Vistoria.dt_vistoria = body.dt_vistoria
        if(body.hora_vistoria) Vistoria.hora_vistoria = body.hora_vistoria
        if(body.status) Vistoria.status = body.status
        if(body.Observacoes) Vistoria.Observacoes = body.Observacoes
    
        await Vistoria.save({transaction: t})
        await t.commit()
        console.log('(log) - Apartamento alterado com sucesso')
        
        return { success: true, message: Vistoria } 
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao editar o Apartamento'}
    }
}

module.exports = {
    novaVistoria,
    buscarVistorias,
    buscarVistoria,
    apagarVistoria,
    atualizarVistoria,
}