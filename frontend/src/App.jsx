import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GeneralPagesLinks } from './utils/PageLinks'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {GeneralPagesLinks.map((item, index) => (
          <Route key={index} path={`${item.path}`} element={<item.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App