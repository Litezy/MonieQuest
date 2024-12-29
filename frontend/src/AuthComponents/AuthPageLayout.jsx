import React from 'react'
import AuthHeader from './AuthHeader'

const AuthPageLayout = ({children}) => {
    return (
      <div>
        <AuthHeader />
        <div className=''>
          {children}
        </div>
      </div>
    )
}

export default AuthPageLayout