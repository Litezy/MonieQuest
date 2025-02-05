const { CreateAccount, LoginAccount, GetProfile, SendOTP, VerifyOtp, ChangePasswordOnRequest, Contacts, UpdateProfile, GetUserWallet, GetUserBankAccount, UpdateUtils, GetUtils, VerifyEmail, CreateUpdateBankAccount, CreateUpdateKYC, UserKYC, GetUserUtilities } = require('../controllers/userController')
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
router.get('/get-user_utils', AllMiddleware, GetUserUtilities)
router.post('/create-update-kyc', UserMiddleware, CreateUpdateKYC)
router.get('/user-kyc', UserMiddleware, UserKYC)

module.exports = router