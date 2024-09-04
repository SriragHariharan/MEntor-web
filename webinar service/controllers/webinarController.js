const uploadFileToS3 = require("../helpers/aws");
const Webinar = require("../models/webinarModal")
const User = require("../models/userModal");

//create a new profile with data from kafka broker
const createProfile = async(messageData) => {
    try {
        console.log("CP :::",messageData)
        let {userID, username, email, role} = messageData;
        const newProfileObject = new User({userID, username, email, role});
        await newProfileObject.save();
        console.log("New user profile created..!");
    } catch (error) {
        console.log(error.message);
    }
}

//generate a meeting link
function generateMeetingLink() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const linkLength = 8; // adjust the length of the link as needed
  let meetingLink = '';
  const timestamp = Date.now();

  for (let i = 0; i < linkLength; i++) {
    meetingLink += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `webinar-${timestamp}-${meetingLink}`;
}

//add webinar controller
const addNewWebinarController = async(req, res, next) => {
    try {
        if(req.user?.role !== "mentor"){
            return next("Unauthorized request");
        }
        let imageURL = await uploadFileToS3(req);
        delete req.body.banner;
        let link = generateMeetingLink();
        data = {...req.body, amount: Number(req.body.amount), banner: imageURL, mentorID: req.user?.userID, link}
        let newWebinarObject = new Webinar(data);
        let response = await newWebinarObject.save();
        console.log(response);
        return res.status(201).json({success: true, message: `Successfully added webinar`, data: {webinarID: response?._id} })
    } catch (error) {
        next(error.message)
    }
};

const getAllWebinarsController = async(req, res, next) => {
    try {
        if(req.user.role === "mentor"){
            let webinars = await Webinar.find({mentorID: req.user.userID}).sort({date: -1});

            //todays webinars
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
            let todaysWebinars = await Webinar.find({ mentorID: req.user.userID, date: { $gte: startOfDay, $lt: endOfDay } })

            return res.status(200).json({success:true, message:null, data:{webinars, todaysWebinars}})
        }
        const today = new Date();
        const todaysDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const option = req.params.option;
        console.log(option)
        let webinars = [];
        switch(option) {
            case "all": 
                webinars = await Webinar.find({date: {$gte: todaysDate}}).sort({date: -1});
                break;
            case "today": 
                const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

                webinars = await Webinar.find({ date: { $gte: startOfDay, $lt: endOfDay } }).sort({date: -1});
                break;
            case "free":
                webinars = await Webinar.find({$and:[{amount: 0}, {date: {$gt: todaysDate}}]}).sort({date: -1});
                break;
            case "paid":
                webinars = await Webinar.find({$and:[{amount: {$gt:0}}, {date: {$gt: todaysDate}}]}).sort({date: -1});
                break;
            case "mine":
                let myWebinars = await User.findOne({userID: req.user?.userID}, {webinars:1, _id:0});
                webinars = await Promise.all(myWebinars?.webinars?.map(async wID => await Webinar.findOne({_id:wID})))   
                break;           
            default:
                webinars = await Webinar.find({date: {$gt: todaysDate}}).sort({date: -1});
            }
            return res.status(200).json({success: true, message: null, data:{ webinars}})
    } catch (error) {
        next(error.message)
    }
};

//get details of a webinar
const getWebinarDetailsController = async(req, res, next) => {
    try {
        const details = await Webinar.findOne({_id:req.params.webinarID});
        if(details?.participants.includes(req.user?.userID) || req.user?.role === 'mentor'){
            return res.status(200).json({success: true, message:null, data:{details, registered: true}});
        }
        return res.status(200).json({success: true, message:null, data:{details, registered: false}});
    } catch (error) {
        next(error.message);
    }
}

//register for a webinar
const registerWebinarController = async(req, res, next) => {
    try {
        await Webinar.updateOne({_id:req.params.webinarID}, {$push: {participants: req.user?.userID}});
        await User.updateOne({userID: req.user?.userID}, {$push:{webinars: req.params.webinarID}});
        return res.status(200).json({success: true, message:null, data:null});
    } catch (error) {
        next(error.message);
    }
}


module.exports = {
    createProfile,
    addNewWebinarController,
    getAllWebinarsController,
    getWebinarDetailsController,
    registerWebinarController,
}