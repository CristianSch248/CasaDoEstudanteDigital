const Usuarios = require('../services/Usuarios')
const { sendResponse } = require('../js/Utils')

async function novoUsuario(req, res){
    try {
        let body = req.body
        const result = await Usuarios.novoUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function getUser(req, res){
    try {        
        const result = await Usuarios.getUser(req.query.id)
        sendResponse(res, result)
    } catch (error) {
        console.log("listarUsuarios ~ error:", error)
        return res.status(400).send('Erro ao buscar usuários.')
    }
}

async function listarUsuarios(req, res){
    try {        
        const result = await Usuarios.listarUsuarios(req.query.tipo)
        sendResponse(res, result)
    } catch (error) {
        console.log("listarUsuarios ~ error:", error)
        return res.status(400).send('Erro ao buscar usuários.')
    }
}

async function alterarUsuario(req, res){
    try{
        let body = req.body
        const result = await Usuarios.alterarUsuario(body)
        sendResponse(res, result)
    } catch (error){
        console.log("alterarUsuario ~ error:", error)
        return res.status(400).send('Erro ao editar o usuário')
    }
}

async function alterarSenhaUsuario(req, res){
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).send('Token de autorização não fornecido')
        
        const token = authHeader.split(' ')[1]
        if (!token) return res.status(401).send('Token de autorização malformado')

        const result = await Usuarios.alterarSenhaUsuario(req.body, token)
        sendResponse(res, result)
    } catch (error) {
        console.log("alterarSenhaUsuario ~ error:", error)
        return res.status(400).send('Erro ao alterra a senha do usuário')
    }
}

async function ativarUsuario(req, res){
    try {
        const result = await Usuarios.ativarUsuario(req.body.id)
        sendResponse(res, result)
    } catch (error) {
        console.log("desativarUsuario ~ error:", error)
        return res.status(400).send('Erro ao desativar usuário')
    }
}

async function desativarUsuario(req, res){
    try {
        const result = await Usuarios.desativarUsuario(req.body.id)
        sendResponse(res, result)
    } catch (error) {
        console.log("desativarUsuario ~ error:", error)
        return res.status(400).send('Erro ao desativar usuário')
    }
}

async function fetchUserData(req, res){
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).send('Token de autorização não fornecido')
        
        const token = authHeader.split(' ')[1]
        if (!token) return res.status(401).send('Token de autorização malformado')
            
        const result = await Usuarios.fetchUserData(token)
        sendResponse(res, result)
    } catch (error) {
        console.log("desativarUsuario ~ error:", error)
        return res.status(400).send('Erro ao desativar usuário')
    }
}

async function login(req, res){
    try {
        let body = req.body
        const result = await Usuarios.login(body)
        sendResponse(res, result)
    } catch (error) {
        console.log("login ~ error:", error)
        return res.status(400).send('E-mail ou Senha incorretos.')
    }
}

async function logout(req, res){
    try {
        let Token = req.headers['x-access-token']
        const result = await Usuarios.logout(Token)
        sendResponse(res, result)
    } catch (error) {
        console.log("logout ~ error:", error)
        return res.status(400).send('Erro no logout')
    }
}

module.exports = {
    novoUsuario,
    listarUsuarios,
    alterarUsuario,
    alterarSenhaUsuario,
    ativarUsuario,
    desativarUsuario,
    fetchUserData,
    getUser,
    login,
    logout
}