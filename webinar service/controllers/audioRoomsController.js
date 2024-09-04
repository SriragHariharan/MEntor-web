const AudioRoom = require("../models/audioRoomModal");
const User = require("../models/userModal");

//generate a meeting link
function generateMeetingLink() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const linkLength = 8; // adjust the length of the link as needed
  let meetingLink = '';
  const timestamp = Date.now();

  for (let i = 0; i < linkLength; i++) {
    meetingLink += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `room-${timestamp}-${meetingLink}`;
}

const addNewAudioRoomController = async(req, res, next) => {
    try {
        const link = generateMeetingLink();
        console.log(link);
        const newAudioRoomObj = new AudioRoom({name: req.body.data.roomName, ownerID: req.user?.userID, users:[req.user?.userID], link: link});
        0
        await newAudioRoomObj.save();
        //find user details
        return res.status(201).json({success: true, message: "New room created", data:{link}})
    } catch (error) {
        console.log(error)
        next(error.message);       
    }
}

const getActiveRoomsController = async(req, res, next) => {
    try {
        let roomsActive = await AudioRoom.find({ $expr: { $gt: [{ $size: "$users" }, 0] } });
        return res.status(200).json({success:true, message: null, data: { roomsActive}})
    } catch (error) {
        console.log(error)
        next(error.message);
    }
}

//join a specific room
const joinRoomController = async(req, res, next) => {
    try {
        let userDetails = await User.findOne({userID: req.user?.userID},{username:1, profilePic:1, userID:1, _id:0});
        let isPresentInRoom = await AudioRoom.findOne({ _id: req.params.id, users: { $elemMatch: { $eq: req.user?.userID } } })
        if(!isPresentInRoom){
            await AudioRoom.updateOne({_id: req.params.id}, {$push:{ users: req.user?.userID}});
            return res.status(201).json({success: true, message:null, data: {user: userDetails}})
        }
        return res.status(200).json({success: true, message:null, data: {user: userDetails}})
    } catch (error) {
        next(error.message);
    }
}




module.exports = {
    addNewAudioRoomController,
    getActiveRoomsController,
    joinRoomController,
    // leaveRoomController,
}