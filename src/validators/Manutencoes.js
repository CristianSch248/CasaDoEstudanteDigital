const { check, validationResult } = require('express-validator')

exports.novaManutencao = [
    check('dt_manutencao')
		.not()
		.isEmpty()
		.withMessage('Data da Manutenção não informada')
		.bail(),
    check('hora_manutencao')
		.not()
		.isEmpty()
		.withMessage('Hora da Manutenção não informada')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarManutencoes = [
    async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarManutencao = [
    check('id')
    .not()
    .isEmpty()
    .withMessage('Manutenção não informada')
    .bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]

exports.apagarManutencao = [
    check('id')
    .not()
    .isEmpty()
    .withMessage('Manutenção não informada')
    .bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]

exports.atualizarManutencao = [
    check('id')
      .not()
      .isEmpty()
      .withMessage('Manutenção Não Informada')
      .bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]