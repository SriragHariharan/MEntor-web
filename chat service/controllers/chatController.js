const Chat = require("../models/chatModel")

const createNewChat = async(chatID) => {
    try {
        let chatExists = await Chat.findOne({chatID: chatID})
        if (chatExists) {
            console.log("Chat already exists");
            return;
        }
        let newChatObj = new Chat({chatID})
        let savedResp = await newChatObj.save();
        console.log("Saved response", savedResp);
    } catch (error) {
        next(error.message);
        
    }
}

const getChatsController = async(req, res, next) => {
    try {
        const sortedIds = [req.user.userID, req.params.chatID].sort();
        const mergedIds = sortedIds.join('-');
        let chat = await Chat.findOne({chatID: mergedIds});
        return res.status(200).json({success: true, message:null, data:{chatID:chat?.chatID, messages:chat?.messages, userID:req.user.userID}});
    } catch (error) {
        next(error.message);
    }
} 


module.exports = {
    createNewChat,
    getChatsController,
}