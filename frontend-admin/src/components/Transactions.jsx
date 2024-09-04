import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import useAxios from '../hooks/useAxios';
import ENDPOINTS from '../configs/endpoints';
import SingleTransactionCell from './SingleTransactionCell';

function Transactions() {

    // document.addEventListener("DOMContentLoaded", function(event) {
    //     document.getElementById('readProductButton').click();
    // });

    const axiosInstance = useAxios();
    const [ option, setOption ] = useState("all");
    
    const [transactions, setTransactions] = useState([]);
    console.log(transactions, "::: transactions");
    console.log("option :" + option);

    useEffect(() => {
        axiosInstance.get(ENDPOINTS.TRANSACTIONS + option)
        .then(resp => setTransactions(resp.data.data?.transactions))
        .catch(err => console.log(err))
    },[option])

    //download transactions as pdf
    const generateAndDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.setTextColor(0, 128, 0);
        autoTable(doc, {
            theme: 'grid',
            head: [['title', 'Type', 'Amount($)', 'beneficiary', 'participants', 'status']],
            body: transactions?.map(t => [t?.title, t?.category, t?.participants?.length * t?.amount, t?.mentorID, t?.participants?.length, t?.status ]),
        });
        doc.save('transactions.pdf');
    };


  return (
    <section class="bg-white px-4 py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div class="mx-auto max-w-full">
            <div class="gap-4 lg:flex lg:items-center lg:justify-between">
                {/* <form class="flex items-center">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                    </div>
                </form> */}

                {
                    (transactions?.length !== 0) ? (
                        <div onClick={generateAndDownloadPDF} className="px-6 py-2 text-center bg-slate-100 rounded-xl cursor-pointer">
                            Download PDF
                        </div>
                    ): (<div></div>)
                }

                <div class="mt-6 gap-4 space-y-4 sm:flex sm:items-center sm:space-y-0 lg:mt-0 lg:justify-end">
                    {/* <span class="inline-block text-gray-500 dark:text-gray-400"> status </span>
                    <div>
                        <select id="order-type" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:w-[144px]">
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div> */}

                    <span class="inline-block text-gray-500 dark:text-gray-400"> from </span>

                    <div>
                        <label for="date" class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select date</label>
                        <select onChange={(e) => setOption(e.target.value)} id="date" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:w-[144px]">
                            <option value="all">All</option>
                            <option value="today">Today</option>
                            <option value="week">this week</option>
                            <option value="month">this month</option>
                            <option value="year">this year</option>
                        </select>
                    </div>

                {/* <button type="button" class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300   dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto">Add return request</button> */}
                </div>
            </div>


                       <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-3">Title</th>
                            <th scope="col" class="px-4 py-3">Type</th>
                            <th scope="col" class="px-4 py-3">Amount</th>
                            <th scope="col" class="px-4 py-3">Beneficiary</th>
                            <th scope="col" class="px-4 py-3">Participants</th>
                            {/* <th scope="col" class="px-4 py-3">type</th> */}
                            <th scope="col" class="px-4 py-3">Status</th>
                            <th scope="col" class="px-4 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions?.map( t => <SingleTransactionCell details={t} />)
                        }
                    </tbody>
                </table>
                {
                    (transactions?.length === 0) && <h1 className="text-center text-gray-400 text-4xl">No transactions available</h1>
                }
            </div>

            {/* <nav class="mt-2 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
                <ul class="flex h-8 items-center -space-x-px text-sm">
                <li>
                    <a href="#" class="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                    </svg>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                    <a href="#" class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page" class="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                    <a href="#" class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                </li>
                <li>
                    <a href="#" class="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                </li>
                <li>
                    <a href="#" class="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                    </svg>
                    </a>
                </li>
                </ul>
            </nav> */}
            </div>
        </div>     
    </section>
  )
}

export default Transactions