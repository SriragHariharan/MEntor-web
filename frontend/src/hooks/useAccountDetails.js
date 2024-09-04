import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axios';

function useAccountDetails(showModal) {
    const[account, setAccount] = useState(null);
    const[error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_PAYMENT_SVC_ENDPOINT + '/account')
        .then(resp => setAccount(resp.data?.data?.account))
        .catch(err => setError(err));
    },[showModal])

    return {account, error};
}

export default useAccountDetails;