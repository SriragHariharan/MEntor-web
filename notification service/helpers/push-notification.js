const Notification = require('../models/notificationModel');
const admin = require("firebase-admin");

const serviceAccount = require("./mentor-c7c81-firebase-adminsdk-qw5bm-c7185fec37.json");

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
    console.log("from other service",jsonData);
    const { title, message, recieverID } = jsonData;
    //userID, title, body 
    const { token } = await Notification.findOne({ userId: recieverID}, {_id:0, token:1});
    console.log(token, "FCM token");
    token && sendPushNotification(token, title, message)
};

//send server notification
const sendServerNotification = async(userID, title, body) => {
    const { token } = await Notification.findOne({ userId: userID}, {_id:0, token:1});
    sendPushNotification(token, title, body)
};


module.exports = {
    sendPushNotification,
    sendCustomNotification,
    sendServerNotification,
};