const { UserMiddleware, SuperAdminMiddleware } = require('../middleware/auth')
const { handleWebhook, InitializeCryptoBuyPayment, getBanksFromPayStack, adminTransfer, checkAccount, InitializeProductBuyPayment, checkPaymentStatus, checkCryptoPaymentStatus } = require('../controllers/paystackController')

const router = require('express').Router()

router.post('/webhook', handleWebhook);
router.get('/get_paystack_banks', getBanksFromPayStack);
router.post('/initialize_buy_payment', UserMiddleware, InitializeCryptoBuyPayment)
router.post('/admin_transfer', SuperAdminMiddleware, adminTransfer)
router.post('/initialize_product_purchase', InitializeProductBuyPayment)
router.get('/check_account', checkAccount)
router.post('/check_product_payment_status', checkPaymentStatus)
router.post('/check_crypto_payment_status',UserMiddleware, checkCryptoPaymentStatus)

module.exports = router