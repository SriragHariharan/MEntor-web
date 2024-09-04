const authMiddleware = require('../authMiddleware');
const { 
    getNotificationsController,
    saveFCMTokenController
} = require('../controllers/notificationsController');

const router = require('express').Router();

//get all notifications
router.get('/notifications/all', authMiddleware, getNotificationsController );

//get Firebase Cloud Messaging token
router.post("/fcm/token", authMiddleware, saveFCMTokenController);

module.exports = router;