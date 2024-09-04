const adminAuthMiddleware = require('../adminAuthMiddleware');
const authMiddleware = require('../authMiddleware');
const { getWebinarsController } = require('../controllers/adminControllers');
const { 
    addNewWebinarController, 
    getAllWebinarsController, 
    getWebinarDetailsController, 
    registerWebinarController 
} = require('../controllers/webinarController');

const router = require('express').Router();

//add a new webinar
router.post("/webinar/add", authMiddleware, addNewWebinarController);

//get all webinars
router.get("/webinar/:option", authMiddleware, getAllWebinarsController);

//get details of a webinar
router.get("/webinar/:webinarID/details", authMiddleware, getWebinarDetailsController);

//get details of a webinar
router.post("/webinar/:webinarID/register", authMiddleware, registerWebinarController);


//ADMIN ROUTES

//get todays webinars
router.get("/admin/webinars/today", adminAuthMiddleware, getWebinarsController)

module.exports = router;