const mongoose = require('mongoose');

const webinarModalSchema = new mongoose.Schema({
    topic: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['live', 'recorded'], 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    banner: { 
        type: String, 
        required: true 
    },
    mentorID: { 
        type: String, 
        required: true 
    },
    link: { 
        type: String, 
        required: true 
    },
    participants: []
}, { timestamps: true });

const WebinarModal = mongoose.model('Webinar', webinarModalSchema);

module.exports = WebinarModal;