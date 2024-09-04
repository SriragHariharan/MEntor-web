const adminAuthMiddleware = require('../adminAuthMiddleware');
const authMiddleware = require('../authMiddleware');
const { createBankAccount, getBankAccount } = require('../controllers/AccountControllers');
const { getTransactionsController, getBankAccountDetailsController, markAsTransferedController } = require('../controllers/AdminControllers');
const { addTransactionController, getSpecificMentorTransactionsController } = require('../controllers/TransactionControllers');

const router = require('express').Router();
//ACCOUNT ROUTES

//add a bank account
router.post("/account/add", authMiddleware, createBankAccount);

//get a bank account
router.get("/account", authMiddleware, getBankAccount);


//WEBINAR ROUTES

//add participants to webinar
router.post("/transaction/add", authMiddleware, addTransactionController);

//get all transactions of a mentor
router.get("/transactions", authMiddleware, getSpecificMentorTransactionsController );

// ADMIN ROUTES

//get all transactions
router.get("/admin/transactions/:option", adminAuthMiddleware, getTransactionsController);

router.get("/admin/account/:mentorID", adminAuthMiddleware, getBankAccountDetailsController);

//mark as transferred
router.post("/admin/transaction/transfered/:eventID", adminAuthMiddleware, markAsTransferedController);

module.exports = router;