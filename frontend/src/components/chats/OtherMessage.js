import React from 'react'
import moment from 'moment'

function OtherMessage({ msgObj }) {
  return (
        <div class="flex mb-2">
            <div class="rounded py-2 px-3 bg-slate-100">
                <p class="text-sm mt-1">
                    {msgObj?.message}
                </p>
                <div class="flex justify-end text-xs text-grey-dark mt-1">
                    <small>{moment(msgObj?.createdAt).format('MMMM Do, YYYY ◾ h:mm A')}</small>
                </div>
            </div>
        </div>
  )
}

export default OtherMessage