const mongoose = require('mongoose');

const audioRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ownerID: {
        type: String,
        required: true
    },
    users: [{
        type: String,
        required: true
    }],
    link: {
        type: String,
        required: true
    }
}, {timestamps: true});

const AudioRoom = mongoose.model('AudioRoom', audioRoomSchema);

module.exports = AudioRoom;