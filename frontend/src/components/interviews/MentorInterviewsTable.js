import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';

function MentorInterviewsTable({ interview }) {

    const { register, handleSubmit, errors } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [interviewStatus, setInterviewStatus] = useState(interview?.status);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    console.log(interview, "interviews");

    const onSubmit = (data) => {
        console.log(data);
        axiosInstance.post(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/meetings/feedback", { interviewID: interview?._id, ...data } )
        .then(resp => {
            // store in database
            showSuccessToast(resp.data.message)
            setIsModalOpen(false);
        })
        .catch(error => showErrorToast(error?.response?.data.message))
    };

    const handleMarkAsCompleted = () => {
        alert("Are you sure you want to mark as completed?");
        axiosInstance.post(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/meetings/complete", { interviewID: interview?._id  } )
        .then(resp => {
            //set transaction as completed
            showSuccessToast(resp.data.message)
            setInterviewStatus("completed");
        })
        .catch(error => showErrorToast(error?.response?.data.message))
    }

  return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {moment(interview?.date).format('MMMM Do, YYYY')}
                </th>
                <td className="px-6 py-4font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {interview?.time}
                </td>
                <Link to={`/${interview?.menteeID}/profile`} className="px-6 py-4 text-blue-500">View Profile</Link>
                <td className="px-6 py-4">$ {interview?.amount}</td>
                <td className="px-6 py-4 text-dark font-bold">
                    {interviewStatus}
                </td>
                <td className="px-6 py-4 text-pink-500 font-bold">
                    {interview?.feedback ? "Added" : "--"}
                </td>
                <td className="px-6 py-4 flex gap-6">
                    {
                        interviewStatus !== "completed" && (
                            <Link to={"/mentor/interview/" + interview?.link} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Join
                            </Link>
                        )
                    }
                    {
                        interviewStatus === "completed" && (
                            <div onClick={handleToggleModal} className="font-medium text-red-600 hover:underline cursor-pointer">
                                Feedback
                            </div>
                        )
                    }
                    {
                        interviewStatus !== "completed" && (
                            <div onClick={handleMarkAsCompleted} className="font-medium text-green-600 hover:underline cursor-pointer">
                                Completed
                            </div>
                        )
                    }
                </td>                   
            </tr>
            
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold mb-4">Meeting feedback</h2>
                            <div className=" text-left">
                                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={handleToggleModal}>
                                    X
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">       
                                    Marks (out of 10)
                                </label>
                                <input 
                                    type="number" 
                                    placeholder={interview?.marks}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    {...register('marks', { required: true, min: 0, max: 10 })}
                                />
                                {errors?.marks && <p className="text-red-500">Please enter a valid mark (0-10)</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Feedback
                                </label>
                                <textarea
                                    id="feedback"
                                    placeholder={interview?.feedback}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    {...register('feedback', { required: true })}
                                />
                                {errors?.feedback && <p className="text-red-500">Please enter some feedback</p>}
                            </div>
                            <button
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
  )
}

export default MentorInterviewsTable