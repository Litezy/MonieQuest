const { BuyCrypto, SellCrypto, SellGiftcard, getAllTransactions, getUserCryptoOrderHistory, getSingleOrderHistory, completeABuyPayment } = require('../controllers/transactionController')
const { UserMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.post('/buy_crypto', UserMiddleware,BuyCrypto)
router.post('/sell_crypto', UserMiddleware,SellCrypto)
router.post('/sell_giftcard', UserMiddleware,SellGiftcard)
router.get('/get_alltrans', UserMiddleware,getAllTransactions)
router.get('/get_order_history', UserMiddleware,getUserCryptoOrderHistory)
router.get('/single_order_history/:id/:tag', UserMiddleware,getSingleOrderHistory)
router.post('/single_paid_order', UserMiddleware,completeABuyPayment)
module.exports = router