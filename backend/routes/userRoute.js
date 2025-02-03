const { CreateAccount, LoginAccount, GetProfile, SendOTP, VerifyOtp, ChangePasswordOnRequest, Contacts, UpdateProfile, GetUserWallet, GetUserBankAccount, UpdateUtils, GetUtils, VerifyEmail, CreateUpdateBankAccount, CreateUpdateKYC, UserKYC } = require('../controllers/userController')
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
router.get('/get-wallet', UserMiddleware, GetUserWallet)
router.post('/create-update-bank', AllMiddleware, CreateUpdateBankAccount)
router.get('/get-bank-account', AllMiddleware, GetUserBankAccount)
router.put('/update-utils', AdminMiddleware, UpdateUtils)
router.get('/get-utils', AdminMiddleware, GetUtils)
router.post('/create-update-kyc', UserMiddleware, CreateUpdateKYC)
router.get('/user-kyc', UserMiddleware, UserKYC)

module.exports = router