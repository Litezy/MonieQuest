import React from 'react'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'

const AuthPageLayout = ({children}) => {
    return (
      <div className=''>
        <AuthHeader />
        <div className=' bg-primary pb-20 lg:pb-0 h-[100dvh] w-full '>
          {children}
        </div>
        <div className="lg:hidden">
          <AuthFooter />
        </div>
 
      </div>
    )
}

export default AuthPageLayout