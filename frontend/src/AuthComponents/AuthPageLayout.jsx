import React from 'react'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'
import { links } from './AuthUtils'
import { Link, useLocation } from 'react-router-dom'



const AuthPageLayout = ({ children }) => {
  const location = useLocation()
  const pathName = location.pathname
  return (
    <div className='w-full min-h-[100dvh]'>
      <AuthHeader />
      <div className="flex items-start lg:pt-16 pt-2 bg-[#1d1e30]  min-h-[100dvh] w-full">
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="h-screen hidden lg:block fixed lg:w-[20%] ">
          <div className="lg:flex hidden py-10 flex-col items-start px-5  gap-2  ">
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
        <div className='w-full bg-[#141523] pb-20 lg:pb-10  lg:w-[80%] min-h-[89dvh] lg:ml-[20%] overflow-auto'>
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