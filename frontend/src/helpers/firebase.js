// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { axiosInstance } from "./axios";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID ,
    appId: process.env.REACT_APP_FIREBASE_APP_ID ,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

//ask for notification permission and generate token
export const generateToken = async() => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === 'granted'){
        console.log("generating token...")
        //generate token
        const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_VAPID
        });    
        console.log(token);
        //post token to server
        await axiosInstance.post(process.env.REACT_APP_NOTIFICATION_SVC_ENDPOINT + "/fcm/token", {fcmToken: token} )
    }
}

