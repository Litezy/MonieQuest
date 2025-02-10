import React, { useEffect, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import AdminSummary from '../../AdminComponents/AdminSummary'
import UserDetails from './UserDetails'
import UserBanks from './UserBanks'
import UserKycApplications from './UserKycApplications'
import VerifiedUsers from './VerifiedUsers'
import CreateUsers from '../../AdminComponents/CreateUsers'
import { Apis, AuthGetApi } from '../../services/API'
import { useAtom } from 'jotai'
import { USERS } from '../../services/store'
import { Link } from 'react-router-dom'

const AdminAllUsers = () => {

    const [active, setActive] = useState(0)
    const [loading, setLoading] = useState(false)
    const [users,] = useAtom(USERS)
    const userHeaders = [
        { title: 'Users Details', id: 1,url:'/admin/all_users/user_details' },
        { title: 'User Banks', id: 2,url:'/admin/all_users/user_banks' },
        { title: 'Users KYC Applications', id: 3,url:'/admin/all_users/submitted_kycs' },
        { title: 'Verified Users', id: 4,url:'/admin/all_users/verified_kycs' },
        { title: 'Create Users', id: 5,url:'/admin/all_users/create_user' },
    ]
    const item = {
        color: 'blue',
        title: 'total users',
        value: users?.value
    }
    // console.log(users)

   

    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
                {loading ?
                    <>
                        {new Array(3).fill(0).map((_, i) => (
                            <div key={i} className='h-32 w-full mb-5 bg-slate-400 animate-pulse rounded-e-xl rounded-tl-lg'>
                                <div className='w-full h-1/2 bg-slate-500 animate-pulse rounded-lg'></div>
                            </div>
                        ))}
                    </> :

                    <div className='w-full mx-auto'>
                        {active === 0 && (
                            <>
                                
                                <div className="w-full text-center text-xl font-bold">Manage Users on MonieQuest</div>
                                <div className="my-10  mx-auto flex flex-col items-start gap-5">
                                    {userHeaders.map((item, i) => (
                                        <Link to={item.url} className="h-20 w-full flex items-center p-5 rounded-md justify-between bg-white" key={i}>
                                            <div className="text-base text-dark font-bold">{item.title}</div>
                                            <div onClick={() => { setActive(item.id) }}
                                                className="px-5 py-2 rounded-lg bg-primary w-fit text-white cursor-pointer">
                                                viewmore
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                        
                    </div>
                }
            </div>
        </AdminPageLayout>
    )
}

export default AdminAllUsers