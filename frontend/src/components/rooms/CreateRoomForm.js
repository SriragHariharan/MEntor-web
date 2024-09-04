import React from 'react'
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../helpers/axios';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';


function CreateRoomForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        // Submit the form data to your API or perform any other action
        axiosInstance.post(process.env.REACT_APP_AUDIO_SVC_ENDPOINT + "/rooms/add", { data })
        .then(resp => {
            navigate("/mentee/room/" + resp.data.data.link);
            showSuccessToast(resp.data.message);
        })
        .catch(err => showErrorToast("Unable to create room"))
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} class="max-w-sm">
        <div class="mb-5">
            <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discussion Topic</label>
            <input
                {...register('roomName', { required: true })} 
                type="text" 
                class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
            />
            {errors.roomName && <sub class="text-red-500">Discussion Topic required</sub>}
        </div>
        <div class="mb-5">
            <button type='submit' className='bg-blue-500 w-full px-2.5 py-2 rounded-lg text-white'>Create and Join</button>
        </div>
    </form>
  )
}

export default CreateRoomForm