import React from 'react'
import Header from './Header'
import Footer from './Footer'


const PageLayout = ({ children }) => {

  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default PageLayout