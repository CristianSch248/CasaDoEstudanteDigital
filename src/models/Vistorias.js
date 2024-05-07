const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')
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
    dt_vistoria: {
       type: Sequelize.DATEONLY 
    },
    status: {
        type: Sequelize.INTEGER,
    },
    Observacoes:{
        type: Sequelize.STRING,
    },
})

console.log('Carregou [Vistorias.js]')

module.exports = Vistorias;