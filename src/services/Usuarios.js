const Usuarios = require('../repositories/Usuarios')
const { sendResponse } = require('../js/Utils')

async function novoUsuario(req, res){
    let senhaCriptografada = senhaCriptografada = await bcrypt.hash(body.senha, 10)
    
    const t = await sequelize.transaction()
    
    try{
        let Usuario = {
            nome: body.nome,
            email: body.email,
            senha: senhaCriptografada
        }
        
        let UsuarioCriado = await RepositoriesUsuario.create(Usuario, t)
		if (!UsuarioCriado) return { success: false, message: 'Houve um erro ao cadastrar o Usuario.'}
        
        await UsuarioCriado.save({ transaction: t })
		await t.commit()

		return { success: true, message: 'Usuário cadastrado com sucesso!'}
    } catch (error){
        console.log("🚀 error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao criar o usuário!'}
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
    console.log("Alterando Senha do usuário")
}

async function desativarUsuario(req, res){
    console.log("Desativando usuário")
}

async function login(req, res){
    let body = req.body

    if(!body.email){
        return console.log('E-mail de usuário não informado.')
    }

    if(!body.senha){
        return console.log('Senha de login não informado.')
    }

    let user = await ModelUsuario.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email : {
                [Op.eq]: body.email
            }  
        }
    })

    const match = await bcrypt.compare(body.senha, user.senha);

    if(match) {
        const token = JTW.newToken(user)
        return res.json({ auth: true, token })
    } else { 
        console.log('E-mail ou Senha incorretos.')
        res.status(401).end()
    }
}

async function logout(req, res){
    let Token = req.headers['x-access-token']
    const result = JTW.invalidToken(Token)
    
    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
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