const Manutencoes = require('../services/Manutencoes')
const { sendResponse } = require('../js/Utils')

async function novaManutencao(req, res){
    try {
        let body = req.body
        
        const result = await Manutencoes.novaManutencao(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarManutencoes(req, res){
    try {
        let body = req.body
        
        const result = await Manutencoes.buscarManutencoes(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarManutencao(req, res){
    try {
        let body = req.body
        
        const result = await Manutencoes.buscarManutencao(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function apagarManutencao(req, res){
    try {
        let body = req.body
        
        const result = await Manutencoes.apagarManutencao(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function atualizarManutencao(req, res){
    try {
        let body = req.body
        
        const result = await Manutencoes.atualizarManutencao(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

module.exports = {
    novaManutencao,
    buscarManutencoes,
    buscarManutencao,
    apagarManutencao,
    atualizarManutencao,
}