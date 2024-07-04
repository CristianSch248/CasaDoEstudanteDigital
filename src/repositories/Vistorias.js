require('dotenv/config')

const ModelVistorias = require('../models/Vistorias')

/**
 * Retorna um array de atributos validados.
 * @param { Array<String> } attributes Atribuitos a serem validados.
 */
async function validateAttributes(attributes) { // o jeito certo
    if (process.env.debug == 'true') {
        return attributes.filter(attribute => {
            const attributesDefinition = ModelVistorias.getAttributes();
            if (!attributesDefinition.hasOwnProperty(attribute)) {
                console.log(`validateAttributes ~ Campo '${attribute}' não existe na tabela Vistorias`);
                return false;
            }
            return true;
        });
    }
    return attributes.filter(attribute => {
        const attributesDefinition = ModelVistorias.getAttributes();
        return attributesDefinition.hasOwnProperty(attribute);
    });
}

/**
 * Retorna um array ou um objeto de registros.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Vistorias
 */
async function findAll(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelVistorias.getAttributes()) {
			atributosValidados.push(key)
		}
	}

	let Vistorias = await ModelVistorias.findAll({
		attributes: atributosValidados,
		where: filters
	})

	return Vistorias
}

/**
 * Retorna um objeto de registros.
 * @param { Array<String> } attributes Atributos da model.
 * @param { WhereOptions } filters Filtros da busca.
 * @returns { Model } Vistorias
 */
async function findOne(attributes, filters) {
	let atributosValidados = await validateAttributes(attributes)
	if (atributosValidados.length === 0) {
		for (let key in ModelVistorias.getAttributes()) {
			atributosValidados.push(key)
		}
	}

	let Vistoria = await ModelVistorias.findOne({
		attributes: atributosValidados,
		where: filters
	})

	return Vistoria
}

/**
 * Criar um registro
 * @param { Object } Vistoria Objeto da entidade a ser criado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Vistoria Criada
 */
async function create(Vistoria, transaction) {
	let attributes = []

	for (let key in Vistoria.rawAttributes) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let VistoriaCriada = await ModelVistorias.create(
		Vistoria, 
		{ transaction: transaction }
	)

	return VistoriaCriada
}

/**
 * Alterar um registro
 * @param { Object } Vistoria Objeto da entidade a ser alterado.
 * @param { Object } transaction Variavel da transação.
 * @returns { Model } Vistoria Alterado
 */
async function update(Vistoria, transaction) {
	let attributes = []

	for (let key in Vistoria) {
		attributes.push(key)
	}

	let atributosValidados = await validateAttributes(attributes)
	if (attributes.length != atributosValidados.length) return null

	let VistoriaAlterada = await ModelVistorias.findOne({
		where: { id: Vistoria.id }
	}, { transaction: transaction })

	for (let key in Vistoria) {
		VistoriaAlterada[key] = Vistoria[key]
	}

	return VistoriaAlterada
}

/**
 * Apagar um registro
 * @param { Object } Vistoria Objeto da entidade a ser excluido.
 * @param { Object } transaction Variavel da transação.
 * @returns { Boolean } true
 */
async function deleteItem(Vistoria, transaction) {
	await ModelVistorias.destroy({
		where: { id: Vistoria }
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