import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'


const PageLayout = ({ children }) => {


  return (
    <div>
      <Header />
      <div className='mt-16'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default PageLayout