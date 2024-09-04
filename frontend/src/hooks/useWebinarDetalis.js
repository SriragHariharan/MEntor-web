import { useEffect, useState } from "react";
import { axiosInstance } from "../helpers/axios";
import { useParams } from "react-router-dom";

function useWebinarDetalis() {
    const [webinarDetails, setWebinarDetails] = useState(null);
    const [mentorDetails, setMentorDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(true);
    const { id } = useParams();

    useEffect(() =>{
        axiosInstance.get(process.env.REACT_APP_WEBINAR_SVC_ENDPOINT + `/webinar/${id}/details`)
        .then(resp => {
            setWebinarDetails(resp.data?.data?.details);
            setIsRegistered(resp.data?.data?.registered)
            return resp.data?.data?.details?.mentorID
        })
        .then(mentorID => {
            console.log(mentorID, "mentorID")
            axiosInstance.get(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + `/users/${mentorID}/profile`)
            .then(resp => setMentorDetails(resp.data?.data?.profileDetails))
        })
        .catch(error => setError(error.response?.data?.message))
    },[])


    return {webinarDetails, isRegistered, mentorDetails, error};
}

export default useWebinarDetalis