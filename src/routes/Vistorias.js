const express = require('express')
const routes = express.Router()
const validators = require('../validators/Vistorias')
const controller = require('../controllers/Vistorias')

routes.get('/vistoria/all', validators.buscarVistorias, controller.buscarVistorias)
routes.get('/vistoria/id', validators.buscarVistoria, controller.buscarVistoria)
routes.post('/vistoria/new', validators.novaVistoria, controller.novaVistoria)
routes.put('/vistoria/update', validators.atualizarVistoria, controller.atualizarVistoria)
routes.delete('/vistoria/delete', validators.apagarVistoria, controller.apagarVistoria)

module.exports = routes
