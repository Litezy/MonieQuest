import React from 'react'
import AuthHeader from './AuthHeader'

const AuthPageLayout = ({children}) => {
    return (
      <div>
        <AuthHeader />
        <div className=' bg-primary'>
          {children}
        </div>
      </div>
    )
}

export default AuthPageLayout