const express = require('express')
const routes = express.Router()
const validators = require('../validators/Usuarios')
const controller = require('../controllers/Usuarios')
const jwt = require('../js/jwt')

routes.post('/auth', validators.login, controller.login)
routes.post('/logout', validators.logout, controller.logout)
routes.post('/usuario/new', validators.novoUsuario, controller.novoUsuario)

routes.get('/usuario/', validators.getUser, controller.getUser)
routes.get('/usuario/listarportipo', validators.listarUsuarios, controller.listarUsuarios)
routes.get('/user/data', validators.fetchUserData, controller.fetchUserData)

routes.put('/usuario/editar', validators.alterarUsuario, controller.alterarUsuario)
routes.put('/usuario/alterar/senha', validators.alterarSenhaUsuario, controller.alterarSenhaUsuario)

routes.patch('/usuario/ativar', validators.ativarUsuario, controller.ativarUsuario)
routes.patch('/usuario/desativar', validators.desativarUsuario, controller.desativarUsuario)

module.exports = routes