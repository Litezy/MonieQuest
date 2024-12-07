import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MoveToTop } from '../utils/pageUtils';
import { LiaBarsSolid } from "react-icons/lia";
import { LuX } from "react-icons/lu";

const pageLinks = [
  { path: 'airdrops', dir: '' },
  { path: 'trade crypto', dir: '' },
  { path: 'profit tools', dir: '' },
]

const Header = () => {
  const [dropdown, setDropDown] = useState(false)

  return (
    <div className='fixed top-0 left-0 w-full bg-white z-50 border-b shadow-sm'>
      <div className='flex justify-between items-center w-11/12 mx-auto py-4'>
        <Link to='/' onClick={MoveToTop} className='uppercase text-2xl font-extrabold italic'>monie<span className='text-ash'>quest</span>
        </Link>
        <div className='lg:hidden text-3xl cursor-pointer' onClick={() => setDropDown(!dropdown)}>
          {dropdown ? <LuX /> : <LiaBarsSolid />}
        </div>
        <div className='lg:flex gap-10 hidden'>
          {pageLinks.map((item, i) => (
            <div className='hover:text-lightgreen cursor-pointer capitalize'>{item.path}</div>
          ))}
        </div>
        <div className='lg:flex gap-4 hidden'>
          <Link to='/login' onClick={MoveToTop}>
            <button className=' outline-0 w-fit h-fit py-2 px-7 border border-ash  text-sm text-ash hover:bg-ash hover:text-white font-medium rounded-lg flex items-center justify-center capitalize'>sign in</button>
          </Link>
          <Link to='/signup' onClick={MoveToTop}>
            <button className=' outline-0 w-fit h-fit py-2 px-7 text-sm text-white bg-ash border border-ash hover:bg-transparent hover:text-ash font-medium rounded-lg flex items-center justify-center capitalize' >sign up</button>
          </Link>
        </div>
      </div>
      {dropdown &&
        <div className='w-full h-72 border-t flex lg:hidden flex-col gap-8 items-center bg-white pt-6'>
          {pageLinks.map((item, i) => (
            <div className='hover:text-lightgreen cursor-pointer capitalize font-semibold'>{item.path}</div>
          ))}
          <div className='flex gap-8'>
            <Link to='/login' onClick={MoveToTop}>
              <button className=' outline-0 w-fit h-fit py-2 px-7 border border-ash  text-sm text-ash hover:bg-ash hover:text-white font-medium rounded-lg flex items-center justify-center capitalize'>sign in</button>
            </Link>
            <Link to='/signup' onClick={MoveToTop}>
              <button className=' outline-0 w-fit h-fit py-2 px-7 text-sm text-white bg-ash border border-ash hover:bg-transparent hover:text-ash font-medium rounded-lg flex items-center justify-center capitalize' >sign up</button>
            </Link>
          </div>
        </div>
      }
    </div>
  )
}

export default Header