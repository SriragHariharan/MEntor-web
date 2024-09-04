import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axios';
import { insertDataToIndexedDB, retrieveDataFromIndexdDB } from '../helpers/local-forage';

function useGetFollowers() {
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!navigator.onLine){
            retrieveDataFromIndexdDB("followers")
            .then(data => setFollowers(data))
            .catch(error => setError("Unable to fetch data"));
        }else{
            axiosInstance.get(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/followers")
            .then(resp => {
                setFollowers(resp.data?.data?.followers);
                insertDataToIndexedDB("followers", resp.data?.data?.followers)
            })
            .catch(err => setError(err?.message));
        }
    },[])

    return {followers, error}
}

export default useGetFollowers