const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatID: {
    type: String,
    required: true,
    unique: true
  },
  messages: [
    {
      message: { type: String, required: true },
      senderID: { type: String, required: true },
      isRead: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      isDeleted: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;