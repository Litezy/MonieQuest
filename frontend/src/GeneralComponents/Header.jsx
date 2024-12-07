import React from 'react'
import { Link } from 'react-router-dom';
import { MoveToTop } from '../utils/pageUtils';


const Header = () => {
  return (
    <div className='fixed top-0 left-0 h-fit w-full bg-white z-50 border-b'>
      <div className='flex justify-between items-center w-11/12 mx-auto py-4'>
        <Link to='/' onClick={MoveToTop} className='uppercase text-2xl font-extrabold italic'>velo<span className='text-orange'>x</span>
        </Link>
        <div className='flex gap-4'>
          <Link to='/login' onClick={MoveToTop}>
            <button className=' outline-0 w-fit h-fit py-1 px-6 border text-sm text-primary font-medium rounded-lg border-primary hover:bg-primary hover:text-white flex items-center justify-center capitalize'>sign in</button>
          </Link>
          <Link to='/signup' onClick={MoveToTop}>
            <button className=' outline-0 w-fit h-fit py-1 px-6 text-sm text-white rounded-lg bg-primary hover:bg-transparent hover:text-primary border border-primary font-medium flex items-center justify-center capitalize' >sign up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header