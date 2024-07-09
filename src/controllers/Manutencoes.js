const Manutencoes = require('../services/Manutencoes')
const { sendResponse } = require('../js/Utils')
const jwt = require('../js/jwt')

async function novaManutencao(req, res){
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).send('Token de autorização não fornecido')
        
        const token = authHeader.split(' ')[1]
        if (!token) return res.status(401).send('Token de autorização malformado')

        const decoded = jwt.Decode(token);
        
        let body = req.body
        
        const result = await Manutencoes.novaManutencao(body, decoded.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarManutencoes(req, res){
    try {
        const result = await Manutencoes.buscarManutencoes()
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarManutencao(req, res){
    try {
        const result = await Manutencoes.buscarManutencao(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function apagarManutencao(req, res){
    try {
        const result = await Manutencoes.apagarManutencao(req.query.id)
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