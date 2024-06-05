const Sequelize = require('sequelize')
const { sequelize } = require('../db')

const Vaga = sequelize.define('vaga', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dt_entrada: {
        type: Sequelize.DATEONLY
    },
    dt_saida: {
        type: Sequelize.DATEONLY
    },
    observacao: {
        type: Sequelize.STRING
    },
    ativo: {
        type: Sequelize.BOOLEAN
    },
    id_aluno: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: 'usuarios',
            key: 'id'
        },
    },
    id_apartamento: { // null se for PRAE ou MANUTENÇÂO
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: 'apartamentos',
            key: 'id'
        },
    }
})
console.log('Carregou [Vagas.js]')

module.exports = Vaga;