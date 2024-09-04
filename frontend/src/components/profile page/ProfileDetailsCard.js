import React, { useEffect, useState } from 'react'
import { FaUserFriends } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserDetails, updateCoverPic, updateProfilePic } from '../../redux toolkit/profileSlice';
import { DEFAULT_COVER_IMG, DEFAULT_USER_IMG } from '../../helpers/CONSTANTS';
import ProfileQR from './ProfileQR';

function ProfileDetailsCard({profileDetails,followersCount,profilePic, coverPic, editAccess}) {
	const dispatch = useDispatch();

	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	//destructuring props
	const {username, bio, about, jobDescription, githubLink, linkedInLink, skills, userID} = profileDetails;
	console.log(profileDetails, "PD");

	const [profileImageLink, setProfileImageLink] = useState(null);
	const [coverImageLink, setCoverImageLink] = useState(null);
	const [profileImage, setProfileImage] = useState(null);
	const [coverImage, setCoverImage] = useState(null);
	const[isImageUploading, setIsImageUploading] = useState(false);
    
	const handleProfileChange = (e) => {
        setProfileImage(e.target.files[0]);
		setProfileImageLink(URL.createObjectURL(e.target.files[0]));
    };
    const handleCoverChange = (e) => {
		setCoverImage(e.target.files[0]);
        setCoverImageLink(URL.createObjectURL(e.target.files[0]));
    };

	const [name, setName] = useState("")
	const [title, setTitle] = useState("")
	const [aboutMe, setAboutMe] = useState("")
	const [myBio, setMyBio] = useState("")
	const [myGithubLink, setMyGithubLink] = useState("")
	const [myLinkedInLink, setMyLInkedInLink] = useState("")

	useEffect(() => {
		setName(username)
		setAboutMe(about)
		setTitle(jobDescription)
		setMyBio(bio)
		setMyGithubLink(githubLink)
		setMyLInkedInLink(linkedInLink)
	}, [username, about, bio, githubLink, linkedInLink, jobDescription])

	//upload form 
	const handleUpdateProfile = (e) => {
		e.preventDefault();
		let data = {username:name, jobDescription:title, bio:myBio, about:aboutMe, githubLink:myGithubLink, linkedInLink:myLinkedInLink}
		axiosInstance.post(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/profile/details", data)
		.then(resp => {
			showSuccessToast(resp.data.message);
			dispatch(changeUserDetails(data))
		})
		.catch(error => showErrorToast(error.message))
	}

	//update profile picture
	const updateProfilePicture = async() => {
		setIsImageUploading(true);
		const base64Image = await fileToBase64(profileImage);
		axiosInstance.post(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/profile/picture/profile", {base64Image})
		.then(resp => {
			setIsImageUploading(false);
			showSuccessToast(resp.data.message);
			//set image to rtk
			dispatch(updateProfilePic(resp.data.data.profilePic));
		})
		.catch(error => {
			setIsImageUploading(false);
			showErrorToast(error.message)
		})
	}

	//update cover picture
	const updateCoverPicture = async() => {
		setIsImageUploading(true);
		const base64Image = await fileToBase64(coverImage);
		axiosInstance.post(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/profile/picture/cover", {base64Image})
		.then(resp => {
			setIsImageUploading(false);
			showSuccessToast(resp.data.message);
			//set image to rtk
			dispatch(updateCoverPic(resp.data.data.coverPic));
		})
		.catch(error => {
			setIsImageUploading(false);
			showErrorToast(error.message)
		})
	}

	//delete profile/cover pic
	const deletePicture = (imgType) => {
		console.log(imgType);
		//delete picture from cloudinary and set to null;
		axiosInstance.delete(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/profile/picture/"+ imgType)
		.then(resp => {
			showSuccessToast(resp.data.message);
			if(imgType ==="cover") dispatch(updateCoverPic(null));
			if(imgType ==="profile") dispatch(updateProfilePic(null));
		})
		.catch(error => showErrorToast(error.message));
	}

	//toggle qr modal
	const [qrModalOpen, setQrModalOpen] = useState(false);
	const toggleQrModal = () => setQrModalOpen(!qrModalOpen);

  return (
		<>
			<div class="w-full bg-gray-50 dark:bg-gray-800 overflow-hidden">
				<div class="relative">
					{
						editAccess && (
							<div class="absolute bottom-0 right-0">
								<button data-modal-target="coverPic-modal" data-modal-toggle="coverPic-modal"  class="bg-green-400 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded-full">
								<i class="fas fa-camera"></i>
								</button>
							</div>
						)
					}
					<img
						class="w-full h-48 md:h-64 object-cover"
						src={coverPic ?? DEFAULT_COVER_IMG}
						alt="Cover Picture"
					/>
					<div class="absolute top-full left-1/4 transform -translate-x-1/2 -translate-y-1/2">
						<img
						class="h-36 w-36 lg:h-64 lg:w-64 lg:rounded-full border-4 border-white object-cover"
						src={profilePic ?? DEFAULT_USER_IMG }
						alt="Profile Picture"
						/>
						{
							editAccess && (
								<div class="absolute bottom-0 right-0 md:right-10">
									<button data-modal-target="profilePic-modal" data-modal-toggle="profilePic-modal" class="bg-green-400 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded-full">
										<i class="fas fa-camera"></i>
									</button>
								</div>
							)
						}
					</div>
				</div>

				<div class="md:flex mt-32">
					<div class="p-8 w-full">
						<div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
							{jobDescription ||"No job description added"}
						</div>
						<div class="block mt-1 text-xl leading-tight font-medium text-black dark:text-gray-200">
							{username}
						</div>
						{/* add company name here */}
						<p class="mt-2 text-gray-600 dark:text-slate-300">
							{bio ?? "No bio added..."}
						</p>
						<p class="mt-2 flex items-center text-gray-600 dark:text-slate-300">
							IN &nbsp;&nbsp;&nbsp;
							<div className="flex gap-4 text-blue-400 cursor-pointer text-2xl">
								<a href={linkedInLink} target='_blank'>
									<FaLinkedin />
								</a>
								<a href={linkedInLink} target='_blank'>
									<FaGithub />
								</a>
							</div>
						</p>
						<div class="mt-4 flex items-center">
							<FaUserFriends className="text-xl text-gray-600 dark:text-gray-400" />
							<span class="ml-2 text-gray-700 dark:text-gray-400">
								{followersCount?.length} connections
							</span>
						</div>
						<p class="mt-4 text-gray-600  dark:text-gray-400">
							{about ?? "Bio not added..."}
						</p>
						<div class="mt-4">
							<h4 class="text-sm font-semibold text-gray-900 dark:text-gray-300">
								Top skills:
							</h4>
							{
								(skills?.length > 0) ? (
									<ul class="list-disc list-inside text-gray-700  dark:text-gray-400">
										{
											skills?.map(skill => <li>{skill?.skill}</li> )
										}
											
									</ul>
								): "No skills added"
							}
						</div>
						<div class="mt-4 flex space-x-3">
							{
								editAccess && (
									<button
										data-modal-target="profile-modal"
										data-modal-toggle="profile-modal"
										class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
									>
										Edit
									</button>
								)
							}
							<button onClick={toggleQrModal} class="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
								Share profile
							</button>
							{/* <button class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-300">
								<RiUserFollowFill className="text-lg" />
							</button> */}
							
						</div>
						{
							qrModalOpen && <ProfileQR userID={userID} toggleQrModal={toggleQrModal} />
						}
					</div>
				</div>
			</div>

			{/* modal starts here */}
			<div
				id="profile-modal"
				tabindex="-1"
				aria-hidden="true"
				class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
			>
				<div class="relative p-4 w-full max-w-2xl max-h-full">
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								Update profile
							</h3>
							<button
								type="button"
								class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="profile-modal"
							>
								<svg
									class="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						<div class="p-4 md:p-5">
							<div class="grid gap-4 mb-4 grid-cols-2">
								<div class="col-span-2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Name
									</label>
									<input
										type="text"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										value={name}
										onChange={e => setName(e.target.value)}
									/>
								</div>
								<div class="col-span-2 sm:col-span-1">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Title
									</label>
									<input
										type="text"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										value={title}
										onChange={e => setTitle(e.target.value)}
									/>
								</div>
								<div class="col-span-2 sm:col-span-1">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Job with position
									</label>
									<input
										type="text"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										value={myBio}
										onChange={e => setMyBio(e.target.value)}
									/>
								</div>
								<div class="col-span-2 sm:col-span-1">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										github link
									</label>
									<input
										type="text"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										value={myGithubLink}
										onChange={e => setMyGithubLink(e.target.value)}
									/>
								</div>
								<div class="col-span-2 sm:col-span-1">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										LinkedIn Profile
									</label>
									<input
										type="text"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										value={myLinkedInLink}
										onChange={e => setMyLInkedInLink(e.target.value)}
									/>
								</div>
								<div class="col-span-2">
									<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										About
									</label>
									<textarea
										id="description"
										rows="4"
										class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										value={aboutMe}
										onChange={e => setAboutMe(e.target.value)}
									></textarea>
								</div>
							</div>
							<button onClick={handleUpdateProfile}
								class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Update profile
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* update profile pic modal  */}
			<div id="profilePic-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
				<div class="relative p-4 w-full max-w-md max-h-full">
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
								Change Profile Picture
							</h3>
							<button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="profilePic-modal">
								<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						<div class="p-4 md:p-5 text-center">
							<img src={profileImageLink} alt="select profile img" className='w-48 h-48 rounded-full object-contain' />
							<input onChange={handleProfileChange} class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" accept="image/jpeg, image/png"></input>
							{/* image upload button */}
							{
								isImageUploading ? (
									<button class="py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
										<i class="fa-solid fa-spinner fa-spin-pulse"></i>
									</button>
								):(
									<button onClick={updateProfilePicture} class="py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
										Change Profile picture
									</button>
								)
							}
						</div>
						<hr />
						<button onClick={() => deletePicture("profile")} class="text-center py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
							Delete
						</button>
					</div>

				</div>
			</div> 

			{/* update cover pic modal updateCoverPicture  */}
			<div id="coverPic-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
				<div class="relative p-4 w-full max-w-md max-h-full">
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
								Change Cover Picture
							</h3>
							<button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="coverPic-modal">
								<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						<div class="p-4 md:p-5 text-center">
							<img src={coverImageLink} alt="select profile img" className='w-full h-24 object-contain' />
							<input onChange={handleCoverChange} class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" accept="image/jpeg, image/png"></input>
							{/* image upload button */}
							{
								isImageUploading ? (
									<button class="py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
										<i class="fa-solid fa-spinner fa-spin-pulse"></i>
									</button>
								):(
									<button onClick={updateCoverPicture} class="py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
										Change Cover picture
									</button>
								)
							}
						</div>
						<hr />
						<button onClick={() => deletePicture("cover")} class="text-center py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
							Delete
						</button>
					</div>
				</div>
			</div> 
		</>
  );
}

export default ProfileDetailsCard