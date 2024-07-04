const express = require("express")
const routes  = express.Router()

//ROTAS
rotaUsuario = require('./routes/Usuarios')
rotaApto = require('./routes/Apartamentos')
rotaPatrimonio = require('./routes/Patrimonios')
rotaVagas = require('./routes/Vagas')
rotaVistorias = require('./routes/Vistorias')

routes.use('/api/ced', rotaUsuario)
routes.use('/api/ced', rotaApto)
routes.use('/api/ced', rotaPatrimonio)
routes.use('/api/ced', rotaVagas)
routes.use('/api/ced', rotaVistorias)

module.exports = routes;