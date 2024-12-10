import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { MoveToTop } from '../utils/pageUtils';
import { PiX } from "react-icons/pi";
import { SlMenu } from "react-icons/sl";
import logo from '../assets/images/logo.png'

const pageLinks = [
  { path: 'home', url: '/' },
  { path: 'airdrops', url: '/airdrops' },
  { path: 'buy & sell crypto', url: '' },
  { path: 'profit tools', url: '' },
]

const Header = () => {
  const [menu, setMenu] = useState(false)
  const location = useLocation()

  return (
    <div className='fixed top-0 left-0 w-full bg-white z-50 border-b shadow-sm'>
      <div className='flex justify-between items-center w-11/12 mx-auto'>
        <Link to='/' onClick={MoveToTop} className='uppercase text-2xl font-extrabold italic'>
          <img alt='moniequest logo' src={logo} className='h-20 w-auto'></img>
        </Link>
        <div className='lg:flex gap-2 hidden'>
          {pageLinks.map((item, i) => (
            <Link key={i} to={item.url} className={`hover:text-lightgreen cursor-pointer capitalize px-3 ${location.pathname === item.url && 'font-bold border-b border-black'}`}>{item.path}</Link>
          ))}
        </div>
        <div className='lg:flex gap-4 hidden'>
          <Link to='/login' onClick={MoveToTop}>
            <button className=' outline-0 w-fit h-fit py-2 px-7 border border-ash  text-sm text-ash hover:bg-ash hover:text-white font-medium rounded-md flex items-center justify-center capitalize'>sign in</button>
          </Link>
          <Link to='/signup' onClick={MoveToTop}>
            <button className=' outline-0 w-fit h-fit py-2 px-7 text-sm text-white bg-ash border border-ash hover:bg-transparent hover:text-ash font-medium rounded-md flex items-center justify-center capitalize' >sign up</button>
          </Link>
        </div>
        <div className='lg:hidden text-2xl cursor-pointer' onClick={() => setMenu(!menu)}>
          {menu ? <PiX /> : <SlMenu />}
        </div>
      </div>
      <div className={`w-full ${menu ? 'h-80' : 'h-0'} sl_trans overflow-hidden border-t lg:hidden bg-white`}>
        <div className='flex flex-col gap-8 items-center pt-6'>
          {pageLinks.map((item, i) => (
            <Link key={i} to={item.url} className='hover:text-lightgreen cursor-pointer capitalize' onClick={() => setMenu(false)}>{item.path}</Link>
          ))}
          <div className='flex gap-8'>
            <Link to='/login' onClick={() => { MoveToTop(); setMenu(false) }}>
              <button className=' outline-0 w-fit h-fit py-2 px-7 border border-ash  text-sm text-ash hover:bg-ash hover:text-white font-medium rounded-md flex items-center justify-center capitalize'>sign in</button>
            </Link>
            <Link to='/signup' onClick={() => { MoveToTop(); setMenu(false) }}>
              <button className=' outline-0 w-fit h-fit py-2 px-7 text-sm text-white bg-ash border border-ash hover:bg-transparent hover:text-ash font-medium rounded-md flex items-center justify-center capitalize' >sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header