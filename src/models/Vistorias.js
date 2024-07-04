const Sequelize = require('sequelize')
const { sequelize } = require('../db')
const Usuario = require('./Usuarios')
const Apartamentos = require('./Apartamentos')

const Vistorias = sequelize.define('vistorias', {
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
    dt_vistoria: {
       type: Sequelize.DATEONLY 
    },
    hora_vistoria: {
        type: Sequelize.TIME
    },
    status: {
        /**
         * 1 - ativo
         * 2 - feito
         * 3 - cancelado
         */
        type: Sequelize.INTEGER,
    },
    Observacoes:{
        type: Sequelize.STRING,
    },
})

console.log('Carregou [Vistorias.js]')

module.exports = Vistorias;