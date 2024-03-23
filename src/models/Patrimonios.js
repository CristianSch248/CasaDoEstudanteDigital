const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')

const Patrimonio = sequelize.define('patrimonio', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_apartamento: {

    },
    descrição: {

    },
    estado: {

    }
})

console.log('Carregou [Patrimonio.js]')

module.exports = Patrimonio;