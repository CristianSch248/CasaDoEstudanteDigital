const Patrimonios = require('../services/Patrimonios')
const { sendResponse } = require('../js/Utils')

async function novoPatrimonio(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarPatrimonios(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarPatrimonio(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function apagarPatrimonio(req, res){
    try {
        let body = req.body
        
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function atualizarPatrimonio(req, res){
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
    novoPatrimonio,
    buscarPatrimonios,
    buscarPatrimonio,
    apagarPatrimonio,
    atualizarPatrimonio,
}