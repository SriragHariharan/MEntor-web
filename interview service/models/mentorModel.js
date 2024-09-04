const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  slots: [{
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        isBooked: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
            required: true
        },
        menteeID: {
            type: String,
            default: null
        }
  }],
  meetings: []
});

module.exports = mongoose.model('Mentor', mentorSchema);