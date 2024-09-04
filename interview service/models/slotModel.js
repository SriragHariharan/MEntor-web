const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Slot', slotSchema);