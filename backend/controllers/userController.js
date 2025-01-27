const User = require('../models').users

exports.CreateAccount = async (req, res) => {
    try {
        return res.json({ status: 200, msg: 'Account created successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}