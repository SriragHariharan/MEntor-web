import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axios';
import { insertDataToIndexedDB, retrieveDataFromIndexdDB } from '../helpers/local-forage';

function useTransactions() {
    const[transactions, setTransactions] = useState([]);

    useEffect(() => {
        if(!navigator.onLine){
            retrieveDataFromIndexdDB("transactions")
            .then(data => setTransactions(data))
            .catch(err => console.log("Unable to retrieve transactions"))
        }
        axiosInstance.get(process.env.REACT_APP_PAYMENT_SVC_ENDPOINT + "/transactions")
        .then(resp => {
            setTransactions(resp.data?.data?.transactions);
            insertDataToIndexedDB("transactions", resp.data?.data?.transactions)
        })
        .catch(err => console.log(err?.response?.data?.message));
    },[])

    return transactions;
}

export default useTransactions