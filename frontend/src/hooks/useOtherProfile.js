//to get the details of the other profile 
import { useEffect, useState } from 'react';
import { axiosInstance } from '../helpers/axios';
import { useParams } from 'react-router-dom';

function useOtherProfile() {
    const {id} = useParams();
    const[profileDetails, setProfileDetails] = useState(null)
    const [error, setError] = useState(null);

    useEffect(()=>{
            axiosInstance.get(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/users/" + id + "/profile")
            .then(resp => setProfileDetails(resp.data?.data?.profileDetails))
            .catch(err => console.log(err?.message))
    },[])

    console.log(profileDetails)

    return {profileDetails, error}
}

export default useOtherProfile