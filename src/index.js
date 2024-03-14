const express = require("express")
const routes = require('./routes');
const port = 9090
const bodyParser = require('body-parser')

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API API CED',
            version: '1.0.1',
            description: 'API do CED'
        },
    },
    apis: ['./src/routes/*.js']
}

const app = express()
const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(bodyParser.json(), routes)

app.listen(9090, () => console.log(`Casa do Estudante Digital rodando em: http://localhost:${port}/`))