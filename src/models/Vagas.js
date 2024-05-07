const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')
const Usuarios = require('./Usuarios')
const Apartamentos = require('./Apartamentos')

const Vaga = sequelize.define('vaga', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dt_entrada: {
        type: Sequelize.DATEONLY
    },
    dt_manutencao: {
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
            model: Usuarios.schema('public'),
            key: 'id'
        },
    },
    id_apartamento: { // null se for PRAE ou MANUTENÇÂO
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: Apartamentos.schema('public'),
            key: 'id'
        },
    }
}, {
    schema: 'public', // Aqui define o esquema
})
console.log('Carregou [Vagas.js]')

module.exports = Vaga;