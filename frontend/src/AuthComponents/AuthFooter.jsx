import React, { useEffect, useState } from 'react'
import { MdCurrencyExchange } from "react-icons/md";
import { BsGiftFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { CgToolbox } from "react-icons/cg";
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';


const AuthFooter = () => {

    const icons = [
        {
            name: 'Dashboard',
            symbol: MdDashboard,
            url: '/dashboard'
        },
        {
            name: 'Crypto Exchange',
            symbol: MdCurrencyExchange,
            url: '/exchange'
        },
        {
            name: 'Gift Cards',
            symbol: BsGiftFill,
            url: '/giftcards'
        },
        {
            name: 'Profit Tools',
            symbol: CgToolbox,
            url: '/profit_tools'
        },
    ]
    const [active, setActive] = useState(icons[0].url)
    const location = useLocation()
    const pathName = location.pathname
    

    const changeView = (url) => {
        setActive(url)
    }
    useEffect(() => {
        if (pathName === '/dashboard') {
            changeView('/dashboard')
        }
        if (pathName === '/exchange') {
            changeView('/exchange')
        }
        if (pathName === '/giftcards') {
            changeView('/giftcards')
        }
        if (pathName === '/profit_tools') {
            changeView('/profit_tools')
        }

    }, [pathName])

    return (
        <div className='w-full  fixed  bottom-0  z-50 '>
            <div className="w-[95%] mx-auto  px-5 flex relative items-center bg-[#212134] rounded-full justify-around gap-2">
                {icons.map((item, i) => {
                    return (
                        <div className="flex items-center pt-5 pb-3 relative">
                            {item.url === active &&
                                <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full "></div>
                            }
                            <Link onClick={() => changeView(item.url)} to={item.url}
                                className={` group-hover:text-lightgreen ${pathName === item.url ? 'bg-dark px-2 text-lightgreen ' : 'text-white/60 hover:text-lightgreen'} cursor-pointer flex items-center flex-col gap-1"`}>
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