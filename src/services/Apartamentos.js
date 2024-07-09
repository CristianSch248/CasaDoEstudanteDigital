const Apartamentos = require('../repositories/Apartamentos')
const Vagas = require('../repositories/Vagas')
const Usuarios = require('../repositories/Usuarios')
const Vistorias = require('../repositories/Vistorias')
const Manutencoes = require('../repositories/Manutencoes')
const Patrimonios = require('../repositories/Patrimonios')

const { sequelize } = require('../db')
const Apartamento = require('../models/Apartamentos')

async function novoApartamento(body){
    const t = await sequelize.transaction()
    
    try{
        let AptoCriado = await Apartamentos.create({
            numero: body.numero,
            bloco: body.bloco,
            vagas: body.vagas,
        }, t)
		if (!AptoCriado) return { success: false, message: 'Houve um erro ao cadastrar o Apartamento.'}
        
        await AptoCriado.save({ transaction: t })
		await t.commit()

		return { success: true, message: 'Apartamento cadastrado com sucesso!'}
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao cadastrar Apartamento!'}
    }
}

async function buscarApartamentos(){
    try {
        let Apto = await Apartamentos.findAll(['id', 'numero', 'bloco', 'vagas'], [])
        return { success: true, message: Apto}
    } catch (error) {
        console.log('error:', error)
        return { success: false, message: 'Houve um problema ao consultar a lista de usuarios!'}
    }
}

async function buscarVagas(){
    try {
        let ListaDeVagas = []
        let Aptos = await Apartamentos.findAll(['id', 'numero', 'bloco', 'vagas'], [])

        for(let ap of Aptos){ 
            let vagas = await Vagas.findAll([], [{id_apartamento: ap.id}, { ativo: true }])
            let Apartamento = {
                apartamento_numero: ap.numero,
                vagas_total: ap.vagas,
                vagas_disponiveis: ap.vagas - vagas.length,
                vagas_ocupadas: vagas.length,
            }
            ListaDeVagas.push(Apartamento)
        }

        return { success: true, message: ListaDeVagas}
    } catch (error) {
        console.log('error:', error)
        return { success: false, message: 'Houve um problema ao consultar a lista de usuarios!'}
    }
}

async function MeuApartamento(id_user){
    let celogasDeApartamento = []
    
    try {
        let minhaVaga = await Vagas.findOne([], [{ id_aluno: id_user }])
        if (!minhaVaga) return { success: false, message: 'Sua vaga não foi encontrada' } 

        let Apto = await Apartamentos.findOne([], [{ id : minhaVaga.id_apartamento }])
        if (!Apto) return { success: false, message: 'Dados do seu apartamento não encontrados' }  

        let outrasVagas = await Vagas.findAll([], [{ id_apartamento : Apto.id }, { ativo: true }])

        if(outrasVagas.length > 0){
            for(let vaga of outrasVagas){
                let ColegaAparatamento = await Usuarios.findOne(['id', 'nome', 'email', 'telefone'], [{ id: vaga.id_aluno } ])
                celogasDeApartamento.push(ColegaAparatamento)
            }
        }
        

        let patrimoniosDoApartamento = await Patrimonios.findAll(['id', 'descricao', 'estado'], [{ id_apartamento: Apto.id }])
        if (!patrimoniosDoApartamento) return { success: false, message: 'Patrimônios do apartamento não encontrados' }

        let VistoriasDoApartamento = await Vistorias.findAll(['id', 'dt_vistoria', 'hora_vistoria'], [{ id_apartamento: Apto.id }])
        
        let manutencoesDoApartamento = await Manutencoes.findAll(['id', 'caso', 'dt_manutencao', 'hora_manutencao'], [{ id_apartamento: Apto.id }])

        return { 
            success: true, 
            message: {
                DadosAP: Apto,
                Moradores: celogasDeApartamento,
                Patrimonio: patrimoniosDoApartamento,
                Vistorias: VistoriasDoApartamento,
                Manutencoes: manutencoesDoApartamento
            } 
        }
    } catch (error) {
        console.log('error:', error)
        return { success: false, message: 'Houve um problema ao consultar informações do apartamento!'}
    }
}

async function buscarApartamento(id){
    try {
        let Apto = await Apartamentos.findOne([], [{ id : id }])
        if (!Apto) return { success: false, message: 'Apartamento não encontrado.' }  
        return { success: true, message: Apto}
    } catch (error) {
        console.log("error:", error)
        return { success: false, message: 'Erro ao buscar Apartamento.'}
    }
}

async function apagarApartamento(id){
    const t = await sequelize.transaction()
    try{
        let Apto = await Apartamentos.deleteItem(id, t)
		if (!Apto) return { success: false, message: 'Houve um erro ao apagar o Apartamento.'}

		await t.commit()

		return { success: true, message: 'Apartamento apagado!'}
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao apagar Apartamento!'}
    }
}

async function atualizarApartamento(body){
    const t = await sequelize.transaction()

    try{
        let Apto = await Apartamentos.findOne([], [{ id : body.id }])
        if (!Apto) return { success: false, message: 'Apartamento não encontrado'}
    
        if(body.numero) Apto.numero = body.numero
        if(body.bloco) Apto.bloco = body.bloco
        if(body.vagas) Apto.vagas = body.vagas
    
        await Apto.save({transaction: t})
        await t.commit()
        console.log('(log) - Apartamento alterado com sucesso')
        
        return { success: true, message: Apto } 
    } catch (error){
        console.log("error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao editar o Apartamento'}
    }
}

module.exports = {
    novoApartamento,
    buscarApartamentos,
    buscarApartamento,
    apagarApartamento,
    atualizarApartamento,

    buscarVagas,

    MeuApartamento
}