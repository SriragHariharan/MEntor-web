const authMiddleware = require("../authMiddleware");
const { addNewAudioRoomController, getActiveRoomsController, joinRoomController } = require("../controllers/audioRoomsController");
const router = require('express').Router();

//add new room
router.post("/rooms/add", authMiddleware, addNewAudioRoomController )

//get active rooms
router.get("/rooms", authMiddleware, getActiveRoomsController);

//join a room
router.post("/room/:id/join", authMiddleware, joinRoomController);

//leave a room
// router.post("/room/:id/leave", authMiddleware, leaveRoomController);

module.exports = router;