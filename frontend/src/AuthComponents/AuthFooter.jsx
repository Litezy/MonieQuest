import React from 'react'
import { MdCurrencyExchange } from "react-icons/md";
import { BsGiftFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { CgToolbox } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { GoHistory } from "react-icons/go";
import { FaUser } from "react-icons/fa";


const AuthFooter = () => {

    const icons = [
        {
            name: 'Dashboard',
            symbol: MdDashboard,
            url: '/user/dashboard'
        },
        {
            name: 'Profile',
            symbol: FaUser,
            url: '/user/profile'
        },
        {
            name: 'Crypto Exchange',
            symbol: MdCurrencyExchange,
            url: '/user/exchange'
        },
        {
            name: 'Gift Cards',
            symbol: BsGiftFill,
            url: '/user/giftcards'
        },
        {
            name: 'Profit Tools',
            symbol: CgToolbox,
            url: '/user/profit_tools'
        },
        
        {
            name: 'Transaction History',
            symbol: GoHistory,
            url: '/user/transactions_history'
        }
    ]
    const location = useLocation()
    const pathName = location.pathname
    

    return (
        <div className='w-full fixed bottom-1 z-50'>
            <div className="w-[95%] mx-auto  px-5 flex relative items-center bg-[#212134] rounded-full justify-around gap-2">
                {icons.map((item, i) => {
                    return (
                        <div key={i} className="flex items-center pt-5 pb-3 relative" >
                            {item.url === pathName &&
                                <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full "></div>
                            }
                            <Link  to={item.url}
                                className={` group-hover:text-lightgreen ${pathName === item.url ? ' px-2 text-lightgreen ' : 'text-white/60 hover:text-lightgreen'} cursor-pointer flex items-center flex-col gap-1"`}>
                                <div className="text-[1.5rem]  ">{<item.symbol />}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AuthFooter