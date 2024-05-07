const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')
const Apartamentos = require('./Apartamentos')

const Patrimonio = sequelize.define('patrimonio', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_apartamento: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: Apartamentos.schema('public'),
            key: 'id'
        },
    },
    descricao: {
        type: Sequelize.STRING,
    },
    estado: {
        type: Sequelize.INTEGER,
    }
})

console.log('Carregou [Patrimonio.js]')

module.exports = Patrimonio;