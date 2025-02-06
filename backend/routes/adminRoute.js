const { UpdateUtils, GetUtils, CreateAirdrop, AllAirdrops, SingleAirdrop, UpdateAirdrop, CategoryAirdrops, AllProfitTools, SingleProfitTool, UpdateProfitTool, AllListedProfitTools } = require('../controllers/adminController')
const { AdminMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.put('/update-utils', AdminMiddleware, UpdateUtils)
router.get('/get-utils', AdminMiddleware, GetUtils)
router.post('/create-airdrop', AdminMiddleware, CreateAirdrop)
router.get('/all-airdrops', AllAirdrops)
router.get('/single-airdrop/:id', SingleAirdrop)
router.put('/update-airdrop', AdminMiddleware, UpdateAirdrop)
router.get('/category-airdrops/:category', CategoryAirdrops)
router.get('/all-profit_tools', AdminMiddleware, AllProfitTools)
router.put('/update-profit_tool', AdminMiddleware, UpdateProfitTool)
router.get('/single-profit_tool/:id', SingleProfitTool)
router.get('/listed-profit_tools', AllListedProfitTools)

module.exports = router