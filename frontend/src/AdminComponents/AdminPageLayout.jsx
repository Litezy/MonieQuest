import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import user1 from '../assets/images/customer2.jpg'
import { MoveToTop } from '../utils/pageUtils'
import AdminFooter from './AdminFooter'
import { pagelinks } from './AdminUtils'


const AdminPageLayout = ({ children }) => {
    const location = useLocation()
    const pathName = location.pathname
    const active = 'text-lightgreen rounded-sm bg-[#1e333c]'
    const nonactive = 'hover:bg-primary rounded-sm text-[#9696b5]'

    return (
        <div className='w-full'>
            <div className="flex w-full bg-[#1d1e30]">
                <div
                    className="h-screen z-30 hidden lg:block lg:w-[20%] pt-10 overflow-hidden">
                    <div>
                        <img src={logo} alt='moniequest-logo' className='h-14 w-auto mx-auto'></img>
                    </div>
                    <div className='flex gap-2 items-center justify-center mt-6 bg-primary p-4 rounded-lg w-11/12 h-fit mx-auto'>
                        <img src={user1} alt='user_profile' className='size-14 object-cover rounded-full border-2 border-ash'></img>
                        <div className='text-xl text-center font-bold capitalize text-gray-200'>admin micheal</div>
                    </div>
                    <div className="flex mt-10 pb-10 flex-col items-start px-5 gap-4 h-[65vh] overflow-y-auto scroll">
                        {pagelinks.map((link, i) => {
                            return (
                                <Link onClick={MoveToTop} to={link.url}
                                    className={` py-2 group text-base flex items-center gap-2 px-5 w-full capitalize ${pathName === link.url || pathName.includes(link.main) ? active : nonactive} `} key={i}>
                                    <div className="relative">
                                        {link.last && <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-red-600 z-40"></div>}
                                        <link.icon className="transform group-hover:rotate-180 text-xl duration-300" />
                                    </div>
                                    <div>{link.label}</div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className='lg:w-[80%] w-full h-screen bg-[#141523] pt-10 pb-20 lg:pb-10 overflow-y-auto overflow-x-hidden text-white'>
                    {children}
                </div>
            </div>
            <div className="lg:hidden">
                <AdminFooter />
            </div>
        </div>
    )
}

export default AdminPageLayout