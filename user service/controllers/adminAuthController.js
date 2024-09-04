const User = require("../models/userSchema");
const Mentor = require("../models/mentorSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const loginAdminController = async(req, res, next) => {
    try {
        console.log("req.body: " + req.body.email, req.body.password);
        const { email, password } = req.body;
        if(email !== process.env.ADMIN_EMAIL){
            return next("Invalid login credentials");
        }
        const isPasswordValid = bcrypt.compare(password, process.env.ADMIN_PASSWORD);
        console.log("isPasswordValid ::: " + isPasswordValid, password, process.env.ADMIN_PASSWORD);
        if (!isPasswordValid) return next("Invalid login credentials");
        
        //Generate a JWT token valid for 10 minutes
        const token = jwt.sign({ admin: true }, process.env.ADMIN_TOKEN_SECRET, {expiresIn: '5m'});
        res.cookie('admin-token', token, {httpOnly: true});
        return res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        next(error.message);
    }
};

const getMentorMenteeCount = async (_req, res, next) => {
    try {
        let mentorArray = await Mentor.find({});
        let menteeArray = await User.find({});
        console.log(mentorArray?.length, menteeArray?.length);
        return res.status(200).json({ success: true, data:{mentor: mentorArray.length, mentee: menteeArray.length} });
    } catch (error) {
        next(error.message);
    }
}


const getMentorsController = async (_req, res, next) => {
    try {
        let mentors = await Mentor.find({accountVerified:true}, {password:0, role:0, profilePicture:0});
        return res.status(200).json({ success: true, message:null, data:{ mentors, role: "mentor"}});
    } catch (error) {
        next(error.message);
    }
}

const getMenteesController = async (_req, res, next) => {
    try {
        let mentees = await User.find({}, {password:0, role:0, profilePicture:0});
        return res.status(200).json({ success: true, message:null, data:{ mentees, role: "mentee"}});
    } catch (error) {
        next(error.message);
    }
}

const getApprovalMentorsController = async (_req, res, next) => {
    try {
        let mentors = await Mentor.find({accountVerified:false}, {password:0, role:0, profilePicture:0});
        return res.status(200).json({ success: true, message:null, data:{ mentors}});
    } catch (error) {
        next(error.message);
    }
}

const approveMentorController = async (req, res, next) => {
    try {
        const { userID } = req.body;
        let updatedResp = await Mentor.updateOne({_id:userID},{$set:{accountVerified:true, isEmailVerified:true}})
        if(updatedResp.modifiedCount !== 1){
            return next("Nothing to approve")
        }
        //send message to emai service to dispatch a message to mentor email address
        return res.status(200).json({success:true, message:"Approval successfull", data:null})
    } catch (error) {
        next(error.message);
    }
}

const blockMentorController = async (req, res, next) => {
    try {
        const { userID } = req.body;
        let updatedResp = await Mentor.updateOne({_id:userID},{$set:{accountBlocked:req.body.status}});
        //console.log(req.body, updatedResp)
        if(updatedResp.modifiedCount !== 1){
            return next("Nothing to approve")
        }
        return res.status(200).json({success:true, message:null, data:null})
    } catch (error) {
        next(error.message);
    }
}

const blockMenteeController = async (req, res, next) => {
    try {
        console.log("Call reached here...")
        const { userID, status } = req.body;
        let updatedResp = await User.updateOne({_id:userID},{$set:{accountBlocked: status}});
        console.log(req.body, updatedResp)
        if(updatedResp.modifiedCount !== 1){
            return next("Nothing to approve");
        }
        return res.status(200).json({success:true, message:null, data:null})
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
	loginAdminController,
    getMentorMenteeCount,
    getMentorsController,
    getMenteesController,
    getApprovalMentorsController,
    approveMentorController,
    blockMentorController,
    blockMenteeController,
};