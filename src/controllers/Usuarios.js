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
        const result = await Usuarios.listarUsuarios()
        sendResponse(res, result)
    } catch (error) {
        console.log("🚀 ~ listarUsuarios ~ error:", error)
        return res.status(400).send('Erro ao buscar usuários.')
    }
}

async function alterarUsuario(req, res){
    let id = req.params.id
    let body = req.body
    
    if (!id){
        console.log("Usuário não informado")
        return
    }

    const t = await sequelize.transaction()

    try{
        let Usuario = await ModelUsuario.findOne({
            where: {
                id: id
            }
        })
    
        if(body.nome){
            Usuario.nome = body.nome
        }
        if(body.email){
            Usuario.email = body.email
        }
        if(body.senha){
            Usuario.senha = await bcrypt.hash(body.senha, 10)
        }
    
        await Usuario.save({transaction: t})
        await t.commit()
        console.log('Usuario alterado com sucesso')
        return res.status(200).send('Usuário alterado com sucesso')
    } catch (error){
        console.log("🚀 error:", error)
        await t.rollback()
        return res.status(400).send('Erro ao editar o usuário')
    }
}

async function alterarSenhaUsuario(req, res){
    try {
        
    } catch (error) {
        console.log("🚀 ~ alterarSenhaUsuario ~ error:", error)
        
    }
}

async function desativarUsuario(req, res){
    try {
        
    } catch (error) {
        console.log("🚀 ~ desativarUsuario ~ error:", error)
        
    }
}

async function login(req, res){
    try {
        
    } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        return res.status(400).send('E-mail ou Senha incorretos.')
    }
}

async function logout(req, res){
    try {
        
    } catch (error) {
        console.log("🚀 ~ logout ~ error:", error)
        
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