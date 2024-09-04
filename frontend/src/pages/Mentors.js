import React, { useEffect, useState } from 'react'
import useAllMentors from '../hooks/useAllMentors';
import MentorCard from '../components/mentor/MentorCard';

function Mentors() {
	
	const {mentorsList, error} = useAllMentors();
	const [mentorsResult,  setMentorResult] = useState(mentorsList);
	const[searchQuery, setSearchQuery] = useState("");
	
	useEffect(()=>{
		setMentorResult(mentorsList)
	},[mentorsList])

	//handle search mentor
	const handleSearchMentor = () => {
		let result = mentorsList.filter(mentor => mentor.username.toLowerCase().includes(searchQuery.toLowerCase()));
		console.log(searchQuery, result);
		setMentorResult(result);
	}
	
	//sorting a mentor(redesing from db)
	const sortMentor = (type) => {
		let sortedMentors;
		switch (type) {
			case 'atz':
				sortedMentors = [...mentorsList].sort((a, b) => a.username.localeCompare(b.username));
				break;
			case 'zta':
				sortedMentors = [...mentorsList].sort((a, b) => b.username.localeCompare(a.username));
				break;
			case 'default':
				sortedMentors = mentorsList;
				break;
			default:
				sortedMentors = mentorsList;
		}
  		setMentorResult(sortedMentors);
};

  return (
		<div className="dark:bg-gray-800 pt-4">

            {/* search section */}
			<div className="grid grid-cols-2 lg:flex lg:justify-between">
				<div className="flex ps-4 gap-4">
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">All</span>
                </label>

					{/* mentor sort form */}
					<div class="max-w-sm mx-auto">
						<select
							id="mentor-sort"
							onChange={(e) => sortMentor(e.target.value)}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option selected>Sort mentors</option>
							<option value="default">Default</option>
							<option value="top_rated">Top rated</option>
							{/* <option value="newest">Newest</option>
							<option value="oldest">Oldest</option> */}
							<option value="atz">Name: A to Z</option>
							<option value="zta">Name: Z- A</option>
						</select>
					</div>
				</div>

				<div className="flex">
					{/* mentor search form */}
					<div class="items-center max-w-md mx-auto flex">
						<div class="relative w-full">
							<input
								type="text"
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="type mentors name..."
							/>
						</div>
						<button
							onClick={handleSearchMentor}
							class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							<svg
								class="w-4 h-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
							<span class="sr-only">Search</span>
						</button>
					</div>
				</div>
			</div>

            {/* cards section */}
			<div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-5 lg:px-4 ">
				{
					mentorsResult?.map(mentorDet => <MentorCard key={mentorDet?._id} details={mentorDet} /> )
				}
				
			</div>
            
		</div>
  );
}

export default Mentors