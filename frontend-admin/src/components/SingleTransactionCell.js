import React, { useState } from 'react'
import AccountModal from './AccountModal';

function SingleTransactionCell({ details}) {
    const[modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const[transferStatus, setTransferStatus] = useState(details?.status);
    console.log(modalOpen);


    return (
        <>
            <tr class="border-b dark:border-gray-700">
                <th class="px-4 py-3 tracking-wider font-bold">{details?.title}</th>
                <td class="px-4 py-3">{details?.category}</td>
                <th class="px-4 py-3">$ {details?.participants?.length * details?.amount}</th>
                <td class="px-4 py-3">{details?.mentorID}</td>
                <td class="px-4 py-3">{details?.participants?.length}</td>
                {
                    transferStatus === 'pending' ?(
                        <td class="px-4 py-3 bg-gray-200 text-center font-semibold">{transferStatus}</td>   
                    ):(
                        <td class="px-4 py-3 bg-green-300 text-center font-semibold">{transferStatus}</td>     
                    )
                }
                <td class="px-4 py-3 flex items-center justify-end">
                    <button onClick={handleOpenModal} class="block text-dark bg-dark hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">
                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </button>
                </td>
            </tr>
                
            {
                modalOpen && <AccountModal setTransferStatus={setTransferStatus} transactionID={details?._id} mentorID={details?.mentorID} setModalOpen={setModalOpen} />
            }
            
        </>
  )
}

export default SingleTransactionCell