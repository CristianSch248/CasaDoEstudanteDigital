require('dotenv').config();
const { sequelize } = require('./db'); // Importa a instância de Sequelize do arquivo db.js

// Desativa o log SQL
sequelize.options.logging = false;

// Função para inicializar o banco de dados
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão bem-sucedida com o banco de dados.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return null;
    }

    // Importa modelos
    const Apartamentos = require('./models/Apartamentos');
    const Patrimonio = require('./models/Patrimonios');
    const Usuario = require('./models/Usuarios');
    const Vistorias = require('./models/Vistorias');
    const Manutencoes = require('./models/Manutencoes');
    const Vaga = require('./models/Vagas');

    // Sincroniza o banco de dados
    try {
        await sequelize.sync({
            force: false,
            alter: true,
        });
        console.log('Sincronização do banco de dados concluída.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }

    return sequelize;
};

const sequelizeInstance = initializeDatabase();

module.exports = sequelizeInstance;
