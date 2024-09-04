const mongoose = require('mongoose');

const MeetingModal = new mongoose.Schema({
    slotID: {
        type: String,
        required: true
    },
    participant: {
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
    transactionID:{
        type: String,
        required: true
    }
}, {timestamps:true});

const MeetingTransaction = mongoose.model('MeetingTransaction', MeetingModal);

module.exports = MeetingTransaction;