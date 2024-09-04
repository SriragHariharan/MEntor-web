import React, { useEffect, useState } from 'react'
import useGetMeetings from '../hooks/useGetMeetings';
import InterviewsTable from '../components/interviews/InterviewsTable';
import MentorInterviewsTable from '../components/interviews/MentorInterviewsTable';


function InterviewsPage() {
	const {meetings, error, role} = useGetMeetings();
	const [sortedMeetings, setSortedMeetings] = useState(meetings);

	useEffect(() =>{
		setSortedMeetings(meetings)
	},[meetings])

	//sorting code
	const sortMeetings = (option) => {
		if(option === "completed"){
			let sortedResult = meetings.filter(meetings => meetings?.status === "completed")
			setSortedMeetings(sortedResult);
		}else if(option ==="not completed"){
			let sortedResult = meetings.filter(meetings => meetings?.status === "not completed")
			setSortedMeetings(sortedResult);
		}else{
			setSortedMeetings(meetings);
		}
	}

  return (
		<div className="py-10 dark:bg-gray-800 h-screen px-4 lg:px-12">
			{/* interviews header */}
			<div className="">
				<div className="text-3xl font-semibold dark:text-gray-500">
					Meetings:
				</div>
				<div className="text-sm font-semibold text-gray-300 dark:text-gray-600 hidden lg:block">
					Here you will get the details of all the meetings you
					scheduled
				</div>
			</div>

			{/* table */}
			<div class="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
				<div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
					<div>
						<button
							id="dropdownRadioButton"
							data-dropdown-toggle="dropdownRadio"
							class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
							type="button"
						>
							Choose one
							<svg
								class="w-2.5 h-2.5 ms-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>
						{/* <!-- Dropdown menu --> */}
						<div
							id="dropdownRadio"
							class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute inset-0 translate-x-[522.5px] translate-y-[3847.5px]"
							data-popper-placement="top"
						>
							<ul
								class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
								aria-labelledby="dropdownRadioButton"
							>
								<li>
									<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
										<input
											onClick={() => sortMeetings("all")}
											id="filter-radio-example-1"
											type="radio"
											value=""
											name="filter-radio"
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
											All
										</label>
									</div>
								</li>
								<li>
									<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
										<input
											onClick={() => sortMeetings("not completed")}
											id="filter-radio-example-2"
											type="radio"
											value=""
											name="filter-radio"
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
											Not completed
										</label>
									</div>
								</li>
								<li>
									<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
										<input
											onClick={() => sortMeetings("completed")}
											id="filter-radio-example-3"
											type="radio"
											value=""
											name="filter-radio"
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
											Completed
										</label>
									</div>
								</li>
							</ul>
						</div>
					</div>
					{/* <label for="table-search" class="sr-only">
						Search
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
							<svg
								class="w-5 h-5 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clip-rule="evenodd"
								></path>
							</svg>
						</div>
						<input
							type="text"
							id="table-search"
							class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search for items"
						/>
					</div> */}
				</div>


				<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" class="px-6 py-3">
								Date
							</th>
							<th scope="col" class="px-6 py-3">
								Time
							</th>
							<th scope="col" class="px-6 py-3">
								Participant
							</th>
							<th scope="col" class="px-6 py-3">
								Price( $ )
							</th>
							<th scope="col" class="px-6 py-3">
								Status
							</th>
							<th scope="col" class="px-6 py-3">
								Report
							</th>
							<th scope="col" class="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{
							(role== "mentee" && meetings?.length > 0) && sortedMeetings?.map(int => <InterviewsTable interview={int} /> )
						}
						{
							(role== "mentor" && meetings?.length > 0) && sortedMeetings?.map(int => <MentorInterviewsTable interview={int} /> )
						}
						{
							meetings?.length === 0 && <h1 className="text-center text-gray-400">No interviews scheduled yet</h1>
						}
					</tbody>
				</table>
			</div>
		</div>
  );
}

export default InterviewsPage