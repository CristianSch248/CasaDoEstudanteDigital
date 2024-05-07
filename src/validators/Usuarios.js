const { check, validationResult } = require('express-validator')

exports.novoUsuario = [
	check('nome')
		.not()
		.isEmpty()
		.withMessage('Informe o seu E-mail.')
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

exports.listarUsuarios = [
	async (req, res, next) => {
		if (!req.params.tipo) return console.log("Tipo de usuário não informado")
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.alterarUsuario = [	
	async (req, res, next) => {
		if (!req.params.id) return console.log("Usuário não informado")
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
		if (!req.params.id) return console.log("Usuário não informado")
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.desativarUsuario = [
	async (req, res, next) => {
		if (!req.params.id) return console.log("Usuário não informado")
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