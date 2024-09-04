const sendEmail = require("./nodemailer");

const sendVerificationOTP = (email, otp) => {
    console.log("email received : ", email, otp)
    let  mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email ,
        subject: "MEntor: Your OTP for Verification",
        text: `Thank you for using our service. To complete your verification, please use the following One-Time Password (OTP): ${otp}. This OTP is valid for the next 10 minutes. Please do not share this code with anyone.`,
    };
    sendEmail(mailOptions)
}


module.exports = {
    sendVerificationOTP,
}