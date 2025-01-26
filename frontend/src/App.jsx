import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GeneralPagesLinks } from './utils/pageLinks'
import { AuthPagesLinks } from './utils/pageLinks'
import AuthPageLayout from './AuthComponents/AuthPageLayout'
import AOS from 'aos'
import 'aos/dist/aos.css'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {GeneralPagesLinks.map((item, index) => (
          <Route key={index} path={`${item.path}`} element={<item.component />} />
        ))}
        {AuthPagesLinks.map((item, index) => (
          <Route key={index} path={`${item.path}`} element={<item.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App