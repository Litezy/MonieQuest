import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv'

const AirdropsPage = () => {
  const [dataLoading, setDataLoading] = useState(true)

  setTimeout(() => {
    setDataLoading(false)
  }, 2000)

  return (
    <PageLayout>
      <div className='pb-20 bg-dark w-full text-gray-200'>
        <div className='pageBg'>
          <div className='w-full h-full bg-[#212134ea] py-20'>
            <div className='text-4xl font-bold text-white text-center'>Airdrops</div>
          </div>
        </div>
        <div className='w-11/12 mx-auto mt-16'>
          <div className='flex flex-col gap-16'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <span className='capitalize font-bold text-2xl'>featured airdrops</span>
                <span>Below are the available featured airdrops on our platform, click on an airdrop to see details.</span>
              </div>
              <div className='flex flex-wrap gap-4 justify-center'>
                {dataLoading ?
                  <>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-72 h-40 rounded-md bg-slate-400 animate-pulse'></div>
                    ))}
                  </>
                  :
                  <>
                    {new Array(8).fill(0).map((item, i) => (
                      <AirdropDiv key={i} item={item} />
                    ))}
                  </>
                }
              </div>
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <span className='capitalize font-bold text-2xl'>solana airdrops</span>
                <span>Below are the available solana airdrops on our platform, click on an airdrop to see details.</span>
              </div>
              <div className='flex flex-wrap gap-4 justify-center'>
                {dataLoading ?
                  <>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-72 h-40 rounded-md bg-slate-400 animate-pulse'></div>
                    ))}
                  </>
                  :
                  <>
                    {new Array(8).fill(0).map((item, i) => (
                      <AirdropDiv key={i} item={item} />
                    ))}
                  </>
                }
              </div>
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <span className='capitalize font-bold text-2xl'>deFi airdrops</span>
                <span>Below are the available deFi airdrops on our platform, click on an airdrop to see details.</span>
              </div>
              <div className='flex flex-wrap gap-4 justify-center'>
                {dataLoading ?
                  <>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-72 h-40 rounded-md bg-slate-400 animate-pulse'></div>
                    ))}
                  </>
                  :
                  <>
                    {new Array(8).fill(0).map((item, i) => (
                      <AirdropDiv key={i} item={item} />
                    ))}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default AirdropsPage