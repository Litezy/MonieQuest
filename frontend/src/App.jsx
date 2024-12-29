import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GeneralPagesLinks } from './utils/pageLinks'
import { AuthPagesLinks } from './utils/pageLinks'
import AuthPageLayout from './AuthComponents/AuthPageLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {GeneralPagesLinks.map((item, index) => (
          <Route key={index} path={`${item.path}`} element={<item.component />} />
        ))}
        {AuthPagesLinks.map((item, index) => (
          <Route key={index} path={`${item.path}`} element={<AuthPageLayout><item.component /></AuthPageLayout>} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App