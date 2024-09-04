import React from 'react'
import MentorsTable from '../components/MentorsTable'
import useGetMentees from '../hooks/useGetMentees'

function Mentees() {
  const {mentees, error} = useGetMentees();
  return (
          <div>
              <div className="text-gray-500 mt-4 text-4xl">Mentees</div>
              <div className="text-gray-500 mb-4 text-sm">All mentees are listed below</div>
              <MentorsTable users={mentees} type={"mentee"} />
          </div>
  )
}

export default Mentees