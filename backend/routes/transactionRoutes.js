const { BuyCrypto, SellCrypto, SellGift, getAllTransactions, getUserCryptoOrderHistory, getSingleOrderHistory, completeABuyPayment, cancelOrder, getGiftCardTransactions, getSingleGiftcardOrderHistory, requestWithdrawal, getUserLatestWithdrawals, CompletedGiftCardTransactions, } = require('../controllers/transactionController')
const { UserMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.post('/buy_crypto', UserMiddleware, BuyCrypto)
router.post('/sell_crypto', UserMiddleware, SellCrypto)
router.post('/sell_giftcard', UserMiddleware, SellGift)
router.get('/get_alltrans', UserMiddleware, getAllTransactions)
router.get('/get_order_history', UserMiddleware, getUserCryptoOrderHistory)
router.get('/single_order_history/:id/:tag', UserMiddleware, getSingleOrderHistory)
router.post('/single_paid_order', UserMiddleware, completeABuyPayment)
router.post('/cancel_order', UserMiddleware, cancelOrder)
router.get('/giftcard_order_history', UserMiddleware, getGiftCardTransactions)
router.get('/completed_giftcard_order', UserMiddleware, CompletedGiftCardTransactions)
router.get('/single_giftcard_history/:id', UserMiddleware, getSingleGiftcardOrderHistory)
router.post('/request_withdrawal', UserMiddleware, requestWithdrawal)
router.get('/latest_withdrawals', UserMiddleware, getUserLatestWithdrawals)
module.exports = router