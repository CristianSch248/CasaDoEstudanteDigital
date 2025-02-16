const express = require("express")
const routes = require('./routes');
const port = 9090
const bodyParser = require('body-parser')

const cors = require('cors')
const corsOptions = {
	exposedHeaders: 'refreshtoken',
	origin: '*'
}  

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerDefinition = require('./js/SwaggerDocs.json')

const options = {
    definition: swaggerDefinition,
    apis: ['./src/routes/*.js']
}

const app = express()
const openapiSpecification = swaggerJsdoc(options);
app.use(cors(corsOptions))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(bodyParser.json(), routes)

app.listen(9090, () => console.log(`API Casa do Estudante Digital rodando em: http://localhost:${port}`))