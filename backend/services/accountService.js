const Account = require('../entities/account')
const NotFound = require('../Errors/NotFound')
const createLogger = require('../configurations/Logger')
const logger = createLogger(__filename)

const createAccount = async (accountData) => {
  try {
    const newAccount = await Account.create(accountData)

    return {
      id: newAccount.id,
    }
  } catch (error) {
    throw error
  }
}

const isValidAccount = async (accountNumber) => {
  const existingAccount = await Account.findOne({
    where: { accountNumber: accountNumber },
  })
  return existingAccount !== null
}

const findAccountById = async (accountId) => {
  const account = await Account.findByPk(accountId)
  if (account === null) {
    throw new NotFound('Account not found')
  }

  return account
}

const findAccountByUserId = async (userId) => {
  const account = await Account.findAll({
    where: { userId: userId },
    order: [['id', 'ASC']],
  })

  if (!account) {
    throw new NotFound('No account found for the given user ID')
  }

  return account
}

module.exports = {
  createAccount,
  isValidAccount,
  findAccountById,
  findAccountByUserId,
}
