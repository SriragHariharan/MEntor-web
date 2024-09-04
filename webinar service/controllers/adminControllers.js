const Webinar = require("../models/webinarModal")

const getWebinarsController = async(req, res, next) => {
    try {
        const webinars = await Webinar.find({});

        //find todays webinars
        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);
        
        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999);
        const todaysWebinars = await Webinar.find({ createdAt: { $gte: startOfDay, $lt: endOfDay }});
        return res.status(200).json({ success: true, message: null, data:{ webinars: webinars.length, todaysWebinars: todaysWebinars}});
    } catch (error) {
        next(error.message);
    }
};

module.exports = {
    getWebinarsController,
}