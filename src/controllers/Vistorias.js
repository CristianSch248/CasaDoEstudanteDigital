const Vistorias = require('../services/Vistorias')
const { sendResponse } = require('../js/Utils')

async function novoVistoria(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarVistorias(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarVistoria(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function apagarVistoria(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function atualizarVistoria(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

module.exports = {
    novoVistoria,
    buscarVistorias,
    buscarVistoria,
    apagarVistoria,
    atualizarVistoria,
}