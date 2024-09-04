import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast } from '../../helpers/ToastMessageHelpers';

function InterviewsTable({ interview }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackObj, setFeebackObj] = useState({ marks: null, feedback: null});
    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    //get the feedback added
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + `/meetings/${interview?._id}/feedback`)
        .then(resp => setFeebackObj(resp.data.data))
        .catch(error => showErrorToast(error.response.data.message));
    },[])

  return (
    <>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {moment(interview?.date).format('MMMM Do, YYYY')}
            </th>
            <td class="px-6 py-4font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {interview?.time}
            </td>
            <Link to={`/${interview?.mentorID}/profile`} class="px-6 py-4 text-blue-500">View Profile</Link>
            <td class="px-6 py-4">$ {interview?.amount}</td>
            <td class="px-6 py-4 text-dark font-bold">
                {interview?.status}
            </td>
            <td class="px-6 py-4 text-pink-500 font-bold">
                {interview?.feedback ?"Added" : "--"}
            </td>
            <td class="px-6 py-4 flex gap-6">
                {
                    interview?.status === "not completed" && (
                        <Link to={"/mentee/interview/" + interview?.link} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Join
                        </Link>
                    )
                }
                {
                    interview?.feedback && (
                        <div onClick={handleToggleModal} class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                            View feedback
                        </div>
                    )
                }

            </td>
        </tr>

        {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:mx-96 relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold mb-4">Meeting feedback</h2>
                            <div className=" text-left">
                                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={handleToggleModal}>
                                    X
                                </button>
                            </div>
                        </div>
                         <table className="min-w-full bg-white">
                            <tbody>
                                <tr className="w-full">
                                    <td className="border px-4 py-2 font-semibold">Marks</td>
                                    <td className="border px-4 py-2 text-2xl font-bold">{feedbackObj?.marks ?? "Not added"}</td>
                                </tr>
                                <tr className="w-full">
                                    <td className="border px-4 py-2 font-semibold">Feedback</td>
                                    <td className="border px-4 py-2">
                                        { feedbackObj?.feedback ?? "Not added" }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
    </>
  )
}

export default InterviewsTable