const Transaction = require("../models/Transaction");
const BankAccount = require("../models/BankAccountModal");

const getTransactionsController = async(req, res, next) => {
    try {
        const option = req.params.option;
        console.log(option, "::: am called...");
        let transactions = [];
        switch(option) {
            case "all":
                transactions = await Transaction.find({}).sort({ createdAt: -1});
                break;
            case "today" :
                const startOfDay = new Date();
                startOfDay.setUTCHours(0, 0, 0, 0);
                
                const endOfDay = new Date();
                endOfDay.setUTCHours(23, 59, 59, 999);
                
                transactions = await Transaction.find({ createdAt: { $gte: startOfDay, $lt: endOfDay }});
                break;
            case "week" :
                const startOfWeek = new Date();
                startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay());
                startOfWeek.setUTCHours(0, 0, 0, 0);

                const endOfWeek = new Date();
                endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 7);
                endOfWeek.setUTCHours(0, 0, 0, 0);
                
                transactions = await Transaction.find({createdAt: { $gte: startOfWeek, $lt: endOfWeek }}).sort({ createdAt: -1});
                break;
            case "month" :
                const startOfMonth = new Date();
                startOfMonth.setUTCDate(1);
                startOfMonth.setUTCHours(0, 0, 0, 0);

                const endOfMonth = new Date();
                endOfMonth.setUTCDate(new Date().getUTCDate() + 1);
                endOfMonth.setUTCHours(0, 0, 0, 0);

                transactions = await Transaction.find({createdAt: { $gte: startOfMonth, $lt: endOfMonth }}).sort({ createdAt: -1});
                break;
            
            case "year" :
                const startOfYear = new Date();
                startOfYear.setUTCMonth(0, 1);
                startOfYear.setUTCHours(0, 0, 0, 0);

                const endOfYear = new Date();
                endOfYear.setUTCMonth(11, 31);
                endOfYear.setUTCHours(23, 59, 59, 999);

                transactions = await Transaction.find({createdAt: { $gte: startOfYear, $lt: endOfYear }}).sort({ updatedAt: -1});
                break;
            default : transactions = await Transaction.find({}).sort({ createdAt: -1});
            }

            return res.status(200).json({ success: true, message: null, data:{ transactions}})
    } catch (error) {
        console.log(error);
        next(error.message)
    }
};

const getBankAccountDetailsController = async(req, res, next) => {
    try {
        console.log(req.params.mentorID)
        let account = await BankAccount.findOne({ userID: req.params.mentorID});
        return res.status(200).json({ success: true, message:null, data:{ account}});
    } catch (error) {
        next(error.message);
    }
};

const markAsTransferedController = async (req, res, next) => {
    try {
        console.log(req.params)
        const updatedResp = await Transaction.updateOne({_id: req.params.eventID}, {$set:{ status: "transfered"}});
        console.log(updatedResp)
        if(updatedResp.modifiedCount === 1){
            return res.status(200).json({ success: true, message:"Marked as transfered", data:{} });
        }
    } catch (error) {
        console.log(error);
        next(error.message);        
    }
};

module.exports = {
    getTransactionsController,
    getBankAccountDetailsController,
    markAsTransferedController,
}