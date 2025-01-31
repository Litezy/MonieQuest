import moment from 'moment'
import React, { useState } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { currencies } from '../AuthComponents/AuthUtils'

const UserDetails = ({ setActive }) => {

    const [users, setUsers] = useState(
        [
            {
                firstname: 'Bassy', lastname: 'Monie', id: 1, email: 'bassy@gmail.com', bal: '1000', date: '02 Dec 2024', password: '123'
            },
            {
                fisrtname: 'Bassy', lastname: 'Monie', id: 1, email: 'bassy@gmail.com', bal: '1000', date: '02 Dec 2024', password: '123'
            }
        ]
)

    return (
        <div className='w-full '>
            <div className="w-full flex items-center text-white justify-between">
                <div onClick={() => setActive(0)} className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                    <IoReturnUpBackOutline className='text-2xl' />
                </div>
                <div className="text-lg font-semibold">User Details</div>
            </div>
            <div className="my-5 text-xl font-bold text-center">Below are Users Details on MonieQuest</div>

            <div className="relative overflow-x-auto rounded-md mt-10">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className=" bg-primary text-sm poppins ">
                        <tr>
                            <th scope="col" className="px-3 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-3 py-3">
                                FullName
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Password
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Balance
                            </th>
                            <th scope="col" className="px-3 py-3 truncate">
                                Date Joined
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) ? users.map((item, i) => (
                            <tr className=" border-b " key={i}>
                                <th scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                    {item.id}
                                </th>
                                <td className="px-3 py-3">
                                    {item.firstname} {item.lastname}
                                </td>
                                <td className="px-3 py-3">
                                    {item.email}
                                </td>
                                <td className="px-3 py-3">
                                    {item.password}
                                </td>

                                <td className="px-3 py-3">
                                    {currencies[1].symbol}{item.bal.toLocaleString()}
                                </td>
                                <td className="px-3 py-3">
                                    {moment(!item.createdAt && item.date).format(`DD-MM-YYYY`)}
                                </td>
                            </tr>
                        )) :
                            <div className=" w-full text-lg font-semibold flex items-center justify-center">No Users</div>
                        }

                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default UserDetails