const { check, validationResult } = require('express-validator')

exports.novoApartamento = [
    check('bloco')
		.not()
		.isEmpty()
		.withMessage('Bloco do apartamento não informado')
		.bail(),
    check('numero')
		.not()
		.isEmpty()
		.withMessage('Número do apartamento não informado')
		.bail(),
    check('vagas')
		.not()
		.isEmpty()
		.withMessage('Total de vagas do apartamento não informadas')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarApartamentos = [
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarApartamento = [
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

exports.apagarApartamento = [
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

exports.atualizarApartamento = [
    check('id')
		.not()
		.isEmpty()
		.withMessage('Usuário não informado')
		.bail(),
    check('bloco')
		.not()
		.isEmpty()
		.withMessage('Bloco do apartamento não informado')
		.bail(),
    check('numero')
		.not()
		.isEmpty()
		.withMessage('Número do apartamento não informado')
		.bail(),
    check('vagas')
		.not()
		.isEmpty()
		.withMessage('Total de vagas do apartamento não informadas')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]