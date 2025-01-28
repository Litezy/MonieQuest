import React from 'react'
import AuthFooter from './AuthFooter'
import { links } from './AuthUtils'
import { Link, useLocation, useParams } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import user1 from '../assets/images/customer1.jfif'
import { MoveToTop } from '../utils/pageUtils'


const AuthPageLayout = ({ children }) => {
  const location = useLocation()
  const pathName = location.pathname
  const active = 'text-lightgreen rounded-sm bg-[#1e333c]'
  const nonactive = 'hover:bg-primary rounded-sm text-[#9696b5]'

  const {user,profile,kyc} = useParams()
  console.log(user,profile,kyc)
  return (
    <div className='w-full'>
      <div className="flex w-full bg-[#1d1e30]">
        <div
          // data-aos="zoom-in"
          // data-aos-delay="100"
          className="h-screen z-50 fixed hidden lg:block lg:w-[20%] pt-10">
          <div>
            <img src={logo} alt='moniequest-logo' className='h-14 w-auto mx-auto'></img>
          </div>
          <div className='flex gap-2 items-center justify-center pt-6'>
            <img src={user1} alt='user_profile' className='size-14 object-cover rounded-full border-2 border-ash'></img>
            <div className='text-xl font-bold capitalize text-gray-200'>allen williams</div>
          </div>
          <div className="flex mt-10 pb-10 flex-col items-start px-5 gap-4 h-[65vh] overflow-y-auto scroll">
            {links.map((link, i) => {
              // const lastItem = links.length -1
              return (
                <Link onClick={MoveToTop} to={link.url}
                  className={` py-2 group text-base flex items-center gap-2 px-5 w-full capitalize ${link.label === 'profit tools' ? pathName.includes(link.main) ? active : nonactive : pathName === link.url || pathName.includes(link.label) ? active : nonactive} `} key={i}>
                  <div className="relative">
                    {link.last && <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-red-600 z-40"></div>}
                    <link.icon className="transform group-hover:rotate-180 text-xl duration-300" />
                  </div>
                  <div className={``}>{link.label}</div>
                </Link>
              )
            })}
            <button className="text-sm px-3 py-2 rounded-md bg-ash text-white">Not Seeing What You Need? Tap and Contact Support Now!</button>
          </div>
        </div>
        <div className='w-full lg:ml-[20%] min-h-screen bg-[#141523] pt-5 pb-20 lg:pb-10 lg:w-[80%] h-sc overflow-y-auto overflow-x-hidden text-white'>
          {children}
        </div>
      </div>
      <div className="lg:hidden">
        <AuthFooter />
      </div>
    </div>
  )
}

export default AuthPageLayout