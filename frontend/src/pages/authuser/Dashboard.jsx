import React, { useCallback, useEffect, useState } from 'react'
import CarouselComp from '../../GeneralComponents/Carousel';
import iconImg from '../../assets/images/db_icon.png'
import TradingChart from '../../AuthComponents/TradingChart';
import SelectComp from '../../GeneralComponents/SelectComp'
import { currencies } from '../../AuthComponents/AuthUtils';
import AuthPageLayout from '../../AuthComponents/AuthPageLayout';
import { useAtom } from 'jotai';
import { USER_CHARTS, WALLET } from '../../services/store';
import TrendingCoins from '../../AuthComponents/TrendingCoins';
import { Apis, AuthGetApi } from '../../services/API';


const localName = 'Charts'
const Dashboard = () => {
  const [wallet] = useAtom(WALLET)
  const [, setCharts] = useAtom(USER_CHARTS)
  const localData = JSON.parse(localStorage.getItem(localName))
  useEffect(() => {
    if (!localData) {
      localStorage.setItem(localName, JSON.stringify([]))
    }
  }, [])
  const fetchChartData = useCallback(async () => {
    try {
      const res = await AuthGetApi(Apis.user.get_user_charts);
      if (res.status !== 200) return;
      setCharts(res.data);
      localStorage.setItem(localName, JSON.stringify(res.data))
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchChartData()
  }, [fetchChartData])
  return (
    <AuthPageLayout>
      <div className="w-11/12 mx-auto">
        <div className='grid md:grid-cols-6 grid-cols-1 gap-6 h-fit'>
          <div className='md:col-span-4 col-span-1 bg-primary w-full h-fit px-6 md:pt-0 pt-4 md:pb-4 pb-6  overflow-hidden'>
            <div className='grid grid-cols-3 gap-4 items-center'>
              <div className='flex flex-col gap-3 col-span-2'>
                <div className='text-lightgreen capitalize'>current balance</div>
                <div className='md:text-5xl text-4xl font-bold'>{currencies[1].symbol}{Object.values(wallet).length !== 0 ? <span>{wallet.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span> : <span>0.00</span>}</div>
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
                    <div className='font-bold'>{currencies[1].symbol}{Object.values(wallet).length !== 0 ? <span>{wallet.total_outflow.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span> : <span>0.00</span>}</div>
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
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-12 lg:h-[25rem] overflow-hidden'>
          <TrendingCoins />
          <TradingChart/>
        </div>
      </div>
    </AuthPageLayout>
  )
}

export default Dashboard