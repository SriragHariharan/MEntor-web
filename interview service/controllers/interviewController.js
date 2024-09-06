const Mentor = require("../models/mentorModel")
const Mentee = require("../models/menteeModel");
const Interview = require("../models/InterviewsModel");
const Slot = require("../models/slotModel");
const getDates = require('../momentHelpers');
const mongoose = require('mongoose');

//generate a meeting link
function generateMeetingLink() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const linkLength = 8; // adjust the length of the link as needed
  let meetingLink = '';
  const timestamp = Date.now();

  for (let i = 0; i < linkLength; i++) {
    meetingLink += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `meet-${timestamp}-${meetingLink}`;
}

//create  new user from kafka message
const createProfile = async(messageData) => {
    try {
        console.log("CP :::",messageData)
        let {userID, username, email, role} = messageData;
        if(role === 'mentor') {
            //insert to mentor collection
            const mentorObj = new Mentor({userID});
            await mentorObj.save();
            console.log("mentor added successfully");
        }
        else if(role === 'mentee') {
            //insert to mentee collection
            const menteeObj = new Mentee({userID});
            await menteeObj.save();
            console.log("mentee added successfully");
        }
    } catch (error) {
        console.log(error.message);
    }
}

//add new slot
const addNewSlotController = async(req, res, next) => {
    try {
        const {userID, role} = req.user;
        if(role !== 'mentor'){
            return next({status:401, message:"User Unauthorized"})
        }
        else{
            //create new slot object
            const {date, time, amount} = req.body
            //adding slot to the mentor collection
            let resp = await Mentor.updateOne({userID}, {$push:{slots:{date, time, amount}}})
            console.log("insertion response: " + resp.upsertedId)
            if(resp?.modifiedCount !== 1){
                return next("Unable to add slot")
            }
            return res.status(201).json({success:true, message:"Slot added", data:{slot:{date, time, amount}}})
        }
    } catch (error) {
        return next(error?.message)
    }
};

//add reccuring slots
const addReccuringSlotsController = async(req, res, next) => {
    try {
        const {userID, role} = req.user;
        if(role !== 'mentor'){
            return next({status:401, message:"User Unauthorized"})
        }
        // Get the current date
        const {time, amount} = req.body;
        const dates = getDates(req.body.type);
        //insert to insert slots to db
        for(let i = 0; i < dates.length; i++) {
            await Mentor.updateOne({userID}, {$push:{slots:{date: dates[i], time, amount}}})
        }
        return res.status(201).json({success:true, message:"Slot added", data:{}})
    } catch (error) {
        console.log(error.message);
    }
}

//get slots by specific date
const getSlotsByDateController = async(req, res, next) => {
    try {
        let {mentorID, date} = req.body;
        let slotsByDate = await Mentor.aggregate([
                                    {$match:{userID:mentorID, _id:0}},
                                    {$project:{slots:{
                                        $filter: {
                                            date: { $eq: ["$date", date] } 
                                        }
                                    }}}
                                ])
        return res.status(200).json({success:true, message:null, data:{slots:slotsByDate}});
    } catch (error) {
        next(error?.message)
    }
}

//get my slots by specific date
const getMySlotsByDateController = async(req, res, next) => {
    try {
        let {date} = req.body;
        let slots = await Mentor.findOne({userID:req.user?.userID,},{slots:1, _id:0});
        let filteredSlots = slots?.slots?.filter(slot => slot?.date?.toISOString().split('T')[0].includes(date.split('T')[0]))
        return res.status(200).json({success:true, message:null, data:{slots:filteredSlots}});
    } catch (error) {
        console.log(error);
        next(error?.message)
    }
}

//delete a specific slot
const deleteAspecificSlotController = async(req, res, next) => {
    console.log(req.params)
    try {
        if(req.user.role !== "mentor"){
            return next({error:401, message:"You do not have permission to delete this slot"})
        }
        let slotDeletionResponse = await Mentor.updateOne({userID:req.user.userID}, {$pull:{slots:{_id:req.params.slotID  }}});
        if(slotDeletionResponse.modifiedCount === 0){
            return next({error:500, message:"Unable to delete"})
        }
        return res.status(200).json({success:true, message:"Deleted slot", data:{}})
    } catch (error) {
        console.log(error)
        return next(error.message)
    }
}

//get the slots of a specific mentor on a specific date
const getMentorSlotsByDateController = async(req, res, next) => { 
    try {
        let { date, mentorID } = req.body;
        let slots = await Mentor.findOne({ userID:mentorID },{slots:1, _id:0});
        let filteredSlots = slots?.slots?.filter(slot => slot?.date?.toISOString().split('T')[0].includes(date.split('T')[0]))
        return res.status(200).json({success:true, message:null, data:{slots:filteredSlots}});
    } catch (error) {
        next(error?.message)
    }
}

//know whether a status is booked or not
const isSlotBookedController = async(req, res, next) =>{
    try {
        console.log("API call reached...", req.body.mentorID, req.body.slotID);
        
        // Find the mentor and slot status
        let slotStatus = await Mentor.findOne(
            {
                "userID": req.body.mentorID,
                "slots._id": req.body.slotID  // Directly matching the slotID
            },
            { "slots.$": 1 } // Retrieve only the matched slot's fields
        );

        // Check if slotStatus is found and contains slots
        if (!slotStatus || !slotStatus.slots || slotStatus.slots.length === 0) {
            return res.status(404).json({ success: false, message: "Slot not found" });
        }

        // Return the booking status of the found slot
        return res.status(200).json({ success: true, bookingStatus: slotStatus.slots[0].isBooked });
        
    } catch (error) {
        console.error("Error in isSlotBookedController: ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}


//add a new meeting between clients
const addNewMeetingsController = async(req, res, next) => {
    try {
        console.log(req.body);
        let { transactionID, mentorID, date, time, amount, slotID } = req.body;
        let link = generateMeetingLink();
        let newMeetingObject = new Interview({ transactionID, mentorID, date, time, amount, menteeID: req.user?.userID, link });
        let newMeetingInsertedResp = await newMeetingObject.save();
        const result = await Mentor.updateOne(
            {
                userID: mentorID,
                "slots._id": slotID
            },
            {
                $set: {
                "slots.$.isBooked": true,
                "slots.$.menteeID": req.user?.userID
                }
            }
        );
        console.log("new meeting response ::: ",newMeetingInsertedResp, result);
    } catch (error) {
        next(error.message);
    }
}

//get all meetings for mentee
const getAllMeetingsController = async(req, res, next) => {
    try {
        let role = req?.user?.role
        if(role === "mentor"){
            let meetings = await Interview.find({mentorID: req.user?.userID});
            return res.status(200).json({success:true, message:null, data:{meetings, role}})
        }else if(role === "mentee"){
            let meetings = await Interview.find({menteeID: req.user?.userID});
            return res.status(200).json({success:true, message:null, data:{meetings, role}})
        }else{
            next("Unable to find");
        }
    } catch (error) {
        next(error.message);
    }
}

//mark interaction as completed
const interviewMarkAsCompletedController = async (req, res, next) => {
    try {
        if(req.user.role !== "mentor"){
            return next("Unauthorized Request");
        }
        let updatedResponse = await Interview.updateOne({_id:req.body.interviewID, mentorID:req.user.userID},{$set:{status: "completed"}});
        if(updatedResponse?.modifiedCount === 1){
            return res.status(201).json({success: true, message: "Interview marked as completed", data:null});
        }
    } catch (error) {
        next(error.message);
    }
}

//add feedback to the specific interview
const addInterviewFeedbackController = async(req, res, next) => {
    try {
        if(req.user.role !== "mentor"){
            return next("Unauthorized Request");
        }
        const { marks, feedback } = req.body;
        let updatedResponse = await Interview.updateOne({_id:req.body.interviewID, mentorID:req.user.userID},{$set:{ marks, feedback }});
        if(updatedResponse?.modifiedCount === 1){
            return res.status(201).json({success: true, message: "Interview feedback added", data:null});
        }
    } catch (error) {
        next(error.message);
    }
}

//get feedback for specific interview
const getInterviewFeedbackController = async(req, res, next) => {
    try {
        let feedback = await Interview.findOne({_id:req.params.interviewID}, {_id:0, marks:1, feedback: 1})
        return res.status(200).json({success: true, message:null, data:feedback});
    } catch (error) {
        next(error.message);
    }
}

//mentor get todays meetings
const getTodaysMeetingsController = async(req, res, next) => {
    try {
        //todays webinars
        let todaysMeetings = [];
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        if(req.user?.role === "mentor"){
            todaysMeetings = await Interview.find({ mentorID: req.user.userID, date: { $gte: startOfDay, $lt: endOfDay } })
        }else{
            todaysMeetings = await Interview.find({ menteeID: req.user.userID, date: { $gte: startOfDay, $lt: endOfDay } })
        }
        return res.status(200).json({success:true, message:null, data:{todaysMeetings}});
    } catch (error) {
        next(error.message);
    }
};

const getMarksController = async(req, res, next) => {
    try {
        const marks = await Interview.find({ menteeID: req.user.userID, marks: {$gt: 0} });
        return res.status(200).json({ success: true, message: null, data:{ marks }})
    } catch (error) {
        next(error.message);
    }
};

module.exports = {
    createProfile,
    addNewSlotController,
    getSlotsByDateController,
    getMySlotsByDateController,
    deleteAspecificSlotController,
    getMentorSlotsByDateController,
    addReccuringSlotsController,
    addNewMeetingsController,
    isSlotBookedController,
    getAllMeetingsController,
    interviewMarkAsCompletedController,
    addInterviewFeedbackController,
    getInterviewFeedbackController,
    getTodaysMeetingsController,
    getMarksController,
}