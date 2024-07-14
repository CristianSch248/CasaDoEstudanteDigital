const Vistorias = require('../services/Vistorias')
const { sendResponse } = require('../js/Utils')
const jwt = require('../js/jwt')

async function novaVistoria(req, res){
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

        if (!authHeader) return res.status(401).send('Token de autorização não fornecido')
        if (!token) return res.status(401).send('Token de autorização malformado')

        const decoded = jwt.Decode(token);
        
        let body = req.body
        console.log("🚀 ~ novaVistoria ~ body:", body)
        const result = await Vistorias.novaVistoria(body, decoded.id)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarVistorias(req, res){
    console.log("🚀 ~ buscarVistorias ~ req:", req)
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
    console.log("🚀 ~ apagarVistoria ~ req:", req)
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
        console.log("🚀 ~ atualizarVistoria ~ body:", body)
        const result = await Vistorias.atualizarVistoria(body)
        sendResponse(res, result)
    } catch (error){
        console.log("atualizarVistoria ~ error:", error)
        return res.status(400).send('Erro ao editar vistoria')
    }
}

module.exports = {
    novaVistoria,
    buscarVistorias,
    buscarVistoria,
    apagarVistoria,
    atualizarVistoria,
}