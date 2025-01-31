import React, { useState } from 'react'
import { MdCurrencyExchange, MdLeaderboard, MdDashboard } from "react-icons/md";
import { HiGift } from "react-icons/hi2";
import { CgToolbox } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaBloggerB } from "react-icons/fa";
import { RiUser3Fill } from 'react-icons/ri'
import { BiMoneyWithdraw } from "react-icons/bi";
import { MoveToTop } from '../utils/pageUtils';
import { IoNotificationsSharp } from 'react-icons/io5';
import { CiMenuKebab } from 'react-icons/ci';
import { AiFillDollarCircle } from "react-icons/ai";

const mainIcons = [
    {
        name: 'dashboard',
        symbol: MdDashboard,
        url: '/admin/dashboard'
    },
    {
        name: 'users',
        symbol: FaUsers,
        url: '/admin/all_users'
    },
    {
        name: 'crypto exchange',
        symbol: MdCurrencyExchange,
        url: '/admin/exchange'
    },
    {
        name: 'gift cards',
        symbol: HiGift,
        url: '/admin/giftcards'
    },
    {
        name: 'bank withdrawals',
        symbol: BiMoneyWithdraw,
        url: '/admin/bank_withdrawals'
    },
]

const extraIcons = [
    {
        name: 'profit tools',
        symbol: CgToolbox,
        url: '/admin/profit_tools/orders',
        main: '/profit_tools'
    },
    {
        name: 'airdrops',
        symbol: AiFillDollarCircle,
        url: '/admin/airdrops/create',
        main: '/airdrops'
    },
    {
        name: 'blogs',
        symbol: FaBloggerB,
        url: '/admin/blogs/create',
        main: '/blogs'
    },
    {
        name: 'profile',
        symbol: RiUser3Fill,
        url: '/admin/profile'
    },
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

const mainArray = [
    '/admin/dashboard', '/admin/all_users', '/admin/exchange', '/admin/giftcards', '/admin/bank_withdrawals',
]

const AdminFooter = () => {
    const [view, setView] = useState(false)
    const location = useLocation()
    const pathName = location.pathname
    const active = 'text-lightgreen'
    const nonactive = 'text-white/60 hover:text-lightgreen'


    return (
        <div className='w-full fixed bottom-1 z-30'>
            <div className='w-11/12 mx-auto relative'>
                <div className="w-full px-5 relative bg-[#212134] border border-secondary rounded-full flex items-center justify-around gap-2">
                    {mainIcons.map((item, i) => {
                        return (
                            <div key={i} className="flex items-center py-4 relative" >
                                {pathName === item.url || pathName.includes(item.main) ?
                                    <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full "></div>
                                    :
                                    <></>
                                }
                                <Link to={item.url} onClick={MoveToTop}
                                    className={` group-hover:text-lightgreen px-2  ${pathName === item.url || pathName.includes(item.main) ? active : nonactive} cursor-pointer flex flex-col gap-1 items-center`}>
                                    <div className="text-[1.5rem]">{<item.symbol />}</div>
                                </Link>
                            </div>
                        )
                    })}
                    <div className='flex items-center py-4 relative'>
                        {!mainArray.includes(pathName) &&
                            <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full"></div>
                        }
                        <div className={`group-hover:text-lightgreen px-2 cursor-pointer text-[1.5rem] ${!mainArray.includes(pathName) ? active : nonactive}`} onClick={() => setView(!view)}>
                            <CiMenuKebab />
                        </div>
                    </div>
                </div>
                {view &&
                    <div className='absolute -top-12 right-0 bg-secondary border border-primary px-4 flex items-center justify-around gap-2 rounded-full'>
                        {extraIcons.map((item, i) => (
                            <div key={i} className='flex items-center py-4 relative'>
                                {pathName === item.url || pathName.includes(item.main) ?
                                    <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full"></div>
                                    :<></>
                                }
                                <Link to={item.url} onClick={MoveToTop}
                                    className={` group-hover:text-lightgreen px-2  ${pathName === item.url || pathName.includes(item.main) ? active : nonactive} cursor-pointer flex flex-col gap-1 items-center`}>
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