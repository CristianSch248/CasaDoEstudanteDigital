const Sequelize = require('sequelize')
const sequelize = require('../loadDatabase')

const Manutencao = sequelize.define('manutencao', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_aluno: {
        
    },
    id_usuario_confirmador: {

    },
    caso: {

    },
    material_usado: {

    },
    descricao_atividade: {

    },    
    dt_vistoria: {

    },
    status: {

    }
})

console.log('Carregou [Manutencao.js]')

module.exports = Manutencao;