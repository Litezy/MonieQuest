import React, { useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'
import { Link } from 'react-router-dom'

const AdminSingleAirdrop = () => {
    const [dataLoading, setDataLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
                {loading &&
                    <ModalLayout clas={`w-11/12 mx-auto`}>
                        <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                            <Loader />
                            <div>...submitting</div>
                        </div>
                    </ModalLayout>
                }
                <Link to='/admin/airdrops/all' className="w-fit rounded-md px-5 py-2 bg-ash text-white cursor-pointer">
                    back to all airdrops
                </Link>
            </div>
        </AdminPageLayout>
    )
}

export default AdminSingleAirdrop