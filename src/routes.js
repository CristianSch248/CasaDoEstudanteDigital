const express = require("express")
const routes  = express.Router()

//ROTAS
rotaUsuario = require('./routes/Usuarios')

routes.use('/api/ced', rotaUsuario)

module.exports = routes;