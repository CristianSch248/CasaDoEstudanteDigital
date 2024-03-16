require('dotenv/config')

const ModelUsuarios = require('../models/Usuarios')

/**
 * Retorna um array de atributos validados.
 * @param { Array<String> } attributes Atribuitos a serem validados.
 */
async function validateAttributes(attributes) {
	if (process.env.debug == 'true') {
		return attributes.filter(attribute => {
			if (!ModelUsuarios.rawAttributes.hasOwnProperty(attribute)) {
                console.log(`Usuarios.js:13 ~ validateAttributes ~ Campo '${attribute}' não existe na tabela Usuarios`)
            }
			return ModelUsuarios.rawAttributes.hasOwnProperty(attribute)
		})
	}
	return attributes.filter(attribute => ModelUsuarios.rawAttributes.hasOwnProperty(attribute))
}

/**
 * Retorna um array ou um objeto de registros.
 * @param { Boolean } all true retorna um array, false retorna um objeto.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Usuarios
 */
async function findAll(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelUsuarios.rawAttributes) {
			atributosValidados.push(key)
		}
	}

	let Usuarios = await ModelUsuarios.findAll({
		attributes: atributosValidados,
		where: filters
	})

	return Usuarios
}

async function findOne(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelUsuarios.rawAttributes) {
			atributosValidados.push(key)
		}
	}

	let Usuario = await ModelUsuarios.findOne({
		attributes: atributosValidados,
		where: filters
	})

	return Usuario
}

/**
 * Criar um registro
 * @param { Object } Usuario Objeto da entidade a ser criado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Usuario Criado
 */
async function create(Usuario, transaction) {
	let attributes = []

	for (let key in Usuario.rawAttributes) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let UsuarioCriado = await ModelUsuarios.create(Usuario, { transaction: transaction })

	return UsuarioCriado
}

/**
 * Alterar um registro
 * @param { Object } Usuario Objeto da entidade a ser alterado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Usuario Alterado
 */
async function update(Usuario, transaction) {
	let attributes = []

	for (let key in Usuario) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let UsuarioAlterado = await ModelUsuarios.findOne({
		where: { id: Usuario.id }
	}, { transaction: transaction })

	for (let key in Usuario) {
		UsuarioAlterado[key] = Usuario[key]
	}

	return UsuarioAlterado
}

/**
 * Apagar um registro
 * @param { Object } Usuario Objeto da entidade a ser excluido.
 * @param { Object } transaction Variavel da transação.
 * @returns { Boolean } true
 */
async function deleteItem(Usuario, transaction) {
	await ModelUsuarios.schema('public').destroy({
		where: { id: Usuario.id }
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
