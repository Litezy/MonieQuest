import React from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { currencies } from './AuthUtils';


const AuthHeader = () => {
    return (
        <div className='w-full fixed top-0 h-fit block bg-[#1d1e30] z-50'>
            <div className="md:px-6 px-4 flex items-center justify-between">
                <div className="">
                    <img src={logo} className='h-14' alt="moniequest-logo" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="lg:flex hidden items-center h-10 w-32">
                        <div className="bg-[#067544] w-1/3 h-full rounded-s-sm flex items-center justify-center">
                            <MdOutlineAccountBalanceWallet className='text-white text-xl'/>
                        </div>
                        <div className="bg-[#1e4642] px-3 h-full flex items-center text-white font-bold justify-center rounded-e-sm">{currencies[1].symbol}25,000</div>
                    </div>
                    <Link to={'/user/profile'} className="flex items-center gap-2 bg-[#2f3043] py-1  px-4 rounded-md">
                        <div className="p-2 rounded-full flex items-center justify-center bg-white">
                            <FaUserAlt className='text-lg' />
                        </div>
                        <div className="text-white font-bold">Litezy</div>
                    </Link>
                    <Link to='/user/notification' className="relative">
                        <IoNotificationsSharp className='text-2xl cursor-pointer text-lightgreen' />
                        <div className="absolute w-2 h-2 rounded-full bg-red-500 top-1 right-1"></div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AuthHeader;
