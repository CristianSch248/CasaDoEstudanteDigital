const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')

const Apartamento = sequelize.define('apartamento', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {

    },
    bloco: {

    },
    Vagas: {

    }
})

console.log('Carregou [Apartamentos.js]')

module.exports = Apartamento;