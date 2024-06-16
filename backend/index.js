require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { dbConnection } = require('./configurations/database/config')
const createLogger = require('./configurations/Logger')
const logger = createLogger(__filename)

const app = express()

// Configura el límite de tamaño del cuerpo de la solicitud
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(express.json())

dbConnection()
  .then(() => {
    logger.info('Database connection established successfully.')

    const paths = {
      status: '/ping',
      loginV1: '/v1/auth',
      transactions: '/v1/transactions',
      users: '/v1/users',
      accounts: '/v1/accounts',
      contacts: '/v1/contacts',
      exchangeRate: '/v1/rates',
    }

    app.use(paths.status, require('./routes/healthCheck'))
    app.use(paths.loginV1, require('./routes/auth'))
    app.use(paths.transactions, require('./routes/transactions'))
    app.use(paths.users, require('./routes/users'))
    app.use(paths.accounts, require('./routes/account'))
    app.use(paths.contacts, require('./routes/contacts'))
    app.use(paths.exchangeRate, require('./routes/exchangeRate'))

    const PORT = 8080
    app.listen(PORT, () => {
      logger.info(`Servidor escuchando en el puerto ${PORT}`)
    })

    // Importar y arrancar el worker
    require('./utils/sqsWorker')
  })
  .catch((error) => {
    console.error('Error establishing database connection:', error)
  })
