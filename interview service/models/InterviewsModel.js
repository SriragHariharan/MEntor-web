const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    transactionID:{
        type: String,
        required: true,
    },

    mentorID: {
        type: String,
        required: true
    },

    menteeID: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['completed', 'not completed', 'cancelled'],
        default: 'not completed'
    },

    link:{
      type: String,
      required: true
    },

    marks:{
        type: Number,
        default: 0
    },

    feedback: {
        type: String,
        default: null
    },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);