import React, { useEffect, useState } from 'react'
import useAxios from './useAxios';
import ENDPOINTS from '../configs/endpoints';

function useGetTransactions() {
    
    const axiosInstance = useAxios();
    const[revenue, setRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    useEffect(() => {
        axiosInstance.get(ENDPOINTS.TRANSACTIONS + "all")
        .then(resp => {
            let transactionsArr = resp.data.data?.transactions;
            let sum = 0;
            for (let i = 0; i < transactionsArr.length; i++){
                let total = transactionsArr[i].amount * transactionsArr[i].participants.length;
                sum += total;
            }
            setRevenue(sum);
        })
        .catch(err => console.log(err))
    },[]);

    useEffect(() => {
        axiosInstance.get(ENDPOINTS.TRANSACTIONS + "month")
        .then(resp => {
            let transactionsArr = resp.data.data?.transactions;
            let sum = 0;
            for (let i = 0; i < transactionsArr.length; i++){
                let total = transactionsArr[i].amount * transactionsArr[i].participants.length;
                sum += total;
            }
            setMonthlyRevenue(sum);
        })
        .catch(err => console.log(err))
    },[]);

    return {revenue, monthlyRevenue};
}

export default useGetTransactions