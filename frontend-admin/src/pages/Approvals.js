import React from 'react'
import ApprovalsTable from '../components/ApprovalsTable'
import useGetApprovals from '../hooks/useGetApprovals'

function Approvals() {
    const {mentors, error} = useGetApprovals();
  return (
            <div>
                <div className="text-gray-500 mt-4 text-4xl">Approvals</div>
                <div className="text-gray-500 mb-4 text-sm">All mentors need to be approved to continue in our website</div>
                <div className="px-6">
                    <ApprovalsTable mentors = {mentors} />
                </div>
            </div>
  )
}

export default Approvals