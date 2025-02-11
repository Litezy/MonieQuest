import moment from 'moment'
import React, { useState } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { currencies } from '../../AuthComponents/AuthUtils'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { USERDETAILS } from '../../services/store'

const UserDetails = () => {

    const [data] = useAtom(USERDETAILS)

    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto '>
                <div className="w-full flex items-center text-white justify-between">
                    <Link to={`/admin/all_users`} className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                        <IoReturnUpBackOutline className='text-2xl' />
                    </Link>
                    <div className="text-lg font-semibold">User Details</div>
                </div>
                <div className="my-5 text-xl font-bold text-center">Below are Users Details on MonieQuest</div>

                <div className="relative overflow-x-auto rounded-md mt-10">
                    <table className="w-full text-sm text-center">
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
                                    Role
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    KYC Verified
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
                            {Array.isArray(data) ? data.map((item, i) => (
                                <tr className=" border-b " key={i}>
                                    <th scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                        {item.id}
                                    </th>
                                    <td className="px-3 truncate capitalize text-lightgreen py-3">
                                        {item?.first_name} {item?.surname}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.email}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.role}
                                    </td>
                                    <td className="px-3 py-3 truncate">
                                        {item?.kyc_verified === 'false' ? 'Not Submitted' : item?.kyc_verified === 'processing' ? 'Submitted' : 'Verified'}
                                    </td>

                                    <td className="px-3 py-3">
                                        {currencies[1].symbol}{item?.user_wallets?.balance.toLocaleString()}
                                    </td>
                                    <td className="px-3 py-3 truncate">
                                        {moment(item.createdAt).format(`DD-MM-YYYY hh:mm a`)}
                                    </td>
                                </tr>
                            )) :
                                <tr className=" w-full truncate text-lg font-semibold">
                                    <td colSpan="4" className='text-center py-2'>No Users found</td>
                                </tr>
                            }

                        </tbody>
                    </table>


                </div>
            </div>
        </AdminPageLayout>
    )
}

export default UserDetails