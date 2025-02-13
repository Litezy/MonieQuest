const { AddRating, GetAdminBankAccount, AllUserProduct, SubmitProduct, ProductOrder } = require('../controllers/productController')
const { UserMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.get('/user-products', UserMiddleware, AllUserProduct)
router.post('/submit-product', UserMiddleware, SubmitProduct)
router.put('/add-rating', AddRating)
router.get('/get-admin-bank', GetAdminBankAccount)
router.post('/place-products-order', ProductOrder)

module.exports = router