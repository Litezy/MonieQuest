import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv';
import FormButton from '../../utils/FormButton';
import { Link } from 'react-router-dom';
import { MoveToTop } from '../../utils/pageUtils';
import { FiPlus, FiMinus } from "react-icons/fi";
import Testimonials from '../../GeneralComponents/Testimonials';



const HomePage = () => {
  const [faq, setFaq] = useState('')

  const handleQuestions = i => {
    if (i !== faq) {
      setFaq(i)
    } else {
      setFaq('')
    }
  }

  return (
    <PageLayout>
      <div className='pb-20  bg-dark'>
        <div className='homeBg overflow-hidden' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
          <div className='w-full h-full bg-[#212134ea] md:pt-16 pb-10 pt-12'>
            <div className='md:text-5xl text-3xl font-extrabold text-white text-center lg:w-3/5 w-5/6 mx-auto '><span className='text-lightgreen'>Get paid</span> for testing apps, games and surveys</div>
            <div className='flex md:flex-row flex-col gap-4 items-center mt-8 justify-center text-sm text-gray-100 text-center'>
              <div>Earn up to <span className='font-bold text-white'>$40.32</span> per offer</div>
              <div className='flex gap-2 items-center'>
                <div className='h-2.5 w-2.5 rounded-full bg-lightgreen'></div>
                <div><span className='font-bold text-white'>537</span> available offers now</div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-11/12 mx-auto'>
          <div className='md:w-11/12 w-full mx-auto'>
            <div className='w-full h-fit bg-secondary mt-1 p-4 text-gray-200 overflow-hidden' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
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
          <div className='mt-20 w-full h-fit bg-[#F4F4F5] text-black py-10 px-4 flex flex-col gap-8 justify-center items-center' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
            <div className='relative w-fit'>
              <div className='md:text-5xl text-3xl font-bold capitalize py-2'>exchange crypto</div>
              <div className='border-t-4 border-zinc-700 md:w-56 w-36 absolute top-0 left-0'></div>
              <div className='border-b-4 border-zinc-700 md:w-56 w-36 absolute bottom-0 right-0'></div>
            </div>
            <div className='text-center text-lg md:w-3/5 mx-auto'>Join over 100K people on the most popular peer to peer platform. Buy and sell cryptocurrency today with bank transfers.</div>
            <Link to='/login'>
              <FormButton title='Trade Crypto' className='!w-fit !px-10 !rounded-md' />
            </Link>
          </div>
          <div className='flex flex-col gap-10 mt-20'>
            <div className='relative w-fit mx-auto text-white'>
              <div className='md:text-5xl text-3xl font-bold capitalize py-2'>faq questions</div>
              <div className='border-t-4 border-zinc-500 md:w-48 w-32 absolute top-0 right-0'></div>
              <div className='border-b-4 border-zinc-500 md:w-48 w-32 absolute -bottom-2 left-0'></div>
            </div>
            <div className='h-fit w-full md:px-20 xl:px-28 px-6 pt-10 pb-16 bg-gradient-to-tr from-primary from-50% to-[#33335a] text-white' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
              <div className='text-center md:text-4xl text-2xl font-bold  capitalize'>Trade, create and earn with us</div>
              <div className='text-center text-semi-white md:text-base text-sm font-semibold md:w-3/4 mx-auto mt-4'>Below are some of the frequently asked questions on our platform, if you have any more questions, kindly contact us via support.</div>
              <div className='flex flex-col md:gap-10 gap-7 mt-10'>
                {new Array(6).fill(0).map((item, i) => (
                  <div className={`w-full h-fit flex flex-col gap-4`} key={i}>
                    <div onClick={() => handleQuestions(i)} className='flex justify-between gap-4 items-center w-full h-fit cursor-pointer md:text-2xl text-lg font-bold'>
                      <span>Lorem ipsum dolor sit, amet consectetur adip</span>
                      <div className='md:text-2xl text-lg'>{faq !== i ? <FiPlus /> : <FiMinus />}</div>
                    </div>
                    <div className={`md:text-base text-sm border-b pb-2 ${faq === i ? 'block' : 'hidden'}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab dicta aliquid maxime placeat ullam autem non facere harum quas, aliquam sint voluptatem quasi adipis.</div>
                  </div>
                ))
                }
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-10 mt-20'>
            <div className='relative w-fit mx-auto'>
              <div className='md:text-5xl text-3xl font-bold capitalize py-2 text-white'>testimonials</div>
              <div className='border-t-4 border-zinc-500 md:w-44 w-28 absolute top-0 left-0'></div>
              <div className='border-b-4 border-zinc-500 md:w-44 w-28 absolute bottom-0 right-0'></div>
            </div>
            <Testimonials />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default HomePage