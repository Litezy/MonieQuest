const { AllUserProfitTools, SubmitProfitTool } = require('../controllers/profitToolController')
const { UserMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.get('/user-profit-tools', UserMiddleware, AllUserProfitTools)
router.post('/submit-profit-tool', UserMiddleware, SubmitProfitTool)

module.exports = router