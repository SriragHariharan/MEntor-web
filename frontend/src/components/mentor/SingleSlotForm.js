import React, { useState } from 'react'
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';
import { useForm } from 'react-hook-form';

function SingleSlotForm() {

    const { register, formState: { errors }, handleSubmit } = useForm();
	const onSubmit = (data) => {
		console.log(data);
		setLoading(true);
		axiosInstance.post(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + '/slot/add/single', data)
		.then(resp => {
			showSuccessToast(resp?.data?.message);
			setLoading(false);
		})
		.catch(err => {
			showErrorToast(err?.message);
			setLoading(false);
		})
	}
	
	const [loading, setLoading] = useState(false);

  return (
    <>
        <div class="p-4">
			{/* <!-- Modal content --> */}
            <div class="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div class="flex flex-col items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Add slots
                    </h3>
                    <small className='text-sm font-regular text-gray-500 dark:text-white'>
                        * make sure you don't accidentally add two slots for the same time
                    </small>
                </div>
                {/* <!-- Modal body --> */}
                <form onSubmit={handleSubmit(onSubmit)} class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Date
                            </label>
                            <input
                                {...register("date", { required: true })}
                                type="date"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.date?.type === 'required' && <small style={{color:'red'}}>Required field</small>}
                        </div>
                        <div class="col-span-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Time
                            </label>
                            <input
                                {...register("time", { required: true })}
                                type="time"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type amount"
                            />
                            {errors.time?.type === 'required' && <small style={{color:'red'}}>Required field</small>}
                        </div>
                        <div class="col-span-2">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Amount in ₹
                            </label>
                            <input
                                {...register("amount", { required: true })}
                                type="number"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type amount"
                            />
                            {errors.amount?.type === 'required' && <small style={{color:'red'}}>Required field</small>}
                        </div>
                    </div>
                    {
                        loading ? (
                        <button class="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Adding Slot...
                        </button>
                        ):(
                        <button class="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add slot
                        </button>

                        )
                    }
                </form>
            </div>
        </div>
    </>
  )
}

export default SingleSlotForm