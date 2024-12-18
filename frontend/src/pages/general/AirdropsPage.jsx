import React from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv'

const AirdropsPage = () => {
  return (
    <PageLayout>
      <div className='w-11/12 mx-auto pb-20 pt-10 '>
        <div className='text-5xl font-bold'>Airdrops</div>
        <div className='flex flex-col gap-16 mt-8'>
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
    </PageLayout>
  )
}

export default AirdropsPage