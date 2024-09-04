import React from 'react'
import useOtherProfile from '../hooks/useOtherProfile';
import ProfileDetailsCard from '../components/profile page/ProfileDetailsCard';
import EducationCard from '../components/profile page/EducationCard';
import ExperienceCard from '../components/profile page/ExperienceCard';
import SkillsCard from '../components/profile page/SkillsCard';
import SlotsPage from '../components/profile page/SlotsPage';

function OtherProfile() {

    //{profileDetails,followersCount,profilePic, coverPic, editAccess}
    const {profileDetails, error} = useOtherProfile();
    console.log("profileDetails :::::", profileDetails);
    if(profileDetails === null) return <h1>User not found : (</h1>
    if(error) return <h1>{error}</h1>

  return (
    <div className='md:w-2/3 mx-auto'>
        <ProfileDetailsCard 
            profileDetails={profileDetails}
            followersCount={profileDetails?.followers?.length} 
            profilePic={profileDetails?.profilePic?.secure_url}
            coverPic={profileDetails?.coverPic?.secure_url}
            editAccess={false} 
        />
        <div className="grid grid-cols-1 px-4 dark:bg-gray-800 gap-4 py-8">
            <EducationCard education={profileDetails?.education} editAccess={false} />
            <ExperienceCard experience={profileDetails?.experience} editAccess={false} />
            <SkillsCard skills={profileDetails?.skills} editAccess={false} />
            <SlotsPage profileDetails={profileDetails} />
        </div>
    </div>
  )
}

export default OtherProfile