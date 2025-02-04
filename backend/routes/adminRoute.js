const { UpdateUtils, GetUtils, CreateAirdrop, AllAirdrops, SingleAirdrop, UpdateAirdrop, CategoryAirdrops } = require('../controllers/adminController')
const { AdminMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.put('/update-utils', AdminMiddleware, UpdateUtils)
router.get('/get-utils', AdminMiddleware, GetUtils)
router.post('/create-airdrop', AdminMiddleware, CreateAirdrop)
router.get('/all-airdrops', AllAirdrops)
router.get('/single-airdrop/:id', SingleAirdrop)
router.put('/update-airdrop', AdminMiddleware, UpdateAirdrop)
router.get('/category-airdrops/:category', CategoryAirdrops)

module.exports = router