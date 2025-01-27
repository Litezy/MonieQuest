const { CreateAccount } = require('../controllers/userController')

const router = require('express').Router()

router.post('/create-account', CreateAccount)

module.exports = router