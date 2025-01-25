import React, { useEffect, useState } from 'react'
import CarouselComp from '../../GeneralComponents/Carousel';
import iconImg from '../../assets/images/db_icon.png'
import TradingChart from '../../GeneralComponents/TradingChart';
import SelectComp from '../../GeneralComponents/SelectComp'
import { currencies } from '../../AuthComponents/AuthUtils';

const calender = [
  "daily", "monthly", "yearly"
]
const tradeOverviewFilter = [
  "All Coins", "All Gift Card", "All Products", "All Categories", "Recent Trades"
]

const tradingAnalyticFilter = [
  "Popular", "Top Gainers", "Top Losers", "Most Traded"
]


const Dashboard = () => {
  const [active, setActive] = useState(calender[0])

  return (
    <div className="w-11/12 mx-auto">
      <div className='grid md:grid-cols-6 grid-cols-1 gap-6 h-fit'>
        <div className='md:col-span-4 col-span-1 bg-primary w-full h-fit px-6 md:pt-2 pt-4 md:pb-4 pb-6  overflow-hidden'>
          <div className='flex justify-between gap-4 items-center'>
            <div className='flex flex-col gap-3'>
              <div className='text-lightgreen capitalize'>current balance</div>
              <div className='md:text-5xl text-4xl font-bold'>{currencies[1].symbol}78,000</div>
              <div className='flex md:gap-10 gap-6 items-center mt-2'>
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-1 items-center'>
                    <div className='w-3.5 h-3.5 bg-lightgreen rounded-full'></div>
                    <div className='md:text-sm text-xs capitalize font-medium'>total deposit</div>
                  </div>
                  <div className='font-bold'>{currencies[1].symbol}238,224.60</div>
                </div>
                <div className='flex flex-col gap-1 border-l-2 md:pl-10 pl-6'>
                  <div className='flex gap-1 items-center'>
                    <div className='w-3.5 h-3.5 bg-red-600 rounded-full'></div>
                    <div className='md:text-sm text-xs capitalize font-medium'>outflow</div>
                  </div>
                  <div className='font-bold'>{currencies[1].symbol}160,000.01</div>
                </div>
              </div>
            </div>
            <div>
              <img src={iconImg} alt='dashboard_icon' className='md:h-44 h-20 w-auto'></img>
            </div>
          </div>
        </div>
        <div className='md:col-span-2 col-span-1 md:h-full h-56'>
          <CarouselComp />
        </div>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-6 mt-12'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between gap-4 items-start'>
            <div className='text-2xl capitalize font-bold'>trading analytics</div>
            <SelectComp options={tradingAnalyticFilter} style={{ bg: '#212134', color: 'lightgrey', font: '0.8rem' }} />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {new Array(4).fill(0).map((_, i) => (
              <div className='w-full bg-primary h-44' key={i}></div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='text-2xl capitalize font-bold'>your trading overview</div>
          <div className='bg-primary h-fit w-full px-4 pt-4 flex flex-col gap-2 overflow-hidden'>
            <div className='flex justify-between gap-2'>
              <SelectComp options={tradeOverviewFilter} style={{ bg: '#171828', color: 'lightgrey', font: '0.8rem' }} />
              <div className='flex items-center'>
                {calender.map((item, i) => (
                  <div key={i} onClick={() => setActive(item)} className={`w-fit h-fit md:px-4 px-3 py-1.5 md:text-sm text-xs capitalize cursor-pointer ${active === item && 'bg-[#143f75] rounded-full'}`}>{item}</div>
                ))}
              </div>
            </div>
            <div className='flex items-center'>
              <TradingChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard