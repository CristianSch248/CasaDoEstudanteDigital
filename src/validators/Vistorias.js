const { check, validationResult } = require('express-validator')

exports.novaVistoria = [
    check('dt_vistoria')
		.not()
		.isEmpty()
		.withMessage('Data da vistoria não informada')
		.bail(),
    check('hora_vistoria')
		.not()
		.isEmpty()
		.withMessage('Hora da vistoria não informada')
		.bail(),

	async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarVistorias = [
    async (req, res, next) => {
		const errors = await validationResult(req)
		if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
		next()
	},
]

exports.buscarVistoria = [
    check('id')
    .not()
    .isEmpty()
    .withMessage('Vistoria não informado')
    .bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]

exports.apagarVistoria = [
    check('id')
    .not()
    .isEmpty()
    .withMessage('Vistoria não informado')
    .bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]

exports.atualizarVistoria = [
    check('id')
      .not()
      .isEmpty()
      .withMessage('Vistoria não informada')
      .bail(),
    check('dt_vistoria')
      .not()
      .isEmpty()
      .withMessage('Data da vistoria não informada')
      .bail(),
    check('hora_vistoria')
      .not()
      .isEmpty()
      .withMessage('Hora da vistoria não informada')
      .bail(),

    async (req, res, next) => {
        const errors = await validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)		
        next()
    },
]