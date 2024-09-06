const Notification = require('../models/notificationModel');
const admin = require("firebase-admin");
const path = require('path');

const serviceAccount = require(path.join(__dirname, 'firebase-fcm.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const sendPushNotification = (fcmToken, title, body) => {
    const messaging = admin.messaging()
    var payload = {
        notification: {
            title,
            body
        },
        token: fcmToken
    };
    //send message to single user
    messaging.send(payload)
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

//send notification recieved from other services
const sendCustomNotification = async(jsonData) => {
    try {
        console.log("from other service",jsonData);
        const { title, message, recieverID } = jsonData;
        //userID, title, body 
        const { token } = await Notification.findOne({ userId: recieverID}, {_id:0, token:1}) ?? null;
        console.log(token, "FCM token");
        token && sendPushNotification(token, title, message)
    } catch (error) {
        console.log("custom notif error : ", error)        
    }
};

//send server notification
const sendServerNotification = async(userID, title, body) => {
    try {
        const { token } = await Notification.findOne({ userId: userID}, {_id:0, token:1}) ?? null;
        token && sendPushNotification(token, title, body)
    } catch (error) {
        console.log("server notif error : ", error)        
    }
};


module.exports = {
    sendPushNotification,
    sendCustomNotification,
    sendServerNotification,
};