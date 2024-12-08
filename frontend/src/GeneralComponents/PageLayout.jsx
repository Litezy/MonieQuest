import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'


const PageLayout = ({ children }) => {

  const location = useLocation()
  const [showFooter, setShowFooter] = useState(true)
  const pathName = location.pathname

  useEffect(() => {
    if (pathName.includes('login') || pathName.includes('signup')) {
      setShowFooter(false)
    }
  },[pathName])

  return (
    <>
      <div className='h-16'>
        <Header />
      </div>
      <div>
        {children}
      </div>
      <div>
        {showFooter ? <Footer /> :''}
      </div>
    </>
  )
}

export default PageLayout