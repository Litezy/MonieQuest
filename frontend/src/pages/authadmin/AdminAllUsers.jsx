import React, { useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import AdminSummary from '../../AdminComponents/AdminSummary'
import UserDetails from '../../AdminComponents/UserDetails'
import UserBanks from '../../AdminComponents/UserBanks'
import UserKycApplications from '../../AdminComponents/UserKycApplications'
import VerifiedUsers from '../../AdminComponents/VerifiedUsers'
import CreateUsers from '../../AdminComponents/CreateUsers'

const AdminAllUsers = () => {

    const [active, setActive] = useState(0)
    const userHeaders = [
        { title: 'Users Details', id: 1 },
        { title: 'User Banks', id: 2 },
        { title: 'Users KYC Applications', id: 3 },
        { title: 'Verified Users', id: 4 },
        { title: 'Create Users', id: 5 },
    ]

    
    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
                <div className='w-full mx-auto'>
                    {active === 0 && (
                        <>
                            <div className="lg:w-2/4 w-3/4 mx-auto">
                                <AdminSummary color='bg-blue-600 text-white' title={'Total Users'} data={10} />
                            </div>
                            <div className="font-semibold text-xl">Manage Users on MonieQuest</div>
                            <div className="my-10  mx-auto flex flex-col items-start gap-5">
                                {userHeaders.map((item, i) => (
                                    <div className="h-20 w-full flex items-center p-5 rounded-md justify-between bg-white" key={i}>
                                        <div className="text-base text-dark font-bold">{item.title}</div>
                                        <div onClick={() => {setActive(item.id)}}
                                            className="px-5 py-2 rounded-lg bg-primary w-fit text-white cursor-pointer">
                                            viewmore
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                 {active === 1 && <UserDetails setActive={setActive}/>}
                 {active === 2 && <UserBanks setActive={setActive}/>}
                 {active === 3 && <UserKycApplications setActive={setActive}/>}
                 {active === 4 && <VerifiedUsers setActive={setActive}/>}
                 {active === 5 && <CreateUsers setActive={setActive}/>}
                </div>
            </div>
        </AdminPageLayout>
    )
}

export default AdminAllUsers