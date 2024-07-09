const Sequelize = require('sequelize')
const { sequelize } = require('../db')
const Usuario = require('./Usuarios')
const Apartamentos = require('./Apartamentos')

const Manutencao = sequelize.define('manutencao', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_aluno: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: 'usuarios',
            key: 'id'
        },
    },
    id_usuario_confirmador: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: 'usuarios',
            key: 'id'
        },
    },
    id_apartamento: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: 'apartamentos',
            key: 'id'
        },
    },
    caso: {
        type: Sequelize.STRING
    },
    material_usado: {
        type: Sequelize.STRING
    },
    descricao_atividade: {
        type: Sequelize.STRING
    },    
    dt_manutencao: {
        type: Sequelize.DATEONLY
    },
    hora_manutencao: {
        type: Sequelize.TIME
    },
    status: {
        /**
         * 1 - ativo
         * 2 - feito
         * 3 - cancelado
         */
        type: Sequelize.INTEGER
    },
})

console.log('Carregou [Manutencao.js]')

module.exports = Manutencao;