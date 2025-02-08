const { AllUserProfitTools, SubmitProfitTool, AddRating, GetAdminBankAccount, OrderTools } = require('../controllers/profitToolController')
const { UserMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.get('/user-profit_tools', UserMiddleware, AllUserProfitTools)
router.post('/submit-profit_tool', UserMiddleware, SubmitProfitTool)
router.put('/add-rating', AddRating)
router.get('/get-admin-bank', GetAdminBankAccount)
router.post('/place-tool-order', OrderTools)

module.exports = router