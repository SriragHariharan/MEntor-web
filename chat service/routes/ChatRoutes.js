const router = require("express").Router();
const authMiddleware = require("../authMiddleware");
const { getChatsController } = require("../controllers/chatController");


router.get("/chats/:chatID", authMiddleware, getChatsController)


module.exports = router;