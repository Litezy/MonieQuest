
const { GetAllNotifications, UpdateAllNotifications, UpdateSingleNotification, DeleteNotification } = require('../controllers/notificationController')
const { AllMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.get('/all-notis', AllMiddleware, GetAllNotifications)
router.put('/update-all-notis', AllMiddleware, UpdateAllNotifications)
router.put('/update-single-notis', AllMiddleware, UpdateSingleNotification)
router.post('/delete-notis', AllMiddleware, DeleteNotification)

module.exports = router