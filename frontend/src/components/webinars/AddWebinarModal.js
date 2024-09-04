import React from 'react'
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';
import { useNavigate } from 'react-router-dom';
 
 function AddWebinarModal({ handleToggleModal }) {
     const navigate = useNavigate();
    const { register, handleSubmit, errors } = useForm();
    const closeModal = () => {
        handleToggleModal(false);
    }

    const onSubmit = (data) => {
        const formData = new FormData();
        // Append form data
        Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
        });

        // If you have a file input
        formData.append('file', data.banner[0]);
        
        axiosInstance.post(process.env.REACT_APP_WEBINAR_SVC_ENDPOINT + "/webinar/add", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(resp => {
            const webinarID  = resp.data?.data?.webinarID
            closeModal();
            navigate("/mentor/webinar/" + webinarID);
            showSuccessToast("Webinar added successfully");
        })
        .catch(err => showErrorToast(err?.response?.data?.message))
    }




  return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative md:w-4/6 w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold mb-4">Add webinar</h2>
                    <div className=" text-left">
                        <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={closeModal}>
                            X
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Topic
                        </label>
                        <input 
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            placeholder='Topic: web development, devops, cloud...' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            {...register('banner', { required: true,})}
                        />
                        {errors?.banner && <p className="text-red-500">Please enter a valid topic</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Topic
                        </label>
                        <input 
                            type="text"
                            placeholder='Topic: web development, devops, cloud...' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('topic', { required: true,})}
                        />
                        {errors?.topic && <p className="text-red-500">Please enter a valid topic</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Title
                        </label>
                        <input 
                            type="text"
                            placeholder='Title, make it interesting' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('title', { required: true,})}
                        />
                        {errors?.title && <p className="text-red-500">Please enter a valid title</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Date and time
                        </label>
                        <input 
                            type="datetime-local"
                            placeholder='Node.js A Javascript legacy' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('date', { required: true,})}
                        />
                        {errors?.date && <p className="text-red-500">Please enter a valid date</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Type (recorded / live)
                        </label>
                        <input 
                            type="text"
                            placeholder='recorded/ live/ on demand' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('type', { required: true,})}
                        />
                        {errors?.type && <p className="text-red-500">Please enter a valid type</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            placeholder='The description of the webinar'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('description', { required: true })}
                        />
                        {errors?.description && <p className="text-red-500">Please enter some description</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">       
                            Amount ($)
                        </label>
                        <input 
                            type="number"
                            placeholder='Enter amount, $0 if free' 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register('amount', { required: true,})}
                        />
                        {errors?.amount && <p className="text-red-500">Please enter a valid amount</p>}
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Add webinar
                    </button>
                </form>
            </div>
        </div>
  )
}

export default AddWebinarModal