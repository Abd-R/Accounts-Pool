const HDWallet = require('ethereum-hdwallet')
const genericPool = require('generic-pool')
require('dotenv').config()

const MNEMONIC = process.env.MNEMONIC
const MAX = parseInt(process.env.MAX_ACCOUNTS)
console.log("Max Accounts : " + MAX)
const hdwallet = HDWallet.fromMnemonic(MNEMONIC)
const mywallet = hdwallet.derive(`m/44'/60'/0'/0`)

let index = 0

const factory = {
  create: function () {
    return new Promise(function (resolve, reject) {
      const result = {}
      const PvtKey = mywallet.derive(index).getPrivateKey().toString('hex')
      const PubKey = (`0x${mywallet.derive(index).getAddress().toString('hex')}`)
      result.PvtKey = PvtKey
      result.PubKey = PubKey
      result.index = index
      index++
      resolve(result)
    })
  },
  destroy: function (result) {
    return new Promise(function (resolve, reject) {
      console.log("Delete function called")
      result = null
      resolve()
    })
  },
}

const config = {
  max: MAX,
  idleTimeoutMillis: 30000,
  maxWaitingClients: 20,
  // priorityRange
}

const pool = genericPool.createPool(factory, config)

module.exports = {
  pool
}