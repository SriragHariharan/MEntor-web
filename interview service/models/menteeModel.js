const mongoose = require('mongoose');

const menteeSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    meetings: []
});

module.exports = mongoose.model('Mentee', menteeSchema);