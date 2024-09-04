import React from 'react'
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';

function BankACForm({ setShowModal, details }) {
    const closeModal = () => setShowModal(false);
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        accountNumber: details?.accountNumber,
        accountName: details?.accountHolderName,
        ifsc: details?.ifscCode,
        bank: details?.bank,
        branch:details?.branchName,
        gpay: details?.googlePayNumber,
    },
  });

    const onSubmit = async (data) => {
        axiosInstance.post(process.env.REACT_APP_PAYMENT_SVC_ENDPOINT + '/account/add', data)
        .then(resp => {
            showSuccessToast(resp.data?.message || "Account added successfully");
            closeModal();
        })
        .catch(err => showErrorToast(err?.response?.data?.message || "Unable to add account"));
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative md:w-1/3 w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold mb-4">Bank Account</h2>
                    <div className=" text-left">
                        <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={closeModal}>
                            X
                        </button>
                    </div>
                </div>
                {/* form here */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Account number
                        </label>
                        <input 
                            type="number"
                            placeholder='Enter account number' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('accountNumber', { required: true,})}
                        />
                        {errors?.accountNumber?.type=="required" && <small className="text-red-500">Please enter a valid account number</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Account Holder name
                        </label>
                        <input 
                            type="text"
                            placeholder='Enter account holder name' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('accountName', { required: true,})}
                        />
                        {errors?.accountName?.type=="required" && <small className="text-red-500">Please enter a valid name</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            IFSC code
                        </label>
                        <input 
                            type="text"
                            placeholder='SBIN0001234' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('ifsc', { required: true,})}
                        />
                        {errors?.ifsc?.type=="required" && <small className="text-red-500">Please enter a valid IFSC code</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Bank name
                        </label>
                        <input 
                            type="text"
                            placeholder='Enter Bank Name' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('bank', { required: true,})}
                        />
                        {errors?.bank?.type=="required" && <small className="text-red-500">Please enter a valid bank</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Branch name
                        </label>
                        <input 
                            type="text"
                            placeholder='Enter Bank Branch Name' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('branch', { required: true,})}
                        />
                        {errors?.type?.type=="required" && <small className="text-red-500">Please enter a valid type</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Google pay number
                        </label>
                        <input 
                            type="tel"
                            placeholder='Enter gpay number' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('gpay', { required: true,})}
                        />
                        {errors?.gpay?.type=="required" && <small className="text-red-500">Please enter a valid gpay number</small>}
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Update account details
                    </button>
                </form>
            </div>
        </div>
  )
}

export default BankACForm