const express = require("express")
const routes  = express.Router()

//ROTAS
rotaUsuario = require('./routes/Usuarios')
rotaApto = require('./routes/Apartamentos')
rotaPatrimonio = require('./routes/Patrimonios')

routes.use('/api/ced', rotaUsuario)
routes.use('/api/ced', rotaApto)
routes.use('/api/ced', rotaPatrimonio)

module.exports = routes;