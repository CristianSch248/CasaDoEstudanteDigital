const Manutencoes = require('../services/Manutencoes')
const { sendResponse } = require('../js/Utils')
const jwt = require('../js/jwt')

async function novaManutencao(req, res){
    console.log("🚀 ~ novaManutencao ~ req:", req)
    try {
        let authHeader = null
        let token =  null

        if(req.headers.authorization){
            authHeader = req.headers.authorization
            token = authHeader.split(' ')[1]
        } else {
            authHeader = req.headers['x-access-token']
            token = authHeader
        }
        console.log("🚀 ~ novaManutencao ~ token:", token)

        if (!authHeader) return res.status(401).send('Token de autorização não fornecido')
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
    console.log("🚀 ~ buscarManutencoes ~ req:")
    try {
        const result = await Manutencoes.buscarManutencoes()
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarManutencao(req, res){
    console.log("🚀 ~ buscarManutencao ~ req:")
    try {
        const result = await Manutencoes.buscarManutencao(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function apagarManutencao(req, res){
    console.log("🚀 ~ apagarManutencao ~ req:")
    try {
        const result = await Manutencoes.apagarManutencao(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function atualizarManutencao(req, res){
    console.log("🚀 ~ atualizarManutencao ~ req:")
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