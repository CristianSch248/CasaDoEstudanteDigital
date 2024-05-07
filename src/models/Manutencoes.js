const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')
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
            model: Usuario.schema('public'),
            key: 'id'
        },
    },
    id_usuario_confirmador: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: Usuario.schema('public'),
            key: 'id'
        },
    },
    id_apartamento: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: Apartamentos.schema('public'),
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
    status: {
        type: Sequelize.INTEGER
    },
})

console.log('Carregou [Manutencao.js]')

module.exports = Manutencao;