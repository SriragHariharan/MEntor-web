const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false, 
        default: null
    },
    notifications: [
        {   
            type: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            read: {
                type: Boolean,
                default: false
            },
            deleted: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;