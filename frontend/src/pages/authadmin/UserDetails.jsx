import moment from 'moment'
import React, { useState } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { currencies } from '../../AuthComponents/AuthUtils'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { USERDETAILS } from '../../services/store'
import ModalLayout from '../../utils/ModalLayout'
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import { Apis, AuthPostApi } from '../../services/API'
import Loader from '../../GeneralComponents/Loader'

const UserDetails = () => {
    const [data, setData] = useAtom(USERDETAILS)
    const [loading, setLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [modal, setModal] = useState(false)

    const makeAdmin = async () => {
        if (!selectedUser?.id) return ErrorAlert(`User ID missing`);
        const data = { id: selectedUser?.id }
        setModal(false)
        setLoading(true)
        try {
            const response = await AuthPostApi(Apis.admin.make_admin, data)
            if (response.status !== 200) return ErrorAlert(response.msg)
            setData(response.data)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            SuccessAlert(response.msg)
        } catch (error) {
            ErrorAlert(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <AdminPageLayout>

            {modal &&
                <ModalLayout setModal={setModal} clas={`lg:w-[50%] w-10/12 mx-auto`}>
                    <div className="p-5  bg-white text-dark shadow-xl rounded-md">
                        <div className="text-base text-center mb-3">Are you sure you want to make {selectedUser?.first_name} {selectedUser?.surname} admin?</div>

                        <div className="flex items-center justify-between">
                            <button onClick={() => setModal(false)} className='px-4 py-2 bg-red-500 text-white rounded-md'>Cancel</button>
                            <button onClick={makeAdmin} className='px-4 py-2 bg-green-500 text-white rounded-md'>Confirm</button>
                        </div>

                    </div>
                </ModalLayout>
            }
            {
                loading && <Loader title={`performing operation`} />
            }
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
                        <thead className=" bg-primary text-sm poppins">
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
                                <th scope="col" className="px-3 py-3 truncate">
                                    Make Admin
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
                                    <td className="px-3 py-3 truncate">
                                        <button onClick={() => setModal(true)} onMouseOver={() => setSelectedUser(item)} className='text-center w-full bg-ash text-white rounded-md py-1.5'>Proceed</button>
                                    </td>
                                </tr>
                            )) :
                                <tr className=" w-full truncate text-lg font-semibold">
                                    <td colSpan="7" className='text-center py-2'>No Users found</td>
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