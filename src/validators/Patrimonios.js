const { check, validationResult } = require('express-validator')

exports.novoPatrimonio = [
    check('descricao')
		.not()
		.isEmpty()
		.withMessage('Descrição do patrimônio não informada')
		.bail(),
    check('estado')
		.not()
		.isEmpty()
		.withMessage('Estado de conservação do patrimônio não informado')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarPatrimonios = [
    async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarPatrimonio = [
    check('id')
    .not()
    .isEmpty()
    .withMessage('patrimônio não informado')
    .bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]

exports.apagarPatrimonio = [
    check('id')
    .not()
    .isEmpty()
    .withMessage('patrimônio não informado')
    .bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]

exports.atualizarPatrimonio = [
    check('id')
        .not()
        .isEmpty()
        .withMessage('patrimônio não informado')
        .bail(),
    check('descricao')
		.not()
		.isEmpty()
		.withMessage('Descrição do patrimônio não informada')
		.bail(),
    check('estado')
		.not()
		.isEmpty()
		.withMessage('Estado de conservação do patrimônio não informado')
		.bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]