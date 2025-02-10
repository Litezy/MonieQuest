const { UpdateUtils, CreateAirdrop, AllAirdrops, SingleAirdrop, UpdateAirdrop, CategoryAirdrops, AllProfitTools, SingleProfitTool, UpdateProfitTool, AllListedProfitTools, AllProfitToolsOrders, UpdateKyc, getDashboardInfos, getUserDetails } = require('../controllers/adminController')
const { AdminMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.put('/update-utils', AdminMiddleware, UpdateUtils)
router.post('/create-airdrop', AdminMiddleware, CreateAirdrop)
router.get('/all-airdrops', AllAirdrops)
router.get('/single-airdrop/:id', SingleAirdrop)
router.put('/update-airdrop', AdminMiddleware, UpdateAirdrop)
router.get('/category-airdrops/:category', CategoryAirdrops)
router.get('/all-profit_tools', AdminMiddleware, AllProfitTools)
router.put('/update-profit_tool', AdminMiddleware, UpdateProfitTool)
router.get('/single-profit_tool/:id', SingleProfitTool)
router.get('/listed-profit_tools', AllListedProfitTools)
router.get('/all-tools_orders', AdminMiddleware, AllProfitToolsOrders)
router.get('/dashboard', AdminMiddleware, getDashboardInfos)
router.get('/get_user_details', AdminMiddleware, getUserDetails)
router.put('/update-kyc', AdminMiddleware, UpdateKyc)

module.exports = router