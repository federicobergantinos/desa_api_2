const {
  createTransaction,
  getTransactions,
  getTransaction,
} = require('../services/transactionService')
<<<<<<< HEAD
=======
const { v4: uuidv4 } = require('uuid')
>>>>>>> master
const { sendResponse } = require('../configurations/utils.js')
const createLogger = require('../configurations/Logger')
const logger = createLogger(__filename)

const create = async (req, res) => {
  try {
    const transactionData = {
      ...req.body,
    }
    const transactionId = await createTransaction(transactionData)

    return sendResponse(res, 201, {
      id: transactionId,
      message: 'Receta creada con éxito',
    })
  } catch (error) {
    logger.error(`Error en la creación de la receta: ${error}`)
    return sendResponse(res, error.code || 500, {
      msg: error.message || 'Ha ocurrido una excepción',
    })
  }
}

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 0 // Asegúrate de proporcionar un valor por defecto
  const limit = parseInt(req.query.limit) || 20 // Límite de ítems por página
  const offset = page * limit
<<<<<<< HEAD
  const accountNumber = req.query.accountNumber

  try {
    const response = await getTransactions({ limit, offset, accountNumber })

    return sendResponse(res, 200, response)
=======
  logger.info(req.query)
  const accountId = req.query.accountId

  try {
    const response = await getTransactions({ limit, offset, accountId })

    return sendResponse(res, statusCode, response)
>>>>>>> master
  } catch (error) {
    logger.error(` ${error}`)
    return sendResponse(res, error.code || 500, {
      msg: error.message || 'An exception has occurred',
    })
  }
}

const getById = async (req, res) => {
  try {
    const transactionId = req.params.transactionId
    const response = await getTransaction(transactionId)
    const transaction = response.dataValues

    return sendResponse(res, 200, {
      ...transaction,
    })
  } catch (error) {
    logger.error(` ${error}`)
    return sendResponse(res, error.code || 500, {
      msg: error.message || 'An exception has occurred',
    })
  }
}

const calculateAccountBalance = async (req, res) => {
  try {
<<<<<<< HEAD
    const accountNumber = req.query.accountNumber
    if (!Number.isInteger(Number(accountNumber))) {
      throw new Error('Invalid Account Number')
=======
    const accountId = req.query.accountId
    if (!Number.isInteger(Number(accountId))) {
      throw new Error('Invalid accountId')
>>>>>>> master
    }

    const page = parseInt(req.query.page) || 0 // Asegúrate de proporcionar un valor por defecto
    const limit = parseInt(req.query.limit) || 20 // Límite de ítems por página
    const offset = page * limit

<<<<<<< HEAD
    const transactions = await getTransactions({ accountNumber, limit, offset })
=======
    const transactions = await getTransactions({ accountId, limit, offset })
>>>>>>> master

    let balance = 0
    transactions.forEach((transaction) => {
      balance += transaction.amount
    })

    return sendResponse(res, 200, balance)
  } catch (error) {
    logger.error('Error calculando el saldo de la cuenta:', error)
    throw error
  }
}

module.exports = {
  create,
  getAll,
  getById,
  calculateAccountBalance,
}
