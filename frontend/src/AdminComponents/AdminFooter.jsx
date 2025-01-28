import React from 'react'
import { MdCurrencyExchange } from "react-icons/md";
import { BsGiftFill } from "react-icons/bs";
import { CgToolbox } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MoveToTop } from '../utils/pageUtils';


const AdminFooter = () => {

    const icons = [
        {
            name: 'crypto exchange',
            symbol: MdCurrencyExchange,
            url: '/user/exchange'
        },
        {
            name: 'gift cards',
            symbol: BsGiftFill,
            url: '/user/giftcards'
        },
        {
            name: 'profit tools',
            symbol: CgToolbox,
            main: 'user/profit_tools',
            url: '/user/profit_tools/create'
        },
        {
            name: 'profile',
            symbol: FaUser,
            url: '/user/profile'
        },
    ]

    const location = useLocation()
    const pathName = location.pathname
    const active = 'text-lightgreen'
    const nonactive = 'text-white/60 hover:text-lightgreen'


    return (
        <div className='w-full fixed bottom-0 z-50'>
            <div className="w-full mx-auto px-5 flex relative items-center bg-[#212134]  justify-around gap-2">
                {icons.map((item, i) => {
                    return (
                        <div key={i} className="flex items-center pt-5 pb-3 relative" >
                            {pathName === item.url &&
                                <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full "></div>
                            }
                            <Link to={item.url} onClick={MoveToTop}
                                className={` group-hover:text-lightgreen px-2  ${pathName === item.url ? active : nonactive} cursor-pointer flex items-center flex-col gap-1"`}>
                                <div className="text-[1.5rem]  ">{<item.symbol />}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminFooter