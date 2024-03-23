require('dotenv/config')

const ModelApartamento = require('../models/Apartamentos')

/**
 * Retorna um array de atributos validados.
 * @param { Array<String> } attributes Atribuitos a serem validados.
 */
async function validateAttributes(attributes) {
	if (process.env.debug == 'true') {
		return attributes.filter(attribute => {
			if (!ModelApartamento.rawAttributes.hasOwnProperty(attribute)) {
                console.log(`validateAttributes ~ Campo '${attribute}' não existe na tabela Apartamento`)
            }
			return ModelApartamento.rawAttributes.hasOwnProperty(attribute)
		})
	}
	return attributes.filter(attribute => ModelApartamento.rawAttributes.hasOwnProperty(attribute))
}

/**
 * Retorna um array de registros.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Apartamentos
 */
async function findAll(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelApartamento.rawAttributes) {
			atributosValidados.push(key)
		}
	}

	let Apartamentos = await ModelApartamento.findAll({
		attributes: atributosValidados,
		where: filters
	})

	return Apartamentos
}

/**
 * Retorna um objeto de registros.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Apartamentos
 */
async function findOne(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelApartamento.rawAttributes) {
			atributosValidados.push(key)
		}
	}

	let Apartamento = await ModelApartamento.findOne({
		attributes: atributosValidados,
		where: filters
	})

	return Apartamento
}

/**
 * Criar um registro
 * @param { Object } Apartamento Objeto da entidade a ser criado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Apartamento Criado
 */
async function create(Apartamento, transaction) {
	let attributes = []

	for (let key in Apartamento.rawAttributes) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let ApartamentoCriado = await ModelApartamento.create(Apartamento, { transaction: transaction })

	return ApartamentoCriado
}

/**
 * Alterar um registro
 * @param { Object } Apartamento Objeto da entidade a ser alterado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Apartamento Alterado
 */
async function update(Apartamento, transaction) {
	let attributes = []

	for (let key in Apartamento) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let ApartamentoAlterado = await ModelApartamento.findOne({
		where: { id: Apartamento.id }
	}, { transaction: transaction })

	for (let key in Apartamento) {
		ApartamentoAlterado[key] = Usuario[key]
	}

	return ApartamentoAlterado
}

/**
 * Apagar um registro
 * @param { Object } Apartamento Objeto da entidade a ser excluido.
 * @param { Object } transaction Variavel da transação.
 * @returns { Boolean } true
 */
async function deleteItem(Apartamento, transaction) {
	await ModelApartamento.destroy({
		where: { id: Apartamento.id }
	}, { transaction: transaction })
	return true
}

module.exports = {
	findAll,
    findOne,
	create,
	update,
	deleteItem
}
