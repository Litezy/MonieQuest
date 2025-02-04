import React, { useState } from 'react'
import AuthPageLayout from '../../AuthComponents/AuthPageLayout'
import { Link, useLocation } from 'react-router-dom'

const Exchange = ({ children }) => {
  const links = [
    { path: 'buy', url: '/user/exchange/buy' },
    { path: 'sell', url: '/user/exchange/sell' },
    { path: 'orders', url: '/user/exchange/orders',order:true },
  ]

  const location = useLocation()

  return (
    <AuthPageLayout>
      <div className="w-11/12 lg:w-2/3 mx-auto bg-[#1d1e30] rounded-md p-1.5 gap-10 flex items-center justify-center">
       <div className="w-full grid grid-cols-3 relative">
       {links.map((item, i) => (
          <Link to={item.url} className={`cursor-pointer w-full relative py-3 uppercase ${location.pathname === item.url ? 'bg-white text-dark rounded-md' : ''} text-center `} key={i}>{item.path} {item.order && <span className='w-2 h-2  absolute top-2 rounded-full bg-red-600'></span>}</Link>
        ))}
       </div>
      </div>
      <div className='mt-5'>
        {children}
      </div>
    </AuthPageLayout>
  )
}

export default Exchange