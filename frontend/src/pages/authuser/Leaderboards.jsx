import React, { useEffect, useState } from 'react'
import { FaRankingStar } from "react-icons/fa6";
import { BiSolidToTop } from "react-icons/bi";

const Leaderboards = () => {
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
     setTimeout(()=>{setLoading(false)},2000)
    },[])
    
    return (
        <div className='w-11/12 mx-auto'>
            <div className="flex justify-center w-full  items-center gap-3 mb-10">
                <BiSolidToTop className='text-3xl text-lightgreen' />
                <div className="text-2xl font-bold ">Top Traders on MonieQuest</div>
            </div>

         {loading && new Array(3).fill().map((_,i) =>(
           <div key={i} className="w-full mb-5 h-20 bg-gray-500 rounded-md animate-pulse"></div>

         ))} 
            {!loading &&<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-11/12 mx-auto text-sm text-center rounded-e-md rounded-s-md truncate rtl:text-right text-gray-400 ">
                    <thead class="text-sm bg-primary lg:text-base">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                S/N
                            </th>

                            <th scope="col" class="px-6 py-3">
                                <div className="">Name</div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div className="">Amount Traded</div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div className="">Date Joined</div>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {new Array(10).fill().map((item, i) => {
                                return (
                                    (
                                        <tr key={i} class="bg-dark truncate text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-500">
                                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                                {i+1}
                                            </th>
                                            <td class="px-6 py-4">
                                                Basit Money Man
                                            </td>
                                            <td class="px-6 py-4 text-lightgreen">
                                                $52.5
                                            </td>
                                            <td class="px-6 py-4">
                                                22 Jan 2025
                                            </td>


                                        </tr>

                                    )
                                )
                        })}
                    </tbody>
                </table>
            </div>}

        </div>
    )
}

export default Leaderboards