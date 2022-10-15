const { storeNumber, getNumber } = require("../storageContract")
const { pool } = require("../pool")
const express = require('express')
const router = express.Router()
require("dotenv").config()

router.get('/', async (req, res) => {
    try {
        pool.acquire().then(async function (account) {
            const result = await getNumber(account)
            await pool.release(account)
            if (result instanceof Error) {
                console.log(result)
                return res.status(500).json({ 
                    error: "Transaction Failed",
                    message: result.message 
                })
            } else {
                result["Account Index"] = account.index
                result.Network = "Goerli"
                return res.status(200).send(result)
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.post('/', async (req, res) => {
    if(!req.body.number){
        return res.status(400).json({
            error: "Enter number to store!"
        })
    }
    const number = (req.body.number).toString()
    try {
        pool.acquire().then(async function (account) {
            const result = await storeNumber(account, number)
            await pool.release(account)
            if (result instanceof Error) {
                console.log(result)
                return res.status(500).json({ 
                    error: "Transaction Failed",
                    message: result.message 
                })
            } else {
                result["Account Index"] = account.index
                result.Network = "Goerli"
                return res.status(200).send(result)
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
router.use(function (req, res) {
    res.status(404).send("Route doesn't exist!")
})
module.exports = router;