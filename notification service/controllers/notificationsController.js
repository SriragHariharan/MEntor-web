const {sendPushNotification, sendServerNotification} = require('../helpers/push-notification');
const Notification = require('../models/notificationModel');

const addNewUser = async(data) => {
    try {
        console.log(data);
        const newNotificationObj = new Notification({
                userId: data.userID,
                notifications: [
                    {   
                        type: "setting",
                        title: 'Profile updation',
                        message: 'Please update your profile to ensure accurate information.',
                        read: false,
                        deleted: false
                    }
                ]
        });
        await newNotificationObj.save();    
        //sendServerNotification(data?.userID,'Profile updation', 'Please update your profile to ensure accurate information.' )
    } catch (error) {
        next(error);
    }
}

const getNotificationsController = async(req, res, next) => {
    try {
        const {notifications} = await Notification.findOne({ userId: req.user.userID }, {_id:0, notifications:1});
        return res.status(200).json({ success: true, message:null, data:{ notifications }})
    } catch (error) {
        next(error);
    }
};

//save FCM Token
const saveFCMTokenController = async(req, res, next) => {
    try {
        let res = await Notification.updateOne({ userId: req.user?.userID}, {$set:{ token: req.body.fcmToken}});
        sendPushNotification(req.body.fcmToken, "Welcome message", "Hi, welcome to MEntor. A place where we grow by lifting others. Let's travel togeather and make the world more knowledge heavy.");
        console.log(res);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addNewUser,
    getNotificationsController,
    saveFCMTokenController,
};