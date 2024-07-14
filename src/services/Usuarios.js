const Usuarios = require('../repositories/Usuarios')
const Vagas = require('../repositories/Vagas')
const { sequelize } = require('../db')
const jwt = require('../js/jwt')
const bcrypt = require('bcrypt')

async function novoUsuario(body){
    
    let senhaCriptografada = await bcrypt.hash(body.senha, 10)
    
    const t = await sequelize.transaction()
    
    try{

        let UsuarioCriado = await Usuarios.create({
            nome: body.nome,
            email: body.email,
            senha: senhaCriptografada,
            tipo: body.tipo,
            telefone: body.telefone
        }, t)
		if (!UsuarioCriado) return { success: false, message: 'Houve um erro ao cadastrar o Usuario.'}
        
        await UsuarioCriado.save({ transaction: t })
		await t.commit()

		return { success: true, message: 'Usuário cadastrado com sucesso!'}
    } catch (error){
        console.log("novoUsuario ~ error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao cadastrar usuário!'}
    }
}

async function listarUsuarios(tipo){
    try {
        let usuarios = await Usuarios.findAll(['id', 'nome', 'email', 'ativo'], [{ tipo: [2, 3]}])
        return { success: true, message: usuarios}
    } catch (error) {
        console.log('listarUsuarios ~ error:', error)
        return { success: false, message: 'Houve um problema ao consultar a lista de usuarios!'}
    }
}

async function listarAlunos(){
    try {
        let alunoSemVagas = []
        let Alunos = []
        let VagasAluno = []


        Alunos = await Usuarios.findAll(['id', 'nome', 'email', 'ativo'], [{ tipo: 1 }])
        console.log("🚀 ~ listarAlunos ~ Alunos:", Alunos)

        for(let aluno of Alunos){
            VagasAluno = await Vagas.findAll([], [{ id_aluno: aluno.id }, { ativo: true }])
            console.log("🚀 ~ listarAlunos ~ VagasAluno:", VagasAluno)
            if (VagasAluno.length == 0) {
                alunoSemVagas.push(aluno)
            }
        }

        return { success: true, message: alunoSemVagas}
    } catch (error) {
        console.log('listarUsuarios ~ error:', error)
        return { success: false, message: 'Houve um problema ao consultar a lista de usuarios!'}
    }
}

async function getUser(id){
    try {
        let usuario = await Usuarios.findOne(['id', 'nome', 'email', 'senha', 'tipo', 'telefone'], [{ id: id } ])
        return { success: true, message: usuario}
    } catch (error) {
        console.log('listarUsuarios ~ error:', error)
        return { success: false, message: 'Houve um problema ao consultar a lista de usuarios!'}
    }
}

async function alterarUsuario(body){
    const t = await sequelize.transaction()

    try{
        let Usuario = await Usuarios.findOne([], [{ id : body.id }])
        if (!Usuario) return { success: false, message: 'Usuário não encontrado'}
    
        if(body.nome) Usuario.nome = body.nome
        if(body.email) Usuario.email = body.email
        if(body.telefone) Usuario.telefone = body.telefone
    
        await Usuario.save({transaction: t})
        await t.commit()
        console.log('(log) - Usuario alterado com sucesso')
        
        return { success: true, message: Usuario } 
    } catch (error){
        console.log("alterarUsuario ~ error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao editar o usuário'}
    }
}

async function alterarSenhaUsuario(body, token) {
    const decoded = jwt.Decode(token);
    
    const t = await sequelize.transaction();
    
    try {
        // Certifique-se de que os atributos estão corretos e os filtros estão sendo passados como objeto
        let user = await Usuarios.findOne(['id', 'senha'], { id: decoded.id });

        if (!user) {
            await t.rollback();
            return { success: false, message: 'Usuário não encontrado.' };
        }

        const match = await bcrypt.compare(body.senha, user.senha);
        if (match) {
            await t.rollback();
            return { success: false, message: 'As senhas são iguais, defina uma senha diferente.' };    
        }
        
        user.senha = await bcrypt.hash(body.senha, 10);

        await user.save({ transaction: t });
        await t.commit();
        return { success: true, message: 'Senha alterada com sucesso.' };
    } catch (error) {
        console.log("alterarSenhaUsuario ~ error:", error);
        await t.rollback();
        return { success: false, message: 'Erro ao alterar a senha.' };
    }
}

async function ativarUsuario(id){
    const t = await sequelize.transaction()
    
    try {
        let user = await Usuarios.findOne(['id', 'ativo'], [{ id : id }])

        user.ativo = true

        await user.save({ transaction: t })
        await t.commit()
        return { success: true, message: 'Usuário Ativo com Sucesso.'}
    } catch (error) {
        console.log("alterarSenhaUsuario ~ error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao desativar usuário.'}
    }
}

async function desativarUsuario(id){
    const t = await sequelize.transaction()
    
    try {
        let user = await Usuarios.findOne(['id', 'ativo'], [{ id : id }])

        user.ativo = false

        await user.save({ transaction: t })
        await t.commit()
        return { success: true, message: 'Usuário desativo com sucesso.'}
    } catch (error) {
        console.log("alterarSenhaUsuario ~ error:", error)
        await t.rollback()
        return { success: false, message: 'Erro ao desativar usuário.'}
    }
}

async function fetchUserData(token){
    const decoded = jwt.Decode(token)
    let user = await Usuarios.findOne(['id', 'nome', 'email', 'senha', 'tipo', 'telefone'], { id: decoded.id })
    if (!user) return { success: false, message: 'Usuário não encontrado.' }    
    return { success: true, message: user }
}

async function login(body){
    try {
        let user = await Usuarios.findOne(['id', 'tipo', 'ativo', 'senha'], { email: body.email.trim() })
    
        if (!user) return { success: false, message: 'Usuário não encontrado.' }
        if (!user.ativo) return { success: false, message: 'Usuário não ativo, solicite a ativação com o administrador!' }
    
        if (await bcrypt.compare(body.senha.trim(), user.senha)) {
            const token = jwt.newToken(user)
            return { success: true, message: { auth: true, token } }
        } else { 
            return { success: false, message: 'E-mail ou Senha incorretos.' }
        }

    } catch (error) {
        console.log("login ~ error:", error)
        return { success: false, message: error.message }
    }
}

async function logout(Token){
    const result = jwt.invalidToken(Token)
    if (result.success) {
        return { success: true, message: result }
    } else {
        return { success: false, message: result }
    }
}

module.exports = {
    novoUsuario,
    listarUsuarios,
    listarAlunos,
    alterarUsuario,
    alterarSenhaUsuario,
    ativarUsuario,
    desativarUsuario,
    fetchUserData,
    getUser,
    login,
    logout
}