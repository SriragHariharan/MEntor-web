// form to add reccuring slots

import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';

function ReccuringSlotsForm() {
    
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
		console.log(data);
		setLoading(true);
		axiosInstance.post(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + '/slot/add/reccuring', data)
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
        <div className="p-4">
            {/* <!-- Modal content --> */}
            <div className="bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Add recurring slots
                    </h3>
                    <small className='text-sm font-regular text-gray-500 dark:text-white'>
                        * make sure you don't accidentally add two slots for the same time
                    </small>
                </div>
                {/* <!-- Modal body --> */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Time
                            </label>
                            <input
                                {...register("time", { required: true })}
                                type="time"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type amount"
                            />
                            {errors.time?.type === 'required' && <small style={{color:'red'}}>Required field</small>}
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Amount in ₹
                            </label>
                            <input
                                {...register("amount", { required: true })}
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type amount"
                            />
                            {errors.amount?.type === 'required' && <small style={{color:'red'}}>Required field</small>}
                        </div>
                        <div className="col-span-2">
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                            <select {...register("type", { required: true })} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a reccuring option</option>
                                <option value={10}>Next 10 days</option>
                                <option value={0}>Next 10 Sundays</option>
                                <option value={1}>Next 10 Mondays</option>
                                <option value={2}>Next 10 Tuesdays</option>
                                <option value={3}>Next 10 Wednesdays</option>
                                <option value={4}>Next 10 Thursdays</option>
                                <option value={5}>Next 10 Fridays</option>
                                <option value={6}>Next 10 Saturd</option>
                            </select>
                        </div>
                        {/* <div className="col-span-2">
                            <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                value="tenDays"
                                {...register('type', { required: true })}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Next 10 days
                            </label>
                            </div>
                            <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                value="tenSundays"
                                {...register('type', { required: true })}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Next 10 Sundays
                            </label>
                            </div>
                            <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                value="tenMondays"
                                {...register('type', { required: true })}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Next 10 Mondays
                            </label>
                            </div>
                            <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                value="tenTuesdays"
                                {...register('type', { required: true })}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Next 10 Tuesdays
                            </label>
                            </div>
                            <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                value="tenWednesdays"
                                {...register('type', { required: true })}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Next 10 Wednesdays
                            </label>
                            </div>
                            <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                value="tenThursdays"
                                {...register('type', { required: true })}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Next 10 Thursdays
                            </label>
                            </div>
                            <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                value="tenFridays"
                                {...register('type', { required: true })}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Next 10 Fridays
                            </label>
                            </div>
                            <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                value="tenSaturdays"
                                {...register('type', { required: true })}
                            />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Next 10 Saturdays
                            </label>
                            </div>
                            {errors.radioGroup && (
                            <p className="text-red-500">Please select a radio option</p>
                            )}
                        </div> */}
                    </div>
                    {
                        loading? (
                            <button className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Adding Slots...
                            </button>
                        ):(
                            <button className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add slots
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
    </>
  )
}

export default ReccuringSlotsForm