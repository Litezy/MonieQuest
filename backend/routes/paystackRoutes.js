const { UserMiddleware, SuperAdminMiddleware } = require('../middleware/auth')
const { handleWebhook, InitializeCryptoBuyPayment, getBanksFromPayStack, adminTransfer} = require('../controllers/paystackController')

const router = require('express').Router()

router.post('/webhook', handleWebhook);
router.get('/get_paystack_banks', getBanksFromPayStack);
router.post('/initialize_buy_payment',UserMiddleware,InitializeCryptoBuyPayment)
router.post('/admin_transfer',SuperAdminMiddleware,adminTransfer)

module.exports = router