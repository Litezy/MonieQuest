import React, { useState } from 'react'
import { SlSocialDropbox } from 'react-icons/sl'
import { HiCheckCircle } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { MdError } from 'react-icons/md';
import moment from 'moment';
import AdminPageLayout from '../../AdminComponents/AdminPageLayout';
import { Link } from 'react-router-dom';

const AdminNotification = () => {
    const [notifications, setNotifications] = useState([
        {
            title: 'new order made',
            content: 'Lorem, ipsum dolor  sit amet consectetur adipisicing elit. Ratione soluta porro cumque dolore incidunt optio molestiae adipisci debitis similique odit. Ratione soluta porro cumque dolore incidunt optio molestiae adipisci debitis similique odit.',
            read: 'true',
            url: '/user/profit_tools/create',
        },
        {
            title: 'transaction failed',
            content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione soluta porro cumque dolore incidunt optio molestiae adipisci debitis similique odit. Ratione soluta porro cumque dolore incidunt opton.',
            read: 'false',
            url: '/user/exchange',
            status: 'failed'
        },
        {
            title: 'crypto buy completed',
            content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione soluta porro cumque dolore incidunt optio molestiae adipisci debitis similique odit. Ratione soluta porro cumque dolore incidunt opton.',
            read: 'false',
            url: '/user/transactions_history',
        }
    ])
    const [dataLoading, setDataLoading] = useState(true)

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)


    return (
        <AdminPageLayout>
            <div className="w-11/12 mx-auto">
                <div className='flex justify-between gap-4 items-center'>
                    <div className='text-3xl font-bold'>Notifications</div>
                    <div className='text-sm capitalize cursor-pointer hover:text-lightgreen'>mark all as read</div>
                </div>
                <div className='mt-8 '>
                    {dataLoading ?
                        <div className='w-full  md:h-32 h-40 rounded-md bg-slate-500 animate-pulse'>
                        </div>
                        :
                        <>
                            {notifications.length > 0 ?
                                <div className='flex flex-col gap-4'>
                                    {notifications.map((item, i) => (
                                        <div key={i} className={`p-3 ${item.read === 'true' ? 'bg-primary' : 'bg-[#212144]'} relative w-full h-fit text-sm cursor-pointer rounded-md overflow-hidden shadow_auth`} >
                                            <Link to={item.url} className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-3'>
                                                    <div className='flex gap-1 items-center border-b border-[grey] w-fit'>
                                                        <div className='capitalize text-base font-extrabold'>{item.title}</div>
                                                        {item.status !== 'failed' ?
                                                            <HiCheckCircle className='text-lightgreen' />
                                                            :
                                                            <MdError className='text-red-600' />}
                                                    </div>
                                                    <div className='font-medium'>{item.content}</div>
                                                </div>
                                                <div className=' text-xs text-gray-300 font-bold mt-2 ml-auto'>{moment(item.createdAt).fromNow()}</div>
                                            </Link>
                                            <FaXmark className='text-gray-300 hover:text-lightgreen text-xl p-1 cursor-pointer bg-secondary absolute top-1 right-1 rounded-full' />
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className='pt-24 md:pt-10 pb-4 flex flex-col gap-2 items-center justify-center'>
                                    <SlSocialDropbox className='md:text-4xl text-6xl' />
                                    <div>no notification found...</div>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </AdminPageLayout>
    )
}

export default AdminNotification