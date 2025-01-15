import React from 'react'
import { MdCurrencyExchange } from "react-icons/md";
import { BsGiftFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { CgToolbox } from "react-icons/cg";


const AuthFooter = () => {

    const icons = [
        {
            name:'Dashboard',
            symbol: MdDashboard
        },
        {
            name:'Crypto Exchange',
            symbol:MdCurrencyExchange
        },
        {
            name:'Gift Cards',
            symbol:BsGiftFill
        },
        {
            name:'Profit Tools',
            symbol:CgToolbox
        },
    ]
  return (
    <div className='w-full  fixed  bottom-0 bg-white z-50 py-2'>
        <div className="w-[90%] mx-auto flex items-center justify-between gap-2">
            {icons.map((item,i) =>{
                return (
                    <div className="cursor-pointer flex items-center flex-col gap-1">
                        <div className="text-[1.5rem]">{<item.symbol/>}</div>
                        <div className="text-xs">{item.name}</div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default AuthFooter