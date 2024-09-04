import React from 'react'

function SingleRevenueColumn({ details }) {
  return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {details?.title}
            </th>
            <td class="px-6 py-4">
                {details?.category}
            </td>
            <td class="px-6 py-4">
                {details?.participants?.length}
            </td>
            <td class="px-6 py-4">
                ${details?.amount}
            </td>
            <td class="px-6 py-4">
                {
                    details?.status==="pending" ? "NA": ";dkfjas;kldfj"
                }
            </td>
            {
                details?.status==="pending" ? (
                    <div className="bg-gray-200 dark:bg-gray-400 py-1 rounded-full text-center text-black font-semibold">
                        Pending
                    </div>

                ):(
                    <div className="bg-green-400 py-1 rounded-full text-center text-white font-bold">
                        Transfered
                    </div>
                )
            }
            <td class="px-6 py-4">
                {/* <div className="bg-red-400 py-1 rounded-full text-center text-white font-bold">
                    Cancelled
                </div> */}

            </td>
        </tr>
  )
}

export default SingleRevenueColumn