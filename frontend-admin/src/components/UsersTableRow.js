import React, { useState } from 'react'
import moment from 'moment';
import { GoBlocked } from "react-icons/go";
import { FcApproval } from "react-icons/fc";
import useAxios from '../hooks/useAxios';
import ENDPOINTS from '../configs/endpoints';

function UsersTableRow({user, type}) {
    const {username, email, mobile, createdAt, accountBlocked, _id } = user;
    const axiosInstance = useAxios();
    console.log(type)

    const [accountState, setAccountState] = useState(accountBlocked);
    const changeAccountState = () => {
        if(type === "mentor"){
            axiosInstance.post(ENDPOINTS.BLOCK_MENTOR, { userID:_id, status: accountState })
            .then(resp => setAccountState(!accountState))
            .catch(err => alert(err.message))
        }else if(type === "mentee"){
            axiosInstance.post(ENDPOINTS.BLOCK_MENTEE, { userID:_id, status: accountState })
            .then(resp => setAccountState(!accountState))
            .catch(err => alert(err.message))
        }else{
            alert("Unable to perform action")
        }
}


  return (
        <>
        <tr class="border-b dark:border-gray-700">
            <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {/* <img src={user?.profilePic?.secure_url ?? "NA"} class="w-auto h-16 mr-3" /> */}
                {username}
            </th>
            <td class="px-4 py-3">{email}</td>
            <td class="px-4 py-3">{mobile}</td>
            <td class="px-4 py-3">{moment(createdAt).format('MMMM Do, YYYY ◾ h:mm A')}</td>
            <th class="px-4 py-3">{accountState ? "Blocked" : "Active"}</th>
            <td>
                {
                    accountState ?
                    <FcApproval onClick={changeAccountState} className='text-red-500 text-3xl cursor-pointer inline-block' />
                    : <GoBlocked onClick={changeAccountState} className='text-red-500 text-3xl cursor-pointer inline-block mx-2' />
                }
                
            </td>
        </tr>
        </>
  )
}

export default UsersTableRow