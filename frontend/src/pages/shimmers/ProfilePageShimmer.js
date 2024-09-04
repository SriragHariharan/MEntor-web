import React from 'react'

function ProfilePageShimmer() {
  return (
    <div class="p-4 w-3/4 mx-auto">
        <div class="flex items-center space-x-4">
            <div class="w-full h-56 bg-gray-200"></div>
        </div>
        <div class="mt-4">
            <div class="my-2 h-6 bg-gray-200 rounded"></div>
            <div class="my-2 h-6 bg-gray-200 rounded"></div>
            <div class="my-2 h-6 bg-gray-200 rounded"></div>
        </div>
        <div class="mt-8 space-y-4">
            <div class="h-24 bg-gray-200 rounded"></div>
            <div class="h-24 bg-gray-200 rounded"></div>
            <div class="h-24 bg-gray-200 rounded"></div>
        </div>
    </div>
  )
}

export default ProfilePageShimmer