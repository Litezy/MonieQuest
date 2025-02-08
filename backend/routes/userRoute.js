const { CreateAccount, LoginAccount, GetProfile, SendOTP, VerifyOtp, ChangePasswordOnRequest, Contacts, UpdateProfile, VerifyEmail, CreateUpdateBankAccount, CreateUpdateKYC, UserKYC, GetUserWalletAndBank, getUtils, getLeaderboard } = require('../controllers/userController')
const { AllMiddleware, UserMiddleware, AdminMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.post('/create-account', CreateAccount)
router.post('/verify-email', VerifyEmail)
router.post('/login-account', LoginAccount)
router.get('/profile', AllMiddleware, GetProfile)
router.post('/send-otp', SendOTP)
router.post('/verify-otp', VerifyOtp)
router.post('/change-password', ChangePasswordOnRequest)
router.post('/contacts', Contacts)
router.put('/update-profile', AllMiddleware, UpdateProfile)
router.post('/create-update-bank', AllMiddleware, CreateUpdateBankAccount)
router.get('/user-wallet-bank', AllMiddleware, GetUserWalletAndBank)
router.post('/create-update-kyc', UserMiddleware, CreateUpdateKYC)
router.get('/user-kyc', UserMiddleware, UserKYC)
router.get('/get_utils',  getUtils)
router.get('/get_leader',  getLeaderboard)

module.exports = router