import React from 'react'
import MentorsTable from '../components/MentorsTable'
import useGetMentors from '../hooks/useGetMentors'

function Mentors() {

  const {mentors, error} = useGetMentors();
  return (
          <div>
              <div className="text-gray-500 mt-4 text-4xl">Mentors</div>
              <div className="text-gray-500 mb-4 text-sm">All mentors are listed below</div>
              <MentorsTable users={mentors} type={"mentor"} />
          </div>
  )
}

export default Mentors