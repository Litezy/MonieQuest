import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'


const PageLayout = ({ children }) => {

  const location = useLocation()
  const paths = ['verify-account','login','signup','forgot-password']
  const [showFooter, setShowFooter] = useState(true)
  const pathName = location.pathname

  useEffect(() => {
    if(paths.some( path => pathName.includes(path))){
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