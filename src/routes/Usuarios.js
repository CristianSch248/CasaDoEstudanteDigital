const express = require('express')
const routes = express.Router()
const validators = require('../validators/Usuarios')
const controller = require('../controllers/Usuarios')
const jwt = require('../js/jwt')

/**
 * @openapi
 * components:
 *   parameters:
 *     x-access-token:
 *         name: x-access-token
 *         in: header
 *         description: Token de acesso à API
 *         required: true
 *         type: string
 *     x-access-token-not-required:
 *         name: x-access-token
 *         in: header
 *         description: Token de acesso à API não obrigatório
 *         required: false
 *         type: string
 */


/**
 * @openapi
 * api/ced/usuario/new:
 *   post:
 *     description: Busca os dados dos usuários cadastrados
 *     tags: ['USUARIOS']
 *     parameters:
 *       - name: x-access-token 
 *         $ref: '#/components/parameters/x-access-token'
 *     responses:
 *       200:
 *         description: Retorna todos os usuarios do sistema
 */
routes.post('/usuario/new', validators.novoUsuario, controller.novoUsuario)

/**
 * @openapi
 * api/ced/usuario/listar/:tipo:
 *   get:
 *     description: Busca os dados dos usuários cadastrados
 *     tags: ['USUARIOS']
 *     parameters:
 *       - name: x-access-token 
 *         $ref: '#/components/parameters/x-access-token'
 *     responses:
 *       200:
 *         description: Retorna todos os usuarios do sistema
 */
routes.get('/usuario/listar/:tipo', jwt.verifyJWT, validators.listarUsuarios, controller.listarUsuarios)

/**
 * @openapi
 * api/ced/usuario/editar/:id:
 *   get:
 *     description: Busca os dados dos usuários cadastrados
 *     tags: ['USUARIOS']
 *     parameters:
 *       - name: x-access-token 
 *         $ref: '#/components/parameters/x-access-token'
 *     responses:
 *       200:
 *         description: Retorna todos os usuarios do sistema
 */
routes.put('/usuario/editar/:id', jwt.verifyJWT, validators.alterarUsuario, controller.alterarUsuario)

/**
 * @openapi
 * api/ced/usuario/alterar/senha:id:
 *   get:
 *     description: Busca os dados dos usuários cadastrados
 *     tags: ['USUARIOS']
 *     parameters:
 *       - name: x-access-token 
 *         $ref: '#/components/parameters/x-access-token'
 *     responses:
 *       200:
 *         description: Retorna todos os usuarios do sistema
 */
routes.patch('/usuario/alterar/senha:id', jwt.verifyJWT, validators.alterarSenhaUsuario, controller.alterarSenhaUsuario)

/**
 * @openapi
 * api/ced/usuario/desativar/:id:
 *   get:
 *     description: Busca os dados dos usuários cadastrados
 *     tags: ['USUARIOS']
 *     parameters:
 *       - name: x-access-token 
 *         $ref: '#/components/parameters/x-access-token'
 *     responses:
 *       200:
 *         description: Retorna todos os usuarios do sistema
 */
routes.delete('/usuario/desativar/:id', jwt.verifyPermissionPrae, validators.desativarUsuario, controller.desativarUsuario)

/**
 * @openapi
 * api/ced/auth:
 *   post:
 *     description: login da API
 *     tags: ['LOGIN']
 *     requestBody:
 *       content:
 *         application/json:
 *           required: false
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: cristian.schmitzhaus@email.com
 *               senha:
 *                 type: string
 *                 example: Sua senha
 *     responses:
 *       200 Sucesso:
 *         description: Login efetuado com sucesso!
 *       400 Erro:
 *         description: Erro ao efetuar o login
 */
routes.post('/auth', jwt.newToken, validators.login, controller.login)

/**
 * @openapi
 * api/ced/logout:
 *   post:
 *     description: login da API
 *     tags: ['LOGIN']
 *     requestBody:
 *       content:
 *         application/json:
 *           required: false
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: cristian.schmitzhaus@email.com
 *               senha:
 *                 type: string
 *                 example: Sua senha
 *     responses:
 *       200 Sucesso:
 *         description: Login efetuado com sucesso!
 *       400 Erro:
 *         description: Erro ao efetuar o login
 */
routes.post('/logout', jwt.verifyJWT, validators.logout, controller.logout)

module.exports = routes