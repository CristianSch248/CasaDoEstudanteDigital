const Manutencoes = require('../repositories/Manutencoes')
const Vagas = require('../repositories/Vagas')
const { sequelize } = require('../db')
const moment = require('moment');

async function novaManutencao(body, id){
    const t = await sequelize.transaction()
    try {
        
        let vaga = await Vagas.findOne(['id', 'id_aluno', 'id_apartamento'], { id_aluno : id })
        if (!vaga) {
            await t.rollback();
            return { success: false, message: 'Vaga do aluno não encontrada' };
        }

        const dt_manutencao = moment(body.dt_manutencao, 'YYYY/MM/DD').format('YYYY-MM-DD');
        const hora_manutencao = moment(body.hora_manutencao, 'HH:mm').format('HH:mm:ss');

        let ManutencaoCriada = await Manutencoes.create({
            id_aluno: vaga.id_aluno,
            id_usuario_confirmador: null,
            id_apartamento: vaga.id_apartamento,
            caso: body.caso,
            material_usado: null,
            descricao_atividade: null,
            dt_manutencao: dt_manutencao,
            hora_manutencao: hora_manutencao,
            status: 1
        }, t)
		if (!ManutencaoCriada) return { success: false, message: 'Erro ao solicitar Manutenção'}
        
        await ManutencaoCriada.save({ transaction: t })
		await t.commit()

		return { success: true, message: 'Manutenção solicitada'}
    } catch (error) {
        console.log("novaManutencao ~ error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao solicitar Manutenção!'}
    }
}

async function buscarManutencoes(){
    try {
        let manutencoes = await Manutencoes.findAll(['id', 'caso', 'dt_manutencao', 'hora_manutencao'], [{ status: 1 }])
        return { success: true, message: manutencoes}
    } catch (error) {
        console.log('buscarVistorias ~ error:', error)
        return { success: false, message: 'Houve um problema ao consultar as Manutenções!'}
    }
}

async function buscarManutencao(id){
    try {
        let manutencoes = await Manutencoes.findOne([], [{ id: id }])
        return { success: true, message: manutencoes}
    } catch (error) {
        console.log('buscarVistoria ~ error:', error)
        return { success: false, message: 'Houve um problema ao consultar a Manutenção!'}
    }
}

async function apagarManutencao(id){
    const t = await sequelize.transaction()
    try{
        let manutencao = await Manutencoes.deleteItem(id, t)
		if (!manutencao) return { success: false, message: 'Houve um erro ao apagar a Manutenção.'}

		await t.commit()

		return { success: true, message: 'Manutenção apagada!'}
    } catch (error){
        console.log("apagarVistoria ~ error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao apagar vistoria!'}
    }
}

async function atualizarManutencao(body){
    console.log("🚀 ~ atualizarManutencao ~ body:", body)
    const t = await sequelize.transaction()

    try{
        let manutencao = await Manutencoes.findOne([], [{ id : body.id }])
        if (!manutencao) return { success: false, message: 'Manutenção não encontrada'}
    
        if(body.id_usuario_confirmador) manutencao.id_usuario_confirmador = body.id_usuario_confirmador
        if(body.caso) manutencao.caso = body.caso
        if(body.material_usado) manutencao.material_usado = body.material_usado
        if(body.descricao_atividade) manutencao.descricao_atividade = body.descricao_atividade
        if(body.dt_manutencao) manutencao.dt_manutencao = body.dt_manutencao
        if(body.hora_manutencao) manutencao.hora_manutencao = body.hora_manutencao
        if(body.status) manutencao.status = body.status
    
        await manutencao.save({transaction: t})
        await t.commit()
        
        return { success: true, message: 'Manutenção Atualizada' } 
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao editar o Apartamento'}
    }
}

module.exports = {
    novaManutencao,
    buscarManutencoes,
    buscarManutencao,
    apagarManutencao,
    atualizarManutencao,
}