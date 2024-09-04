import React, { useState } from 'react'
import moment from 'moment';
import useAxios from '../hooks/useAxios';
import ENDPOINTS from '../configs/endpoints';

function ApprovalCard({mentor}) {
    
    const axiosInstance = useAxios();
    const [adminApproved, setAdminApproved] = useState(mentor?.accountVerified)

    //approve a mentor
    const handleApproveMentor = (userID) => {
        axiosInstance.post(ENDPOINTS.APPROVE_MENTOR, { userID })
        .then(resp => setAdminApproved(true))
        .catch(err => console.log(err?.message));
    }

  return (
            <>
                <tr class="border-b dark:border-gray-700">
                    <th class="px-4 py-3 tracking-wider font-bold"># {mentor?._id}</th>
                    <td class="px-4 py-3">{mentor?.username}</td>
                    <td class="px-4 py-3">{moment(mentor?.createdAt).format('MMMM Do, YYYY ◾ h:mm A')}</td>
                    <td class="px-4 py-3">{mentor?.email}</td>
                    <td class="px-4 py-3">{mentor?.mobile}</td>
                    <th class=" text-red-400">Pending</th> 
                    {
                        !adminApproved && <td onClick={() => handleApproveMentor(mentor?._id)} className="bg-green-400 text-white cursor-pointer  text-center">Approve</td>
                    }  
                </tr>
            </>
  )
}

export default ApprovalCard