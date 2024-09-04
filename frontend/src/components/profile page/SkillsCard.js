import React from 'react';
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkillsAction } from '../../redux toolkit/profileSlice';

function SkillsCard({skills, editAccess}) {
	const dispatch = useDispatch();
	const { register, formState: { errors }, handleSubmit } = useForm(); //a part of react-hook-form
    const onSubmit = (data) => {
		axiosInstance.post(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/profile/skills", data)
		.then(resp => {
			dispatch(updateSkillsAction(data))
			showSuccessToast(resp.data.message);
		})
		.catch(error => showErrorToast(error.message))
	} 

  return (
		<div className="w-full">
			<div className="bg-white dark:bg-gray-900 rounded shadow-md p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-bold dark:text-gray-400">Skills</h2>
					{
						editAccess && (
							<button
								data-modal-target="skills-modal"
								data-modal-toggle="skills-modal"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							>
								Add Skill
							</button>
						)
					}
				</div>
				<ul className="list-none mb-4">
				{
					(skills.length > 0) ? 
					skills.map(skill => 
						<li className="py-4 border-b border-gray-200 ">
							<div className="flex justify-between items-center">
							<span className="text-sm font-bold dark:text-gray-500">
								{skill?.skill}
							</span>
							<span className="font-semibold text-sm text-gray-500 dark:text-gray-500">
								{skill?.level}
							</span>
							</div>
						</li>
					) : <div className="text-xl text-gray-300">No Skills added</div>
				}
					</ul>
			</div>

			{/* modal starts here */}
			<div id="skills-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
				<div className="relative p-4 w-full max-w-md max-h-full">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Add skills you hold
							</h3>
							<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="skills-modal">
								<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						{/* <!-- Modal body --> */}
						<form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
							<div className="grid gap-4 mb-4 grid-cols-2">
								<div className="col-span-2">
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill</label>
									<input {...register("skill", { required: true})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white " placeholder="Type your skill" required="true" />
									{errors.skill?.type === 'required' && <small style={{color:'red'}}>Required field</small>}
								</div>

								<div className="col-span-2">
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
									<select  {...register("level", { required: true})}  id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
										<option selected="">Select category</option>
										<option value="beginner">Beginner</option>
										<option value="intermediate">Intermediate</option>
										<option value="advanced">Advanced</option>
										<option value="pro">Pro</option>
									</select>
									{errors.level?.type === 'required' && <small style={{color:'red'}}>Required field</small>}
								</div>
							</div>
							<button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								Add skill
							</button>
						</form>
					</div>
				</div>
			</div> 
		</div>
  );
}

export default SkillsCard