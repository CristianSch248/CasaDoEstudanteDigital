const Apartamentos = require('../services/Apartamentos')
const { sendResponse } = require('../js/Utils')

async function novoApartamento(req, res){
    try {
        let body = req.body
        
        const result = await Apartamentos.novoApartamento(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarApartamentos(req, res){
    try {
        let body = req.body
        
        const result = await Apartamentos.buscarApartamentos(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function buscarApartamento(req, res){
    try {
        let body = req.body
        
        const result = await Apartamentos.buscarApartamento(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function apagarApartamento(req, res){
    try {
        let body = req.body
        
        const result = await Apartamentos.apagarApartamento(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function atualizarApartamento(req, res){
    try {
        let body = req.body
        
        const result = await Apartamentos.atualizarApartamento(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

module.exports = {
    novoApartamento,
    buscarApartamentos,
    buscarApartamento,
    apagarApartamento,
    atualizarApartamento,
}