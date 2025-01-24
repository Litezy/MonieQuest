import React from 'react'
import { FaCoins } from "react-icons/fa6";
import CarouselComp from '../../GeneralComponents/Carousel';


const Dashboard = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className='grid md:grid-cols-6 grid-cols-1 gap-6'>
        <div className='md:col-span-4 col-span-1 bg-primary w-full h-fit pt-5 pb-10 px-5 overflow-hidden'>
          <div className='flex justify-between items-center gap-4'>
            <div className='flex flex-col gap-3'>
              <div className='text-lightgreen capitalize'>current balance</div>
              <div className='md:text-5xl text-4xl font-bold'>$78,224.59</div>
              <div className='flex md:gap-10 gap-6 items-center mt-2'>
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-1 items-center'>
                    <div className='w-3.5 h-3.5 bg-white rounded-full'></div>
                    <div className='md:text-sm text-xs capitalize font-medium'>total deposit</div>
                  </div>
                  <div className='font-bold'>$238,224.60</div>
                </div>
                <div className='flex flex-col gap-1 border-l-2 md:pl-10 pl-6'>
                  <div className='flex gap-1 items-center'>
                    <div className='w-3.5 h-3.5 bg-white rounded-full'></div>
                    <div className='md:text-sm text-xs capitalize font-medium'>outflow</div>
                  </div>
                  <div className='font-bold'>$160,000.01</div>
                </div>
              </div>
            </div>
            <div className='text-yellow-300 md:text-[9rem] text-7xl md:pr-4 pr-0'>
              <FaCoins />
            </div>
          </div>
        </div>
        <div className='md:col-span-2 col-span-1 h-52'>
          <CarouselComp />
        </div>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-6 mt-10'>
        <div>{/**crypto api here*/}</div>
        <div className='flex flex-col gap-4'>
          <div className='text-2xl capitalize font-bold'>your trading overview</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard