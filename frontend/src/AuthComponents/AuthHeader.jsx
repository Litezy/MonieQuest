import React from 'react'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";


const AuthHeader = () => {
    const navigate = useNavigate()
    const links = [
        { label: 'dashboard', url: '/dashboard' },
        { label: 'exchange', url: '/exchange' },
        { label: 'profit tools', url: '/profit_tools' },
        // { label: 'Blogs', url: '/auth_blogs' }
    ]

    const Logout = () => {
        navigate('/')
    }


    return (
        <div className='w-full py-1 bg-primary'>
            <div className="w-11/12 mx-auto flex items-center justify-between">
                <div className="">
                    <img src={logo} className='h-16' alt="moniequest-logo" />
                </div>
                <div className="flex items-center gap-5 text-white capitalize">
                    {links.map((link, i) => {
                        return (
                            <Link to={link.url} className="" key={i}>{link.label}</Link>
                        )
                    })}
                    <div onClick={Logout} className='cursor-pointer'>logout</div>
                </div>
                <div className="flex items-center gap-3">
                    <Link to={'/profile'} className="flex items-center gap-2 bg-secondary py-1 px-5 rounded-md">
                        <div className="p-2 rounded-full flex items-center justify-center bg-white">
                            <FaUserAlt className='text-lg' />
                        </div>
                        <div className="text-white font-bold">Litezy</div>
                    </Link>
                    <div className="relative">
                        <IoNotificationsSharp className='text-2xl cursor-pointer text-white' />
                        <div className="absolute w-2 h-2 rounded-full bg-red-500 top-1 right-1"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthHeader