const mongoose = require('mongoose');

const TransactionModal = new mongoose.Schema({
    eventID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    mentorID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    status: {
        type: String, 
        default: "pending"
    },
    participants: []
}, {timestamps:true});

const Transaction = mongoose.model('Transaction', TransactionModal);

module.exports = Transaction;