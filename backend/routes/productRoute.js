const { AddRating, GetAdminBankAccount, AllUserProducts, SubmitProduct, ProductOrder } = require('../controllers/productController')
const { UserMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.get('/user-products', UserMiddleware, AllUserProducts)
router.post('/submit-product', UserMiddleware, SubmitProduct)
router.put('/add-rating', AddRating)
router.get('/get-admin-bank', GetAdminBankAccount)
router.post('/place-product-order', ProductOrder)

module.exports = router