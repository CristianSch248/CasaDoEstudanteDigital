require('dotenv').config()
const { Sequelize } =  require('sequelize')

const sequelize = new Sequelize(
  process.env.DATABASE_DB,
  process.env.USERNAME_DB, 
  process.env.PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    dialect: 'postgres',
  }
)

// Desativa o log SQL
sequelize.options.logging = false;

module.exports = { sequelize }