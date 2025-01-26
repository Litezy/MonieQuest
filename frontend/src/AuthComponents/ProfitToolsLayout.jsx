import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthPageLayout from './AuthPageLayout'

const profitToolsLinks = [
    { path: 'create', url: '/user/profit_tools/create' },
    { path: 'tools', url: '/user/profit_tools/all_tools' },
]

const ProfitToolsLayout = ({ children }) => {
    const location = useLocation()

    return (
        <AuthPageLayout>
            <div className="mt-5 w-11/12 lg:w-2/3 mx-auto bg-[#1d1e30] rounded-md p-1.5 gap-10 flex items-center justify-center">
                {profitToolsLinks.map((item, i) => (
                    <Link to={item.url} className={`cursor-pointer w-full py-3 uppercase ${location.pathname === item.url ? 'bg-white text-dark rounded-md' : ''} text-center `} key={i}>{item.path}</Link>
                ))}
            </div>
            <div className='mt-10'>
                {children}
            </div>
        </AuthPageLayout>
    )
}

export default ProfitToolsLayout