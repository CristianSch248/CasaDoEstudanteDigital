require('dotenv/config')
const ModelUsuarios = require('../models/Usuarios');
const ModelVagas = require('../models/Vagas');

/**
 * Retorna um array de atributos validados.
 * @param { Array<String> } attributes Atributos a serem validados.
 */
async function validateAttributes(attributes, model) {
    if (process.env.debug == 'true') {
        return attributes.filter(attribute => {
            if (!model.rawAttributes.hasOwnProperty(attribute)) {
                console.log(`Campo '${attribute}' não existe na tabela ${model.name}`);
            }
            return model.rawAttributes.hasOwnProperty(attribute);
        });
    }
    return attributes.filter(attribute => model.rawAttributes.hasOwnProperty(attribute));
}

/**
 * Retorna um array de alunos que não estão vinculados a uma vaga ativa.
 * @param { Array<String> } attributes Atributos da model.
 * @returns { Model } Usuarios
 */
async function findAlunosSemVaga(attributes) {
    let atributosValidados = await validateAttributes(attributes, ModelUsuarios);
    if (atributosValidados.length === 0) {
        for (let key in ModelUsuarios.rawAttributes) {
            atributosValidados.push(key);
        }
    }

    let usuarios = await ModelUsuarios.findAll({
        attributes: atributosValidados,
        include: [{
            model: ModelVagas,
            as: 'vagas',
            required: false,
            where: {
                ativo: false
            }
        }],
        where: {
            '$vagas.id$': null,
            tipo: 1 // Tipo 1 corresponde a alunos
        }
    });

    return usuarios;
}

module.exports = {
    findAlunosSemVaga
};
