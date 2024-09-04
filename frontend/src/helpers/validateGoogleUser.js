import axios from "axios";

export const validateGoogleUser = (token) => {
    return new Promise((resolve, reject) => {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then(res => resolve(res.data))
                .catch(err => reject(err));
    }) 
}

