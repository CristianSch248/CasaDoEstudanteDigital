require('dotenv/config')

const ModelManutencao = require('../models/Manutencoes')

/**
 * Retorna um array de atributos validados.
 * @param { Array<String> } attributes Atribuitos a serem validados.
 */
async function validateAttributes(attributes) {
	if (process.env.debug == 'true') {
		return attributes.filter(attribute => {
			if (!ModelManutencao.rawAttributes.hasOwnProperty(attribute)) {
                console.log(`validateAttributes ~ Campo '${attribute}' não existe na tabela Manutencoes`)
            }
			return ModelManutencao.rawAttributes.hasOwnProperty(attribute)
		})
	}
	return attributes.filter(attribute => ModelManutencao.rawAttributes.hasOwnProperty(attribute))
}

/**
 * Retorna um array de registros.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Manutencoes
 */
async function findAll(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelManutencao.rawAttributes) {
			atributosValidados.push(key)
		}
	}
	let Manutencoes = await ModelManutencao.findAll({
		attributes: atributosValidados,
		where: filters
	})
	return Manutencoes
}

/**
 * Retorna um objeto de registros.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Manutencoes
 */
async function findOne(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelManutencao.rawAttributes) {
			atributosValidados.push(key)
		}
	}

	let Manutencao = await ModelManutencao.findOne({
		attributes: atributosValidados,
		where: filters
	})

	return Manutencao
}

/**
 * Criar um registro
 * @param { Object } Manutencao Objeto da entidade a ser criado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Manutencao Criado
 */
async function create(Manutencao, transaction) {
	let attributes = []

	for (let key in Manutencao.rawAttributes) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let ManutencaoCriada = await ModelManutencao.create(Usuario, { transaction: transaction })

	return ManutencaoCriada
}

/**
 * Alterar um registro
 * @param { Object } Manutencao Objeto da entidade a ser alterado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Manutencao Alterado
 */
async function update(Manutencao, transaction) {
	let attributes = []

	for (let key in Manutencao) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let ManutencaoAlterada = await ModelManutencao.findOne({
		where: { id: Manutencao.id }
	}, { transaction: transaction })

	for (let key in Manutencao) {
		ManutencaoAlterada[key] = Manutencao[key]
	}

	return ManutencaoAlterada
}

/**
 * Apagar um registro
 * @param { Object } Manutencao Objeto da entidade a ser excluido.
 * @param { Object } transaction Variavel da transação.
 * @returns { Boolean } true
 */
async function deleteItem(Manutencao, transaction) {
	await ModelManutencao.destroy({
		where: { id: Manutencao.id }
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
