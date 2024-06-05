const express = require('express')
const routes = express.Router()
const validators = require('../validators/Patrimonios')
const controller = require('../controllers/Patrimonios')

routes.get('/patrimonio/all', validators.buscarPatrimonios, controller.buscarPatrimonios)
routes.get('/patrimonio/id', validators.buscarPatrimonio, controller.buscarPatrimonio)
routes.post('/patrimonio/new', validators.novoPatrimonio, controller.novoPatrimonio)
routes.put('/patrimonio/update', validators.atualizarPatrimonio, controller.atualizarPatrimonio)
routes.delete('/patrimonio/delete', validators.apagarPatrimonio, controller.apagarPatrimonio)

module.exports = routes
