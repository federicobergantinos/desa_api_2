const {
  createTransaction,
  getTransactions,
  getTransaction,
} = require('../services/transactionService')
const { v4: uuidv4 } = require('uuid')
const { sendResponse } = require('../configurations/utils.js')

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
    console.error(`Error en la creación de la receta: ${error}`)
    return sendResponse(res, error.code || 500, {
      msg: error.message || 'Ha ocurrido una excepción',
    })
  }
}

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 0 // Asegúrate de proporcionar un valor por defecto
  const limit = parseInt(req.query.limit) || 20 // Límite de ítems por página
  const offset = page * limit
  console.log(req.query)
  const accountId = req.query.accountId

  try {
    const response = await getTransactions({ limit, offset, accountId })

    return sendResponse(res, statusCode, response)
  } catch (error) {
    console.error(` ${error}`)
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
    console.error(` ${error}`)
    return sendResponse(res, error.code || 500, {
      msg: error.message || 'An exception has occurred',
    })
  }
}

const calculateAccountBalance = async (req, res) => {
  try {
    const accountId = req.query.accountId
    if (!Number.isInteger(Number(accountId))) {
      throw new Error('Invalid accountId')
    }

    const page = parseInt(req.query.page) || 0 // Asegúrate de proporcionar un valor por defecto
    const limit = parseInt(req.query.limit) || 20 // Límite de ítems por página
    const offset = page * limit

    const transactions = await getTransactions({ accountId, limit, offset })

    let balance = 0
    transactions.forEach((transaction) => {
      balance += transaction.amount
    })

    return sendResponse(res, 200, balance)
  } catch (error) {
    console.error('Error calculando el saldo de la cuenta:', error)
    throw error
  }
}

module.exports = {
  create,
  getAll,
  getById,
  calculateAccountBalance,
}
