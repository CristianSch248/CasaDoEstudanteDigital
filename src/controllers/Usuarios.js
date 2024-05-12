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

async function listarUsuarios(req, res){
    try {        
        const result = await Usuarios.listarUsuarios(req.query.tipo)
        sendResponse(res, result)
    } catch (error) {
        console.log("🚀 ~ listarUsuarios ~ error:", error)
        return res.status(400).send('Erro ao buscar usuários.')
    }
}

async function alterarUsuario(req, res){
    try{
        let id = req.params.id
        let body = req.body
        const result = await Usuarios.alterarUsuario(id, body)
        sendResponse(res, result)
    } catch (error){
        console.log("alterarUsuario ~ error:", error)
        return res.status(400).send('Erro ao editar o usuário')
    }
}

async function alterarSenhaUsuario(req, res){
    try {
        const result = await Usuarios.alterarSenhaUsuario(req.params.id, req.body)
        sendResponse(res, result)
    } catch (error) {
        console.log("alterarSenhaUsuario ~ error:", error)
        return res.status(400).send('Erro ao alterra a senha do usuário')
    }
}

async function desativarUsuario(req, res){
    try {
        const result = await Usuarios.desativarUsuario(req.params.id)
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
        console.log("🚀 ~ login ~ error:", error)
        return res.status(400).send('E-mail ou Senha incorretos.')
    }
}

async function logout(req, res){
    try {
        let Token = req.headers['x-access-token']
        const result = await Usuarios.logout(Token)
        sendResponse(res, result)
    } catch (error) {
        console.log("🚀 ~ logout ~ error:", error)
        return res.status(400).send('Erro no logout')
    }
}

module.exports = {
    novoUsuario,
    listarUsuarios,
    alterarUsuario,
    alterarSenhaUsuario,
    desativarUsuario,
    login,
    logout
}