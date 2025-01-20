import React from 'react'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'
import { links } from './AuthUtils'
import { Link, useLocation } from 'react-router-dom'



const AuthPageLayout = ({ children }) => {
  const location = useLocation()
  const pathName = location.pathname


  return (
    <div className='w-full relative'>
      <AuthHeader />
      <div className="flex w-full bg-[#1d1e30]">
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="h-screen hidden lg:block lg:w-[20%] pt-20">
          <div className="lg:flex hidden py-10 flex-col items-start px-5 gap-4">
            {links.map((link, i) => {
              return (
                <Link to={link.url}
                  className={` py-2 group text-base flex items-center gap-2 px-5 w-full ${pathName === link.url ? 'text-lightgreen  rounded-sm bg-[#1e333c]  ' : 'hover:bg-primary rounded-sm  text-[#9696b5] '} `} key={i}>
                  <link.icon className="transform group-hover:rotate-180 duration-300" />
                  <div className="">{link.label}</div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className='w-full bg-[#141523] lg:py-20 pt-10 pb-20 lg:w-[80%] h-[100dvh] overflow-y-auto text-white'>
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