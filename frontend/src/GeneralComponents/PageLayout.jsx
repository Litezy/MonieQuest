import React from 'react'
import Header from './Header'
import Footer from './Footer'


const PageLayout = ({ children }) => {

  return (
    <>
      <div className='h-16'>
        <Header />
      </div>
      <div>
        {children}
      </div>
      <div>
      <Footer />
      </div>
    </>
  )
}

export default PageLayout