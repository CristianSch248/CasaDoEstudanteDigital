const { check, validationResult } = require('express-validator')

exports.novaVaga = [
    check('dt_entrada')
		.not()
		.isEmpty()
		.withMessage('Data de entrada não informada')
		.bail(),
    check('id_aluno')
		.not()
		.isEmpty()
		.withMessage('Aluno não informado')
		.bail(),
    check('id_apartamento')
		.not()
		.isEmpty()
		.withMessage('Apartamento não informado')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarVagas = [
	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarVaga = [
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

exports.apagarVaga = [
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

exports.atualizarVaga = [
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