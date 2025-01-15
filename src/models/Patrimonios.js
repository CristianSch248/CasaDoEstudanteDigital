const Sequelize = require('sequelize')
const { sequelize } = require('../db')

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
            model: 'apartamentos',
            key: 'id'
        },
    },
    descricao: {
        type: Sequelize.STRING,
    },
    estado: {
        type: Sequelize.STRING,
    }
})

console.log('Carregou [Patrimonio.js]')

module.exports = Patrimonio;