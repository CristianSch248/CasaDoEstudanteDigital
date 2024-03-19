const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
    },
    email:{
        type: Sequelize.STRING,
        unique: true,
    },
    senha: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.STRING
        /**
            aluno
            prae
            manutenção
         */
    },
    matricula: {
        type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING
    },
    ativo: {
        type: Sequelize.BOOLEAN
    }
})

console.log('Carregou [Usuario.js]')

module.exports = Usuario;