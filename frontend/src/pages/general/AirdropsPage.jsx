import React from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv'

const AirdropsPage = () => {
  return (
    <PageLayout>
      <div className='pb-20'>
        <div className='airdropBg'>
          <div className='w-full h-full bg-[#212134ea] py-10'>
            <div className='text-4xl font-bold text-white text-center'>Airdrops</div>
          </div>
        </div>
        <div className='w-11/12 mx-auto mt-16'>
          <div className='flex flex-col gap-16'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <span className='capitalize font-bold text-2xl'>featured airdrops</span>
                <span>Below are the available featured airdrops on our platform, click on the links and start earning today.</span>
              </div>
              <div className='flex flex-wrap gap-4 justify-center'>
                {new Array(8).fill(0).map((item, i) => (
                  <AirdropDiv key={i} item={item} className='!bg-white sha !border-none !text-black' />
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <span className='capitalize font-bold text-2xl'>solana airdrops</span>
                <span>Below are the available solana airdrops on our platform, click on the links and start earning today.</span>
              </div>
              <div className='flex flex-wrap gap-4 justify-center'>
                {new Array(8).fill(0).map((item, i) => (
                  <AirdropDiv key={i} item={item} className='bg-white sha !border-none !text-black' />
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <span className='capitalize font-bold text-2xl'>deFi airdrops</span>
                <span>Below are the available deFi airdrops on our platform, click on the links and start earning today.</span>
              </div>
              <div className='flex flex-wrap gap-4 justify-center'>
                {new Array(8).fill(0).map((item, i) => (
                  <AirdropDiv key={i} item={item} className='bg-white sha !border-none !text-black' />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default AirdropsPage