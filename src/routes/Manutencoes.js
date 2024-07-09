const express = require('express')
const routes = express.Router()
const validators = require('../validators/Manutencoes')
const controller = require('../controllers/Manutencoes')

routes.get('/manutencao/all', validators.buscarManutencoes, controller.buscarManutencoes)
routes.get('/manutencao/id', validators.buscarManutencao, controller.buscarManutencao)
routes.post('/manutencao/new', validators.novaManutencao, controller.novaManutencao)
routes.put('/manutencao/update', validators.atualizarManutencao, controller.atualizarManutencao)
routes.delete('/manutencao/delete', validators.apagarManutencao, controller.apagarManutencao)

module.exports = routes