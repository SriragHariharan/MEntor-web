import React, { useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios';
import ENDPOINTS from '../configs/endpoints';

function AccountModal({ transactionID, setModalOpen, mentorID, setTransferStatus }) {
    const axiosInstance = useAxios();
    
    const closeModal = () => setModalOpen(false);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        axiosInstance.get(ENDPOINTS.BANK_ACCOUNT + mentorID)
        .then(resp => setAccount(resp.data?.data?.account))
        .catch(err => console.log(err?.response?.data?.message))

        return () => setAccount(null);
    }, [mentorID]);

    const handleMarkAsTransfered = () => {
        alert("Are you sure you want to mark this transaction as transfered?");
        axiosInstance.post(ENDPOINTS.COMPLETED_TRANSACTION + transactionID)
        .then(resp => {
            setTransferStatus("transfered");
            closeModal();
        })
        .catch(err => console.log(err?.response?.data?.message))
    }

  return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold mb-4">Account details</h2>
                    <div className=" text-left">
                        <button onClick={closeModal} className="px-2 py-1 bg-red-600 text-white rounded">
                            X
                        </button>
                </div>
                </div>
                <dl>
                    <dt class="underline underline-offset-4 mb-2 font-light leading-none text-gray-900 dark:text-white">A/C number</dt>
                    <dd class="mb-4 font-bold text-gray-500 sm:mb-5 dark:text-gray-400">{account?.accountNumber}</dd>

                    <dt class="underline underline-offset-4 mb-2 font-light leading-none text-gray-900 dark:text-white">A/C Holder name</dt>
                    <dd class="mb-4 font-bold text-gray-500 sm:mb-5 dark:text-gray-400">{account?.accountHolderName}</dd>
                    
                    <dt class="underline underline-offset-4 mb-2 font-light leading-none text-gray-900 dark:text-white">Bank name</dt>
                    <dd class="mb-4 font-bold text-gray-500 sm:mb-5 dark:text-gray-400">{account?.bank}</dd>

                    <dt class="underline underline-offset-4 mb-2 font-light leading-none text-gray-900 dark:text-white">Branch Name</dt>
                    <dd class="mb-4 font-bold text-gray-500 sm:mb-5 dark:text-gray-400">{account?.branchName}</dd>

                    <dt class="underline underline-offset-4 mb-2 font-light leading-none text-gray-900 dark:text-white">IFSC</dt>
                    <dd class="mb-4 font-bold text-gray-500 sm:mb-5 dark:text-gray-400">{account?.ifscCode}</dd>

                    <dt class="underline underline-offset-4 mb-2 font-light leading-none text-gray-900 dark:text-white">Google Pay number</dt>
                    <dd class="mb-4 font-bold text-gray-500 sm:mb-5 dark:text-gray-400">{account?.googlePayNumber}</dd>
                </dl>
                <div onClick={handleMarkAsTransfered} className="bg-green-400 px-6 py-4 rounded-xl text-center text-white cursor-pointer">
                    Mark as transfered { transactionID }
                </div>
            </div>
        </div>
  )
}

export default AccountModal

{/* Modal */}
        