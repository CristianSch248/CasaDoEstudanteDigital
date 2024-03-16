const express = require('express')
const routes = express.Router()
const ctrlUsuario = require('../controllers/Usuarios')
const { verifyJWT } = require('../js/jwt')

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
 * /listarUsuarios:
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
routes.get('/listarUsuarios', verifyJWT, ctrlUsuario.listarUsuarios)
routes.post('/novoUsuario', ctrlUsuario.novoUsuario)
routes.put('/editarUsuario/:id', ctrlUsuario.alterarUsuario)
routes.patch('/alterarSenha', ctrlUsuario.alterarSenhaUsuario)
routes.delete('/deleteUsuario', ctrlUsuario.desativarUsuario)

/**
 * @openapi
 * /login:
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
routes.post('/login', ctrlUsuario.login)
routes.post('/logout', verifyJWT, ctrlUsuario.logout)

module.exports = routes