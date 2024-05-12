const Sequelize = require('sequelize')
const { sequelize } = require('../db')

const Apartamento = sequelize.define('apartamento', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: Sequelize.BIGINT
    },
    bloco: {
        type: Sequelize.BIGINT
    },
    vagas: {
        type: Sequelize.INTEGER,
        defaultValue: 8
    }
})

console.log('Carregou [Apartamentos.js]')

module.exports = Apartamento;