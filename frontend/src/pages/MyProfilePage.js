import React, { useEffect, useState } from 'react'
import ProfileDetailsCard from '../components/profile page/ProfileDetailsCard'
import EducationCard from '../components/profile page/EducationCard'
import ExperienceCard from '../components/profile page/ExperienceCard'
import SkillsCard from '../components/profile page/SkillsCard'
import SlotsPage from '../components/profile page/SlotsPage'
import { axiosInstance } from '../helpers/axios'
import { useDispatch, useSelector } from 'react-redux'
import { 
    changeUserDetails,
    addEducationAction,
    addSkillsAction,
    updateProfilePic,
    updateCoverPic,
    setFollowers,
    addExperienceAction,
} from '../redux toolkit/profileSlice'
import { showErrorToast } from '../helpers/ToastMessageHelpers'
import ProfilePageShimmer from './shimmers/ProfilePageShimmer'

function ProfilePage() {
  const[profileDetails, setProfileDetails] = useState(null);
  const[editAccess,setEditAccess] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  //collect data and store to redux toolkit
  useEffect(() => {
    axiosInstance.post(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/profile")
    .then(resp => {
      setProfileDetails(resp?.data?.profileDetails)
      setEditAccess(resp.data?.editAccess)

      //send to redux tk
      dispatch(changeUserDetails(resp.data?.profileDetails))
      dispatch(addSkillsAction(resp.data?.profileDetails?.skills))
      dispatch(addExperienceAction(resp.data?.profileDetails?.experience))
      dispatch(addEducationAction(resp.data?.profileDetails?.education))
      dispatch(updateProfilePic(resp.data?.profileDetails?.profilePic?.secure_url))
      dispatch(updateCoverPic(resp.data?.profileDetails?.coverPic?.secure_url))
      dispatch(setFollowers(resp.data?.profileDetails?.followers))
    })
    .catch(err => {
      showErrorToast(err.message);
      setError(error)
    })
  }, [])

  //read data from reduxtk and send to components
  const profileDetailsObj = useSelector(store => store.profile?.user);
  const followersCount = useSelector(store => store.profile?.followers);
  const profilePic = useSelector(store => store.profile?.profilePic);
  const coverPic = useSelector(store => store.profile?.coverPic);
  const experience = useSelector(store => store?.profile?.experience);
  const education = useSelector(store => store?.profile?.education)
  const skills = useSelector(store => store?.profile?.skills)


  if(profileDetails === false) return <h1 className="text-6xl text-center text-gray-500">Loading....</h1>
  if(profileDetails === null) return <ProfilePageShimmer />
  return (
        <div className="">
            <ProfileDetailsCard 
              profileDetails={profileDetailsObj} 
              followersCount={followersCount} 
              profilePic={profilePic}
              coverPic={coverPic}
              editAccess={editAccess} 
            />
            <div className="grid grid-cols-1 px-4 dark:bg-gray-800 gap-4 py-8">
                <EducationCard education={education} editAccess={editAccess} />
                <ExperienceCard experience={experience} editAccess={editAccess} />
                <SkillsCard skills={skills} editAccess={editAccess} />
                {/* <SlotsPage /> */}
            </div>
        </div>
  )
}

export default ProfilePage