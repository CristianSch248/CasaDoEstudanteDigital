(async () => {
    const Sequelize = require('sequelize')
    const database = require('./db');

    const env = process.env.NODE_ENV || 'development';
    const sequelize = new Sequelize(database[env]);

    sequelize.authenticate().then(() => {
        console.log('Conexão criada com sucesso!');
    })
    .catch((error) => {
        console.error('Erro na conexão com a base de dados:', error);
    });

    module.exports = sequelize;
})();