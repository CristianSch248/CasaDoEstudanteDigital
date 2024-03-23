const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')

const Vistorias = sequelize.define('vistorias', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_aluno: {

    },
    id_usuario_confirmador: {

    },
    id_apartamento: {

    },
    dt_vistoria: {

    },
    status: {

    },
    Observacoes:{
        
    }
})

console.log('Carregou [Vistorias.js]')

module.exports = Vistorias;