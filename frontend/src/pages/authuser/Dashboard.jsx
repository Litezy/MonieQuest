import React, { useState } from 'react'
import CarouselComp from '../../GeneralComponents/Carousel';
import iconImg from '../../assets/images/db_icon.png'
import TradingChart from '../../AuthComponents/TradingChart';
import SelectComp from '../../GeneralComponents/SelectComp'
import { currencies } from '../../AuthComponents/AuthUtils';
import AuthPageLayout from '../../AuthComponents/AuthPageLayout';
import { useAtom } from 'jotai';
import { WALLET } from '../../services/store';
import TrendingCoins from '../../AuthComponents/TrendingCoins';



const calender = [
  "daily", "monthly", "yearly"
]
const tradeOverviewFilter = [
  "All Coins", "All Gift Card", "All Products", "All Categories", "Recent Trades"
]




const Dashboard = () => {
  const [wallet] = useAtom(WALLET)
  const [active, setActive] = useState(calender[0])
  const [select, setSelect] = useState({
    overview: tradeOverviewFilter[0],
  })

  return (
    <AuthPageLayout>
      <div className="w-11/12 mx-auto">
        <div className='grid md:grid-cols-6 grid-cols-1 gap-6 h-fit'>
          <div className='md:col-span-4 col-span-1 bg-primary w-full h-fit px-6 md:pt-0 pt-4 md:pb-4 pb-6  overflow-hidden'>
            <div className='grid grid-cols-3 gap-4 items-center'>
              <div className='flex flex-col gap-3 col-span-2'>
                <div className='text-lightgreen capitalize'>current balance</div>
                <div className='md:text-5xl text-4xl font-bold'>{currencies[1].symbol}{Object.values(wallet).length !== 0 ? <span>{wallet.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,')}</span> : <span>0.00</span>}</div>
                <div className='flex md:gap-10 gap-6 items-center mt-2'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-1 items-center'>
                      <div className='md:size-3.5 size-3 bg-lightgreen rounded-full'></div>
                      <div className='md:text-sm text-xs capitalize font-medium'>total deposit</div>
                    </div>
                    <div className='font-bold'>{currencies[1].symbol}{Object.values(wallet).length !== 0 ? <span>{wallet.total_deposit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span> : <span>0.00</span>}</div>
                  </div>
                  <div className='flex flex-col gap-1 border-l-2 md:pl-10 pl-6'>
                    <div className='flex gap-1 items-center'>
                      <div className='md:size-3.5 size-3 bg-red-600 rounded-full'></div>
                      <div className='md:text-sm text-xs capitalize font-medium'>total outflow</div>
                    </div>
                    <div className='font-bold'>{currencies[1].symbol}{Object.values(wallet).length !== 0 ? <span>{wallet.total_outflow.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,')}</span> : <span>0.00</span>}</div>
                  </div>
                </div>
              </div>
              <div className='col-span-1 md:hidden lg:block'>
                <img src={iconImg} alt='dashboard_icon' className='lg:w-full h-auto w-fit'></img>
              </div>
            </div>
          </div>
          <div className='md:col-span-2 col-span-1 md:h-full h-52'>
            <CarouselComp />
          </div>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-6 mt-12'>
         <TrendingCoins/>
          <div className='flex flex-col gap-4'>
            <div className='text-2xl capitalize font-bold'>your trading overview</div>
            <div className='bg-primary h-fit w-full px-4 pt-4 flex flex-col gap-2 overflow-hidden'>
              <div className='flex justify-between gap-2'>
                <SelectComp options={tradeOverviewFilter} style={{ bg: '#171828', color: 'lightgrey', font: '0.8rem' }} value={select.overview} handleChange={(e) => setSelect({ ...select, overview: e.target.value })} />
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
    </AuthPageLayout>
  )
}

export default Dashboard