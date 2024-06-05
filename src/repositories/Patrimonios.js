require('dotenv/config')

const ModelPatrimonio = require('../models/Patrimonios')

/**
 * Retorna um array de atributos validados.
 * @param { Array<String> } attributes Atribuitos a serem validados.
 */
async function validateAttributes(attributes) {
	if (process.env.debug == 'true') {
		return attributes.filter(attribute => {
			if (!ModelPatrimonio.rawAttributes.hasOwnProperty(attribute)) {
                console.log(`validateAttributes ~ Campo '${attribute}' não existe na tabela Patrimonios`)
            }
			return ModelPatrimonio.rawAttributes.hasOwnProperty(attribute)
		})
	}
	return attributes.filter(attribute => ModelPatrimonio.rawAttributes.hasOwnProperty(attribute))
}

/**
 * Retorna um array de registros.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Patrimonios
 */
async function findAll(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
        atributosValidados = Object.keys(ModelPatrimonio.getAttributes())
    }

	let Patrimonios = await ModelPatrimonio.findAll({
		attributes: atributosValidados,
		where: filters
	})

	return Patrimonios
}

/**
 * Retorna um objeto de registros.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Patrimonio
 */
async function findOne(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelPatrimonio.rawAttributes) {
			atributosValidados.push(key)
		}
	}

	let Patrimonio = await ModelPatrimonio.findOne({
		attributes: atributosValidados,
		where: filters
	})

	return Patrimonio
}

/**
 * Criar um registro
 * @param { Object } Patrimonio Objeto da entidade a ser criado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Patrimonio Criado
 */
async function create(Patrimonio, transaction) {
	let attributes = []

	for (let key in Patrimonio.rawAttributes) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let PatrimonioCriado = await ModelPatrimonio.create(Patrimonio, { transaction: transaction })

	return PatrimonioCriado
}

/**
 * Alterar um registro
 * @param { Object } Patrimonio Objeto da entidade a ser alterado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Patrimonio Alterado
 */
async function update(Patrimonio, transaction) {
	let attributes = []

	for (let key in Patrimonio) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let PatrimonioAlterado = await ModelPatrimonio.findOne({
		where: { id: Patrimonio.id }
	}, { transaction: transaction })

	for (let key in Patrimonio) {
		PatrimonioAlterado[key] = Patrimonio[key]
	}

	return PatrimonioAlterado
}

/**
 * Apagar um registro
 * @param { Object } Patrimonio Objeto da entidade a ser excluido.
 * @param { Object } transaction Variavel da transação.
 * @returns { Boolean } true
 */
async function deleteItem(Patrimonio, transaction) {
	await ModelPatrimonio.destroy({
		where: { id: Patrimonio.id }
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
