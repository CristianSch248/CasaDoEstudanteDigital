const Vistorias = require('../services/Vistorias')
const { sendResponse } = require('../js/Utils')
const jwt = require('../js/jwt')

async function novaVistoria(req, res){
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).send('Token de autorização não fornecido')
        
        const token = authHeader.split(' ')[1]
        if (!token) return res.status(401).send('Token de autorização malformado')

        const decoded = jwt.Decode(token);
        
        let body = req.body
        const result = await Vistorias.novaVistoria(body, decoded.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarVistorias(req, res){
    try {
        const result = await Vistorias.buscarVistorias()
        sendResponse(res, result)
    } catch (error) {
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarVistoria(req, res){
    try {
        const result = await Vistorias.buscarVistoria(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function apagarVistoria(req, res){
    try {
        const result = await Vistorias.apagarVistoria(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function atualizarVistoria(req, res){
    try {
        let body = req.body
        const result = await Vistorias.atualizarVistoria(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

module.exports = {
    novaVistoria,
    buscarVistorias,
    buscarVistoria,
    apagarVistoria,
    atualizarVistoria,
}