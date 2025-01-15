const Vagas = require('../services/Vagas')
const { sendResponse } = require('../js/Utils')

async function novaVaga(req, res){
    try {
        let body = req.body
        const result = await Vagas.novaVaga(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarVagas(req, res){
    try {        
        const result = await Vagas.buscarVagas()
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarVaga(req, res){
    try {        
        const result = await Vagas.buscarVaga(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function apagarVaga(req, res){
    try {        
        const result = await Vagas.apagarVaga(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function atualizarVaga(req, res){
    try {
        let body = req.body
        const result = await Vagas.atualizarVaga(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

module.exports = {
    novaVaga,
    buscarVagas,
    buscarVaga,
    apagarVaga,
    atualizarVaga,
}