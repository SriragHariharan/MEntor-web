import axios from "axios";

export const signupUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/signup", data)
            let jsonData = resp.data;
            resolve(jsonData);      
        } catch (error) {
            reject(error?.response?.data.message);
        }
    })
}

export const singupMentor = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/signup/mentor", data)
            let jsonData = resp.data;
            resolve(jsonData);      
        } catch (error) {
            reject(error?.response?.data.message);
        }
    })
}

export const loginUser = (data) => {
    console.log(data)
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/login", data)
            let jsonData = resp.data;
            resolve(jsonData);      
        } catch (error) {
            reject(error?.response?.data.message);
        }
    })
}

export const googleSignupUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/signup/google", data)
            let jsonData = resp.data;
            resolve(jsonData);      
        } catch (error) {
            reject(error?.response?.data.message);
        }
    })
}

export const googleSignupUserWithRole = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/signup/google-role", data)
            let jsonData = resp.data;
            resolve(jsonData);
        } catch (error) {
            reject(error?.response?.data.message);
        }
    })
}

export const verifyOTP = (otp) => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/otp/verify", {email:localStorage.getItem('mentor_otp_verification_email'), otp})
            let jsonData = resp.data;
            resolve(jsonData);
        } catch (error) {
            reject(error?.response?.data.message)
        }
    })
}

export const verifyEmail = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/verify-email", {email})
            let jsonData = resp.data;
            console.log(jsonData);
            resolve(jsonData);
        } catch (error) {
            reject(error?.response?.data.message)
        }
    })
}

//verify forgot password otp
export const verifyResetPasswordOTP = (otp) => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/password/forgot/otp/resend", {email:localStorage.getItem('mentor_otp_verification_email'), otp})
            let jsonData = resp.data;
            resolve(jsonData);
        } catch (error) {
            reject(error?.response?.data.message)
        }
    })
}

//verify forgot password otp
export const resetPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/password/reset", {tempToken:localStorage.getItem('MEntor_temp_token'), password})
            let jsonData = resp.data;
            resolve(jsonData);
        } catch (error) {
            reject(error?.response?.data.message)
        }
    })
}


//resend otp on request on signup page
export const resendSignupOtp = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.post(process.env.REACT_APP_USER_SVC_ENDPOINT + "/otp/resend", {email:localStorage.getItem('mentor_otp_verification_email')})
            let jsonData = resp.data;
            resolve(jsonData);
        } catch (error) {
            reject(error?.response?.data.message)
        }
    })
}
