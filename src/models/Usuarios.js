const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')
const Apartamentos = require('../models/Apartamentos')

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
        type: Sequelize.INTEGER
        /**
            1 - aluno
            2 - prae
            3 - manutenção
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
    },
    id_apartamento: { // null se for PRAE ou MANUTENÇÂO
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: Apartamentos.schema('public'),
            key: 'id'
        },
    }
})

console.log('Carregou [Usuario.js]')

module.exports = Usuario;