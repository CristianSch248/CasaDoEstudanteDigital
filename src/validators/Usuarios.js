const { check, validationResult } = require('express-validator')

exports.novoUsuario = [
	check('nome')
		.not()
		.isEmpty()
		.withMessage('Informe o nome do usuário')
		.bail(),
	check('email')
		.not()
		.isEmpty()
		.withMessage('Informe o seu E-mail.')
		.bail(),
	check('senha')
		.not()
		.isEmpty()
		.withMessage('Informe a sua senha.')
		.bail()
		.isLength({ min: 1 })
		.withMessage('Informe a sua senha.')
		.bail(),
	check('tipo')
		.not()
		.isEmpty()
		.withMessage('Informe o tipo de usuário.')
		.bail(),
	check('telefone')
		.not()
		.isEmpty()
		.withMessage('Informe o Telefone do usuário.')
		.bail(),
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.getUser = [
	async (req, res, next) => {
		if (!req.query.id) return res.status(400).send('Usuários não informado')
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.listarUsuarios = [
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.listarAlunos = [
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.alterarUsuario = [	

	check('id')
		.not()
		.isEmpty()
		.withMessage('Usuário não informado')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.alterarSenhaUsuario = [
	check('senha')
		.not()
		.isEmpty()
		.withMessage('Informe a sua senha.')
		.bail()
		.isLength({ min: 1 })
		.withMessage('Informe a sua senha.')
		.bail(),
	
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.ativarUsuario = [
	check('id')
		.not()
		.isEmpty()
		.withMessage('Usuário não informado')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.desativarUsuario = [
	check('id')
		.not()
		.isEmpty()
		.withMessage('Usuário não informado')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.fetchUserData = [
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.login = [

	check('email')
		.not()
		.isEmpty()
		.withMessage('Informe o seu E-mail.')
		.bail(),
	check('senha')
		.not()
		.isEmpty()
		.withMessage('Informe a sua senha.')
		.bail()
		.isLength({ min: 1 })
		.withMessage('Informe a sua senha.')
		.bail(),
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)
		next()
	},
]

exports.logout = [
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]