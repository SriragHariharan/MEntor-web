import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axios';

function useActiveRooms() {
    const [activeRooms, setActiveRooms] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() =>{
        axiosInstance.get(process.env.REACT_APP_AUDIO_SVC_ENDPOINT + "/rooms")
        .then(resp => setActiveRooms(resp.data.data?.roomsActive))
        .catch(err => setError("Unable to get active rooms"))
    },[])

    return {activeRooms, error};
}

export default useActiveRooms