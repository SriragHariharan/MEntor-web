import React, { useState } from 'react'
import { axiosInstance } from '../../helpers/axios'
import { useDispatch } from 'react-redux';
import { deleteSlot } from '../../redux toolkit/slotSlice';
import { showSuccessToast } from '../../helpers/ToastMessageHelpers';

function SlotsTable({slots, setSlots, setDate}) {
    const dispatch = useDispatch();
    //delete a slot
    const handleDeleteSlot = (slotID) => {
        console.log(slots[0]);
        axiosInstance.delete(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT +  "/slot/"+slotID+"/delete" )
        .then(resp => {
            dispatch(deleteSlot(slotID));
            showSuccessToast(resp.data.message);
        })
        .catch(err => console.log(err))
    }

   

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-12">
                <input type="date" value={null} onChange={e => setDate(e.target.value)} className='dark:bg-gray-700 mb-2 placeholder:text-white' />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price (₹)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Available
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        slots?.map(slot => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {slot?.date?.split('T')[0]}
                                </th>
                                <td className="px-6 py-4 font-bold">
                                    {slot?.time}
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {slot?.amount}
                                </td>
                                {
                                    slot?.isBooked ?(
                                        <td className="px-6 py-4 text-red-500">
                                            No
                                        </td>
                                    ):(
                                        <td className="px-6 py-4 text-green-500">
                                            Yes
                                        </td>
                                    )
                                }
                                {
                                    slot?.isBooked ?(
                                        <td className="flex items-center px-6 py-4 cursor-pointer">
                                            <div className="font-medium text-green-600 dark:text-green-500 hover:underline ms-3">View profile</div>
                                        </td>
                                    ):(
                                        <td className="flex items-center px-6 py-4 cursor-pointer" onClick={() => handleDeleteSlot(slot?._id)}>
                                            <div className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete slot</div>
                                        </td>
                                    )
                                }
                            </tr>
                        ))
                    }
                </tbody>
                {
                    slots?.length===0 && (
                        <tbody className="text-center text-4xl">
                            No slots found in selected date
                        </tbody>
                    )
                }
            </table>
        </div>
  )
}

export default SlotsTable