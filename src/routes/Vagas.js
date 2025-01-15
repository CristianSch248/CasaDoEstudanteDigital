const express = require('express')
const routes = express.Router()
const validators = require('../validators/Vagas')
const controller = require('../controllers/Vagas')

routes.get('/vaga/all', validators.buscarVagas, controller.buscarVagas)
routes.get('/vaga/id', validators.buscarVaga, controller.buscarVaga)
routes.post('/vaga/new', validators.novaVaga, controller.novaVaga)
routes.put('/vaga/update', validators.atualizarVaga, controller.atualizarVaga)
routes.delete('/vaga/delete', validators.apagarVaga, controller.apagarVaga)

module.exports = routes