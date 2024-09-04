import React, { useState } from 'react'
import SingleRevenueColumn from './SingleRevenueColumn'

function RevenueTable({ transactions, filteredTransaction, setFilteredTransaction }) {

    const[searchQuery, setSearchQuery] = useState([]);

    const handleSortTransaction = (selection) => {
        console.log("Am clicked...")
        if(selection === "pending"){
            let filtered = transactions.filter(t => t.status === "pending");
            console.log(filtered)
            setFilteredTransaction(filtered);
        }else if(selection === "transfered"){
            let filtered = transactions.filter(t => t.status === "transfered");
            console.log(filtered)
            setFilteredTransaction(filtered);
        }
    };

    const handleSearchTransaction = () => {
        let searchResults = transactions.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredTransaction(searchResults);
    }

    return (
        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div>
                        <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <svg class="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                                </svg>
                            Select an option
                            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div id="dropdownRadio" class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{position: "absolute", inset: "auto auto 0px 0px", margin: "0px", transform: "translate3d(522.5px, 3847.5px, 0px)"}}>
                            <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                <li onClick={() => handleSortTransaction("pending")}>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="filter-radio-example-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Pending</label>
                                    </div>
                                </li>
                                <li onClick={() => handleSortTransaction("transfered")}>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="filter-radio-example-5" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Transfered</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* search bar */}
                    <div class="relative">
                        <div onClick={handleSearchTransaction} class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 cursor-pointer">
                            <i className="fa-magnifying-glass fa-solid text-gray-500 text-sm"></i>
                        </div>
                        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search on transaction IDs" />
                    </div>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Transaction number
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Participant(s)
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date & Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Transfer Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (filteredTransaction?.length === 0) && <h1 className="text-center text-6xl flex justify-center text-gray-400 py-6">Nothing to show</h1>
                        }
                        {
                            filteredTransaction?.map( t => <SingleRevenueColumn details={t} /> )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RevenueTable