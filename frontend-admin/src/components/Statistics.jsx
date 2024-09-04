import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../configs/axios'
import ENDPOINTS from '../configs/endpoints'

function Statistics() {
    const [count, setCount] = useState(null);
    console.log(count);
    //get users count
    useEffect(() =>{
        axiosInstance.get(ENDPOINTS.USERS_COUNT)
        .then(resp => setCount(resp.data?.data))
        .catch(err => console.log(err.message))
    },[])

  return (
        <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-5 dark:text-white sm:p-8">
            <div class="flex flex-col items-center justify-center bg-green-100 p-4 rounded-3xl">
                <dt class="mb-2 text-3xl font-extrabold">{count?.mentor}</dt>
                <dd class="text-gray-500 dark:text-gray-400">Total Mentors</dd>
            </div>
            <div class="flex flex-col items-center justify-center bg-blue-100 p-4 rounded-3xl">
                <dt class="mb-2 text-3xl font-extrabold">{count?.mentee}</dt>
                <dd class="text-gray-500 dark:text-gray-400">Total Mentees</dd>
            </div>
            <div class="flex flex-col items-center justify-center bg-teal-100 p-2 rounded-3xl">
                <dt class="mb-2 text-3xl font-extrabold">125</dt>
                <dd class="text-gray-500 dark:text-gray-400">Completed webinars</dd>
            </div>
            <div class="flex flex-col items-center justify-center bg-red-100 p-4 rounded-3xl">
                <dt class="mb-2 text-3xl font-extrabold">459</dt>
                <dd class="text-gray-500 dark:text-gray-400">Meetings</dd>
            </div>
            <div class="flex flex-col items-center justify-center bg-purple-100 p-2 rounded-3xl">
                <dt class="mb-2 text-3xl font-extrabold">₹ 450000</dt>
                <dd class="text-gray-500 dark:text-gray-400">Revenue generated</dd>
            </div>
        </dl>
  )
}

export default Statistics