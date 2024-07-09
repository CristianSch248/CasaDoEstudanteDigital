const Apartamentos = require('../services/Apartamentos')
const { sendResponse } = require('../js/Utils')

const jwt = require('../js/jwt')

async function novoApartamento(req, res){
    try {
        let body = req.body
        const result = await Apartamentos.novoApartamento(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoApartamento ~ error:", error)
        return res.status(400).send('Erro ao cadastrar o apartamento')
    }
}

async function buscarApartamentos(req, res){
    try {        
        const result = await Apartamentos.buscarApartamentos()
        sendResponse(res, result)
    } catch (error){
        console.log("buscarApartamentos ~ error:", error)
        return res.status(400).send('Erro ao buscar apartamentos')
    }
}

async function buscarVagas(req, res){
    try {        
        const result = await Apartamentos.buscarVagas()
        sendResponse(res, result)
    } catch (error){
        console.log("buscarVagas ~ error:", error)
        return res.status(400).send('Erro ao buscar Vagas')
    }
}

async function MeuApartamento(req, res){
    try {        
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).send('Token de autorização não fornecido')
        
        const token = authHeader.split(' ')[1]
        if (!token) return res.status(401).send('Token de autorização malformado')

        const decoded = jwt.Decode(token);

        const result = await Apartamentos.MeuApartamento(decoded.id)
        sendResponse(res, result)
    } catch (error){
        console.log("buscarVagas ~ error:", error)
        return res.status(400).send('Erro ao buscar Vagas')
    }
}

async function buscarApartamento(req, res){
    try {        
        const result = await Apartamentos.buscarApartamento(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("buscarApartamento ~ error:", error)
        return res.status(400).send('Erro ao buscar dados do apartamento')
    }
}

async function apagarApartamento(req, res){
    try {        
        const result = await Apartamentos.apagarApartamento(req.query.id)
        sendResponse(res, result)
    } catch (error){
        console.log("apagarApartamento ~ error:", error)
        return res.status(400).send('Erro ao apagar dados do Apartamento')
    }
}

async function atualizarApartamento(req, res){
    try {
        let body = req.body
        const result = await Apartamentos.atualizarApartamento(body)
        sendResponse(res, result)
    } catch (error){
        console.log("atualizarApartamento ~ error:", error)
        return res.status(400).send('Erro ao atualizad dados do apartamento')
    }
}

module.exports = {
    novoApartamento,
    buscarApartamentos,
    buscarApartamento,
    apagarApartamento,
    atualizarApartamento,

    buscarVagas,

    MeuApartamento,
}