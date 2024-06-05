const express = require('express')
const routes = express.Router()
const validators = require('../validators/Apartamentos')
const controller = require('../controllers/Apartamentos')

routes.get('/apartamento/all', validators.buscarApartamentos, controller.buscarApartamentos)
routes.get('/apartamento/id', validators.buscarApartamento, controller.buscarApartamento)
routes.post('/apartamento/new', validators.novoApartamento, controller.novoApartamento)
routes.put('/apartamento/update', validators.atualizarApartamento, controller.atualizarApartamento)
routes.delete('/apartamento/delete', validators.apagarApartamento, controller.apagarApartamento)

module.exports = routes