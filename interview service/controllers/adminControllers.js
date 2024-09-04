const Interview = require("../models/InterviewsModel");

const getMeetingsCountController = async(req, res, next) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setUTCDate(1);
        startOfMonth.setUTCHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setUTCDate(new Date().getUTCDate() + 1);
        endOfMonth.setUTCHours(0, 0, 0, 0);
        const interviews = await Interview.find({});
        const monthlyInterviews = await Interview.find({createdAt: { $gte: startOfMonth, $lt: endOfMonth }});
        return res.status(200).json({ success: true, message:null, data:{ monthlyInterviews, interviewsCount: interviews?.length }});
    } catch (error) {
        next(error.message);
    }
};

module.exports = {
    getMeetingsCountController,
}