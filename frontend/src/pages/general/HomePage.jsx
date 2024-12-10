import React from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv';
import FormButton from '../../utils/FormButton';
import { Link } from 'react-router-dom';
import { MoveToTop } from '../../utils/pageUtils';


const HomePage = () => {
  return (
    <PageLayout>
      <div className='py-20 relative'>
        <div className='homeBg overflow-hidden'>
          <div className='w-full h-full bg-[#212134ea] md:pt-16 pb-10 pt-12'>
            <div className='md:text-5xl text-3xl font-extrabold text-white text-center lg:w-3/5 w-5/6 mx-auto '><span className='text-lightgreen'>Get paid</span> for testing apps, games and surveys</div>
            <div className='flex md:flex-row flex-col gap-4 items-center mt-8 justify-center text-sm md:text-base text-gray-100 text-center'>
              <div>Earn up to <span className='font-bold text-white'>$40.32</span> per offer</div>
              <div className='flex gap-2 items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-lightgreen'></div>
                <div><span className='font-bold text-white'>537</span> available offers now</div>
              </div>
            </div>
          </div>
        </div>
        <div className='xl:w-4/5 w-11/12 mx-auto'>
          <div className='w-full h-fit bg-secondary mt-1 p-4 text-gray-200 overflow-hidden'>
            <div className='flex flex-wrap gap-9 items-center justify-center'>
              <div className='flex flex-col gap-2'>
                <div className='capitalize font-medium'>featured airdrops</div>
                <div className='flex gap-2'>
                  <div className='flex flex-col gap-4'>
                    {new Array(4).fill(0).map((item, i) => (
                      <AirdropDiv key={i} item={item} />
                    ))}
                  </div>
                  <div className='w-1.5 h-[27rem] bg-ash rounded-full'></div>
                </div>
                <Link to='/airdrops' onClick={MoveToTop}>
                  <FormButton title='show more featured airdrops' className='!text-sm !capitalize !font-bold !rounded-md !py-5' />
                </Link>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='capitalize font-medium'>solana airdrops</div>
                <div className='flex gap-2'>
                  <div className='flex flex-col gap-4'>
                    {new Array(4).fill(0).map((item, i) => (
                      <AirdropDiv key={i} item={item} />
                    ))}
                  </div>
                  <div className='w-1.5 h-[27rem] bg-ash rounded-full'></div>
                </div>
                <Link to='/airdrops' onClick={MoveToTop}>
                  <FormButton title='show more solana airdrops' className='!text-sm !capitalize !font-bold !rounded-md !py-5' />
                </Link>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='capitalize font-medium'>deFi airdrops</div>
                <div className='flex gap-2'>
                  <div className='flex flex-col gap-4'>
                    {new Array(4).fill(0).map((item, i) => (
                      <AirdropDiv key={i} item={item} />
                    ))}
                  </div>
                  <div className='w-1.5 h-[27rem] bg-ash rounded-full'></div>
                </div>
                <Link to='/airdrops' onClick={MoveToTop}>
                  <FormButton title='show more deFi airdrops' className='!text-sm !capitalize !font-bold !rounded-md !py-5' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default HomePage