import React, { useEffect, useState } from 'react'
import { BiSolidToTop } from "react-icons/bi";
import AuthPageLayout from '../../AuthComponents/AuthPageLayout';
import { Apis, AuthGetApi } from '../../services/API';
import { currencySign } from '../../utils/pageUtils';
import moment from 'moment'

const Leaderboards = () => {
    const [loading, setLoading] = useState(true)
    const [leaderboard, setLeaderboard] = useState([])

    const fetchLeaderboard = async () => {
        try {
            const res = await AuthGetApi(Apis.user.get_leaderboard)
            if (res.status !== 200) {
                setLoading(true)
            }
            const data = res.data
            setLeaderboard(data)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchLeaderboard()
    }, [loading])

    const [shortName, setShortName] = useState([])
    // const calcName = (val) => {
    //     const array = val
    //     //get each name
    //     const getEachName = array.map((item) =>  item.first_name )
    //     //check lenght 
    //     return console.log(getEachName  )
    //     const nameLength = getEachName
    //     //take out the first 4
    //      console.log(nameLength)
    //     const firstChar = String(nameLength[0]) 
    //     const LastFour = nameLength.slice(-4)
    //     const gapInBtw = nameLength(firstChar,LastFour)
    //     const maskedFirst = `*`.repeat(gapInBtw)
    //     const fullName = `${maskedFirst}${slicedLastName}`
    //     console.log(fullName)
    //     return setShortName(fullName)
    // }

    // useEffect(()=>{
    //     calcName(leaderboard)
    // },[])

    return (
        <AuthPageLayout>
            <div className='w-11/12 mx-auto'>
                <div className="flex justify-center w-full  items-center gap-3 mb-10">
                    <BiSolidToTop className='text-3xl text-lightgreen' />
                    <div className="text-2xl font-bold ">Top Traders on MonieQuest</div>
                </div>

                {loading && new Array(3).fill().map((_, i) => (
                    <div key={i} className="w-full mb-5 h-20 bg-gray-500 rounded-md animate-pulse"></div>

                ))}
                {!loading && <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-11/12 mx-auto text-sm text-center rounded-e-md rounded-s-md truncate rtl:text-right text-gray-400 ">
                        <thead class="text-sm bg-primary lg:text-base">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    User ID
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
                            {leaderboard.length > 0 ? leaderboard.slice(0,20).map((item, i) => {
                                return (
                                    (
                                        <tr key={i} class="bg-dark truncate text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-500">
                                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                                {item.id}
                                            </th>
                                            <td class="px-6 py-4">
                                                {item.first_name.slice(0,1)}*****{item.first_name.slice(-3)}
                                            </td>
                                            <td class="px-6 py-4 text-lightgreen">
                                                {currencySign[0]}{item?.user_wallets?.total_deposit.toLocaleString()}
                                            </td>
                                            <td class="px-6 py-4">
                                                {moment(item.createdAt).format(`DD-MM-YYYY`)}
                                            </td>


                                        </tr>

                                    )
                                )
                            }) :
                                <tr>
                                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                        nil
                                    </th>
                                    <td class="px-6 py-4">
                                        nil
                                    </td>
                                    <td class="px-6 py-4 text-lightgreen">
                                        nil
                                    </td>
                                    <td class="px-6 py-4">
                                        nil
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>}

            </div>
        </AuthPageLayout>
    )
}

export default Leaderboards