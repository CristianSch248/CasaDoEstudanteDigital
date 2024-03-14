(async () => {
    const Sequelize = require('sequelize')
    const database = require('./db')

    const env = process.env.NODE_ENV || 'development'
    const sequelize = new Sequelize(database[env])

    sequelize.authenticate().then(() => {
        console.log('Conexão bem-sucedida com o banco de dados.')
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error)
    })

    module.exports = sequelize

    //databases
    const Usuario = require('./models/Usuario')


    await sequelize.sync({
        force: false, 
        alter: true
    })
})()