import React, { useState } from 'react'
import { MdCurrencyExchange, MdLeaderboard } from "react-icons/md";
import { BsGiftFill } from "react-icons/bs";
import { CgToolbox } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { RiSettings5Fill } from 'react-icons/ri'
import { MoveToTop } from '../utils/pageUtils';
import { IoNotificationsSharp } from 'react-icons/io5';
import { CiMenuKebab } from 'react-icons/ci';

const mainIcons = [
    {
        name: 'crypto exchange',
        symbol: MdCurrencyExchange,
        url: '/admin/exchange'
    },
    {
        name: 'gift cards',
        symbol: BsGiftFill,
        url: '/admin/giftcards'
    },
    {
        name: 'profit tools',
        symbol: CgToolbox,
        url: '/admin/profit_tools'
    },
    {
        name: 'settings',
        symbol: RiSettings5Fill,
        url: '/admin/settings'
    },
    {
        name: 'profile',
        symbol: FaUser,
        url: '/admin/profile'
    },
]

const extraIcons = [
    {
        name: 'notifications',
        symbol: IoNotificationsSharp,
        url: '/admin/notifications',
    },
    {
        name: 'leaderboard',
        symbol: MdLeaderboard,
        url: '/admin/leaderboard',
    },
]

const extraArray = [
    '/admin/notifications', '/admin/leaderboard'
]


const AdminFooter = () => {
    const [view, setView] = useState(false)
    const location = useLocation()
    const pathName = location.pathname
    const active = 'text-lightgreen'
    const nonactive = 'text-white/60 hover:text-lightgreen'


    return (
        <div className='w-full fixed bottom-0 z-50'>
            <div className='w-11/12 mx-auto relative'>
                <div className="px-5 flex relative items-center bg-[#212134] border border-secondary rounded-full justify-around gap-2">
                    {mainIcons.map((item, i) => {
                        return (
                            <div key={i} className="flex items-center py-4 relative" >
                                {pathName === item.url &&
                                    <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full "></div>
                                }
                                <Link to={item.url} onClick={MoveToTop}
                                    className={` group-hover:text-lightgreen px-2  ${pathName === item.url ? active : nonactive} cursor-pointer flex flex-col gap-1 items-center`}>
                                    <div className="text-[1.5rem]">{<item.symbol />}</div>
                                </Link>
                            </div>
                        )
                    })}
                    <div className='flex items-center py-4 relative'>
                        {extraArray.includes(pathName) &&
                            <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full "></div>
                        }
                        <div className={`group-hover:text-lightgreen px-2 cursor-pointer text-[1.5rem] ${extraArray.includes(pathName) ? active : nonactive}`} onClick={() => setView(!view)}>
                            <CiMenuKebab />
                        </div>
                    </div>
                </div>
                {view &&
                    <div className='absolute -top-12 right-0 bg-secondary px-4 flex items-center justify-around gap-2 rounded-full'>
                        {extraIcons.map((item, i) => (
                            <div key={i} className='flex items-center py-4 relative'>
                                {pathName === item.url &&
                                    <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full"></div>
                                }
                                <Link to={item.url} onClick={MoveToTop}
                                    className={` group-hover:text-lightgreen px-2  ${pathName === item.url ? active : nonactive} cursor-pointer flex flex-col gap-1 items-center`}>
                                    <div className="text-[1.5rem]">{<item.symbol />}</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default AdminFooter