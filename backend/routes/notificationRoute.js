
const { GetAllNotifications, UpdateAllNotifications, UpdateSingleNotification, DeleteNotification, UnreadNotifications } = require('../controllers/notificationController')
const { AllMiddleware } = require('../middleware/auth')

const router = require('express').Router()

router.get('/all-notis', AllMiddleware, GetAllNotifications)
router.get('/unread-notis', AllMiddleware, UnreadNotifications)
router.put('/update-all-notis', AllMiddleware, UpdateAllNotifications)
router.put('/update-single-notis', AllMiddleware, UpdateSingleNotification)
router.post('/delete-notis', AllMiddleware, DeleteNotification)

module.exports = router