//register for a webinar
const Transaction = require("../models/Transaction");

const addTransactionController = async(req, res, next) => {
    try {
        const { eventID, amount, transactionID, mentorID, title, category } = req.body;
        if(req.body?.category === "webinar"){
            let webinar = await Transaction.findOne({eventID});
            if(!webinar) {
                const newTransactionObject = new Transaction({ eventID, title, category, mentorID, amount, participants:[{transactionID, userID: req.user?.userID}] });
                await newTransactionObject.save();
                return res.status(201).json({success: true, message: null, data: null});
            }else{
                await Transaction.updateOne({eventID}, {$push:{ participants:{transactionID, userID: req.user?.userID} }});
                return res.status(201).json({success: true, message: null, data:null});
            }
        }else if(req.body.category === "meeting"){
            console.log(req.body);
            const newTransactionObject = new Transaction({ eventID, title, category, mentorID, amount, participants:[{transactionID, userID: req.user?.userID}] });
            await newTransactionObject.save();
            return res.status(201).json({success: true, message: null, data: null});
        }
    } catch (error) {
        console.log(error);
        next(error.message);
    }
}

//get transactions of a specific mentor
const getSpecificMentorTransactionsController = async(req, res, next) => {
    try {
        if(req.user?.role !== "mentor"){
            next("Unable to fetch transactions");
        }
        const transactions = await Transaction.find({ mentorID: req.user?.userID}).sort({ createdAt: -1 });
        console.log
        return res.status(200).json({success: true, message:null, data:{ transactions} });

    } catch (error) {
        next(error.message);
    }
};


module.exports = {
    addTransactionController,
    getSpecificMentorTransactionsController,
};