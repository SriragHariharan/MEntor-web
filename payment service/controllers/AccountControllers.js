const BankAccount = require("../models/BankAccountModal");

const createBankAccount = async(req, res, next) => {
    try {
        if(req.user.role !== "mentor"){
            return next("Unable to add account details");
        }
        console.log(req.body)
        const {accountNumber, accountName, ifsc, bank, branch, gpay} = req.body;
        const bankAccountObject = { userID: req.user.userID, accountNumber, ifscCode: ifsc, accountHolderName: accountName, bank, branchName: branch, googlePayNumber: gpay };
        let insertedResponse = await BankAccount.updateOne({userID: req.user?.userID}, bankAccountObject, {upsert: true});
        console.log(insertedResponse, "insertedResponse");
        return res.status(201).json({ success: true, message:"Bank account updated", data:null});
    } catch (error) {
        console.log(error);
        next(error.message);        
    }

};

const getBankAccount = async(req, res, next) => {
    try {
        if(req.user.role !== "mentor"){
            return next("Unable to get account details");
        }
        let bankAccount = await BankAccount.findOne({ userID: req.user?.userID});
        return res.status(200).json({ success: true, message:null, data:{ account: bankAccount}})
    } catch (error) {
        next(error.message); 
    }
};

const updateBankAccount = async(req, res, next) => {};

module.exports = {
    createBankAccount,
    getBankAccount,
    updateBankAccount,
};