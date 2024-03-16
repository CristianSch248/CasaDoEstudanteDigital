const Sequelize = require('sequelize')
const sequelize = require('../connectionDB')

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
    },
    email:{
        type: Sequelize.STRING,
        unique: true,
    },
    senha: {
        type: Sequelize.STRING
    },
    //ativo
    //matricula
    //telefone
})

console.log('Carregou [Usuario.js]')

module.exports = Usuario;