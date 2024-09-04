import React, { useEffect, useState } from 'react'
import useAxios from './useAxios';
import ENDPOINTS from '../configs/endpoints';

function useGetUsersCount() {
    const axiosInstance = useAxios();
    const [usersCount, setUsersCount] = useState(null);

    useEffect(()=>{
        axiosInstance.get(ENDPOINTS.USERS_COUNT)
        .then(resp => setUsersCount(resp.data.data))
        .catch(err => console.log(err));
    },[])
    return usersCount;
}

export default useGetUsersCount