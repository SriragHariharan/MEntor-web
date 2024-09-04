const { uploadImage, deleteImage } = require("../helpers/cloudinary");
const Profile = require("../models/profileModel")


const createProfile = async(messageData) => {
    try {
        console.log("CP :::",messageData)
        let {userID, username, email, role} = messageData;
        const newProfileObject = new Profile({userID, username, email, role});
        await newProfileObject.save();
        console.log("New user profile created..!");
    } catch (error) {
        console.log(error.message);
    }
}

//get profile detalis
const MyProfileDetailsController = async(req, res, next) => {
    try {
        let user = req.user;
        let profileDetails = await Profile.findOne({userID: user.userID});
        if(user.userID === profileDetails?.userID){
            editAccess = true;
        }
        return res.status(200).json({success: true, message: "profile details", profileDetails, editAccess})
    } catch (error) {
        console.log(error.message)
        next()
    }
}

//add education
const addEducationController = async(req, res, next) => {
    try {
        console.log("edu :::",req.body.data)
        await Profile.updateOne({userID:req.user?.userID}, {$push:{education:req.body.data}});
        return res.status(201).json({success: true, message:"Education added successfully", data:{}})
    } catch (error) {
        next(error.message)
    }
}

//add skills
const addSkillsController = async(req, res, next) => {
    try {
        await Profile.updateOne({userID:req.user?.userID}, {$push:{skills:{...req.body}}});
        return res.status(201).json({success: true, message:"New skill added", data:{}})
    } catch (error) {
        next(error.message)
    }
}

//add experience
const addExperienceController = async(req, res, next) => {
    try {
        let resp = await Profile.updateOne({userID:req.user?.userID}, {$push:{experience:req.body} });
        console.log(res)
        return res.status(201).json({success: true, message:"Experience added successfully", data:{}})
    } catch (error) {
        next(error.message)
    }
}

//update info
const updateProfileController = async(req, res, next) => {
    try {
        await Profile.updateOne({userID:req.user?.userID}, {$set:req.body });
        return res.status(201).json({success: true, message:"Profile updated", data:{}})
    } catch (error) {
        next(error.message)
    }
}

//update profile picture
const updateProfilePictureController = async(req, res) => {
    try {
        //delete older image from cloudinary
        let imageDetails = await Profile.findOne({userID: req.user.userID});
        deleteImage(imageDetails?.profilePic?.public_id)
        //upload to cloudinary server
        let imgUploadResp = await uploadImage(req.body.base64Image);
        let profileUpdatedResp = await Profile.updateOne({userID:req.user?.userID},{
            $set:{
                profilePic:imgUploadResp
            }
        })
        if(profileUpdatedResp.modifiedCount !==1){
            return next({status:400, message:"Unable to update profile picture"})
        }
        return res.status(201).json({success:true, message:"Profile picture updated", data:{profilePic:imgUploadResp.secure_url}})
    } catch (error) {
        console.log("img upload error ::;",error)
        next(error.message)
    }
}

//update cover picture
const updateCoverPictureController = async(req, res) => {
    try {
        //delete older image from cloudinary
        let imageDetails = await Profile.findOne({userID: req.user.userID});
        deleteImage(imageDetails?.coverPic?.public_id)
        //upload to cloudinary server
        let imgUploadResp = await uploadImage(req.body.base64Image);
        let coverUpdatedResp = await Profile.updateOne({userID:req.user?.userID},{
            $set:{
                coverPic:imgUploadResp
            }
        })
        if(coverUpdatedResp.modifiedCount !==1){
            return next({status:400, message:"Unable to update profile picture"})
        }
        return res.status(201).json({success:true, message:"Cover picture updated", data:{coverPic:imgUploadResp.secure_url}})
    } catch (error) {
        console.log("img upload error ::;",error)
        next(error.message)
    }
}

//delete the profile picture or cover picture
const deleteUserPictureController = async(req, res, next) => { //coverPic or profilePic
    try {
        console.log(req.params.imageType);
        let imageDetails = await Profile.findOne({userID: req.user.userID});
        //delete image image from cloudinary
        if(req.params.imageType === "profile"){
            deleteImage(imageDetails?.profilePic?.public_id);
            await Profile.updateOne({userID: req.user.userID}, {$set:{profilePic:{}}});
            return res.status(200).json({success:true, message:"Profile picture deleted"});
        }else if(req.params.imageType === "cover"){
            deleteImage(imageDetails?.coverPic?.public_id);
            await Profile.updateOne({userID: req.user.userID}, {$set:{coverPic:{}}});
            return res.status(200).json({success:true, message:"Cover picture deleted"});
        }else{
            return next({status:400, messag:"Unable to delete"})
        }
    } catch (error) {
        next(error.message);
    }
}

//get people whom we are following
const followingMentorsContoller = async(req, res, next) => {
    try {
        if(req.user.role === "mentor"){
            let {followers} = await Profile.findOne({ userID: req.user.userID }, { _id:0, followers:1});
            let followingDetails = [];
            for (let i = 0; i < followers.length; i++) {
                let profile = await Profile.findOne({userID: followers[i]}, {_id:0, username:1, profilePic:1, userID:1});
                followingDetails.push(profile);
            }
            console.log(followingDetails);
            return res.status(200).json({success: true, message:null, data:{following: followingDetails}})
        }
        else{
            let {following} = await Profile.findOne({ userID: req.user.userID }, { _id:0, following:1});
            let followingDetails = [];
            for (let i = 0; i < following.length; i++) {
                let profile = await Profile.findOne({userID: following[i]}, {_id:0, username:1, profilePic:1, userID:1});
                followingDetails.push(profile);
            }
            console.log(followingDetails);
            return res.status(200).json({success: true, message:null, data:{following: followingDetails}})
        }
    } catch (error) {
        next(error.message);        
    }
}


module.exports = {
    createProfile,
    MyProfileDetailsController,
    addEducationController,
    addSkillsController,
    addExperienceController,
    updateProfileController,
    updateProfilePictureController,
    updateCoverPictureController,
    deleteUserPictureController,
    followingMentorsContoller,
}