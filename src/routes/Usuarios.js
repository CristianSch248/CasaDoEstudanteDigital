const express = require('express')
const routes = express.Router()
const validators = require('../validators/Usuarios')
const controller = require('../controllers/Usuarios')
const jwt = require('../js/jwt')

routes.post('/usuario/new', validators.novoUsuario, controller.novoUsuario)
routes.get('/usuario/listarportipo', validators.listarUsuarios, controller.listarUsuarios)
routes.put('/usuario/editar', validators.alterarUsuario, controller.alterarUsuario)
routes.put('/usuario/alterar/senha', validators.alterarSenhaUsuario, controller.alterarSenhaUsuario)
routes.patch('/usuario/desativar', validators.desativarUsuario, controller.desativarUsuario)
routes.get('/user/data', validators.fetchUserData, controller.fetchUserData)

routes.post('/auth', validators.login, controller.login)
routes.post('/logout', jwt.verifyJWT, validators.logout, controller.logout)

module.exports = routes