const { User, Account } = require('../../../entities/associateModels')
const createLogger = require('../../Logger')
const logger = createLogger(__filename)

const populateUser = async () => {
  const usersData = [
    {
      name: 'Federico',
      surname: 'Bergantinos',
      email: 'febergantinos@gmail.com',
      userStatus: 'validated',
      photoUrl:
        'https://fotos.perfil.com/2024/02/15/trim/1140/641/yeti-de-bruta-cocina-1755883.jpg',
      accounts: [
        {
          beneficiaryName: 'Federico Bergantinos',
          beneficiaryAddress: 'Lima 123, Buenos Aires, Argentina',
          accountNumber: 'f7d22b9b-aa71-4f1b-a463-e79202334a34a',
          accountType: 'Pesos',
          accountCurrency: 'ARS',
          accountStatus: 'validated',
        },
        {
          beneficiaryName: 'Federico Bergantinos',
          beneficiaryAddress: 'Lima 123, Buenos Aires, Argentina',
          accountNumber: 'f7d22b9b-aa71-4f1b-a463-e79202334a34b',
          accountType: 'Dolares',
          accountCurrency: 'USD',
          accountStatus: 'validated',
        },
        {
          beneficiaryName: 'Federico Bergantinos',
          beneficiaryAddress: 'Lima 123, Buenos Aires, Argentina',
          accountNumber: '0x3C1e682E3C559FB1BFBA6EABd0FaDc3DB77D84aE',
          accountType: 'XCoin',
          accountCurrency: 'XCN',
          accountStatus: 'validated',
        },
      ],
    },
    {
      name: 'Wallet',
      surname: 'Company',
      email: 'wallet@gmail.com',
      userStatus: 'validated',
      photoUrl: 'https://wallet-desa-api-2.s3.amazonaws.com/icon.png',
      accounts: [
        {
          beneficiaryName: 'Wallet Company',
          beneficiaryAddress: 'Lima 123, Buenos Aires, Argentina',
          accountNumber: 'bf10e7be-9fdc-4c8b-9551-61609b8d431ea',
          accountType: 'Pesos',
          accountCurrency: 'ARS',
          accountStatus: 'validated',
        },
        {
          beneficiaryName: 'Wallet Company',
          beneficiaryAddress: 'Lima 123, Buenos Aires, Argentina',
          accountNumber: 'bf10e7be-9fdc-4c8b-9551-61609b8d431eb',
          accountType: 'Dolares',
          accountCurrency: 'USD',
          accountStatus: 'validated',
        },
        {
          beneficiaryName: 'Wallet Company',
          beneficiaryAddress: 'Lima 123, Buenos Aires, Argentina',
          accountNumber: '0xbCF5801F122E7645F39bDd38Ce9253e208b7f0a8',
          accountType: 'XCoin',
          accountCurrency: 'XCN',
          accountStatus: 'validated',
        },
      ],
    },
  ]

  try {
    for (const userData of usersData) {
      const { name, surname, email, photoUrl, userStatus } = userData

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { name, surname, photoUrl, userStatus },
      })

      if (user && created) {
        for (const accountData of userData.accounts) {
          await Account.create({ ...accountData, userId: user.id })
        }
      }
    }

    logger.info('Users and accounts have been populated.')
  } catch (error) {
    console.error('Error populating users and accounts:', error)
  }
}

module.exports = populateUser
