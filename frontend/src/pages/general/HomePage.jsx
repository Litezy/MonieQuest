import React, { useEffect, useMemo, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv';
import FormButton from '../../utils/FormButton';
import { Link } from 'react-router-dom';
import { examplefaqs, MoveToTop } from '../../utils/pageUtils';
import { FiPlus, FiMinus } from "react-icons/fi";
import Testimonials from '../../GeneralComponents/Testimonials';
import { Apis, GetApi } from '../../services/API';


const HomePage = () => {
  const [airdrops, setAirdrops] = useState([])
  const [faq, setFaq] = useState('')
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    const FetchAllOpenAirdrops = async () => {
      try {
        const response = await GetApi(Apis.admin.all_open_airdrops)
        if (response.status === 200) {
          setAirdrops(response.msg)
        }

      } catch (error) {
        //
      } finally {
        setDataLoading(false)
      }
    }
    FetchAllOpenAirdrops()
  }, [])

  const deFiAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'deFi');
  }, [airdrops])
  const featuredAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'featured');
  }, [airdrops])
  const newAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'new');
  }, [airdrops])
  const NFTAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'NFT');
  }, [airdrops])
  const potentialAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'potential');
  }, [airdrops])
  const earnCryptoAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'earn_crypto');
  }, [airdrops])


  const handleQuestions = i => {
    if (i !== faq) {
      setFaq(i)
    } else {
      setFaq('')
    }
  }

  return (
    <PageLayout>
      <div className='pb-20 w-full bg-dark'>
        <div className='pageBg overflow-hidden  md:pb-24  md:w-full'>
          <div className='w-full h-full  md:pt-16 pb-10 pt-12 px-4'>
            <div className="w-11/12 mx-auto">
              <div className='md:text-4xl text-3xl capitalize mb-5 font-extrabold text-white text-center lg:w-3/5 w-5/6 mx-auto '><span className='text-lightgreen'>Get paid</span> for participating in Airdrops</div>

              <div className="flex items-center text-lg  font-bold text-white  flex-col gap-2">
                <div className="">Our platform ensures you are always ahead in the crypto space and maximizing your earnings.</div>


                <div className="text-lg">With over <span className='text-lightgreen font-bold '>500 updates</span> available, you could earn up to <span className='text-lightgreen font-bold'>$2,000</span> per month by just participating.</div>

                <div className="text-lg">The simplest and fastest way of making money online.</div>

                <div className="text-lg md:text-xl lg:text-2xl ">Also trade your <span className='text-lightgreen font-bold'>Coins</span> and <span className='text-lightgreen font-bold'>Gift Cards</span> with us today</div>


              </div>
            </div>
          </div>
        </div>
        <div className='w-11/12 mx-auto'>
          <div className='flex flex-col gap-8 mt-6' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
            {dataLoading ?
              <>
                <div className='flex md:gap-32 gap-10 items-center justify-center'>
                  {new Array(2).fill(0).map((_, i) => (
                    <div key={i} className='w-36 h-12 rounded-md bg-slate-400 animate-pulse'></div>
                  ))}
                </div>
                <div className='flex flex-wrap gap-14 justify-center'>
                  {new Array(3).fill(0).map((_, i) => (
                    <div className='flex flex-col gap-2' key={i}>
                      <div className='flex flex-col gap-4'>
                        {new Array(2).fill(0).map((_, i) => (
                          <div key={i} className='w-72 h-40 rounded-md bg-slate-400 animate-pulse'></div>
                        ))}
                      </div>
                      <div className='w-full h-14 rounded-md bg-slate-400 animate-pulse'></div>
                    </div>
                  ))}
                </div>
              </>
              :
              <>
                <div className='flex md:gap-32 gap-10 items-center justify-center'>
                  <Link to='/airdrops' onClick={MoveToTop}>
                    <FormButton title='Browse for Airdrops' className='!text-sm !rounded-md !py-3 !px-4 !w-fit' />
                  </Link>
                  <Link to={`/airdrops?category=potential`} onClick={MoveToTop}>
                    <FormButton title='potential airdrops' className='!text-sm !capitalize !rounded-md !py-3 !px-6 !w-fit' />
                  </Link>
                </div>
                <div className='flex flex-wrap gap-14 justify-center text-gray-200'>
                  {deFiAirdrops.length > 0 &&
                    <div className='flex flex-col gap-2'>
                      <div className='flex flex-col gap-4'>
                        {deFiAirdrops.slice(0, 2).map((item, i) => (
                          <AirdropDiv key={i} item={item} />
                        ))}
                      </div>
                      <Link to='/airdrops/deFi' onClick={MoveToTop}>
                        <FormButton title='show more deFi airdrops' className='!text-sm !capitalize !rounded-md !py-4' />
                      </Link>
                    </div>
                  }
                  {featuredAirdrops.length > 0 &&
                    <div className='flex flex-col gap-2'>
                      <div className='flex flex-col gap-4'>
                        {featuredAirdrops.slice(0, 2).map((item, i) => (
                          <AirdropDiv key={i} item={item} />
                        ))}
                      </div>
                      <Link to='/airdrops/featured' onClick={MoveToTop}>
                        <FormButton title='show more featured airdrops' className='!text-sm !capitalize !rounded-md !py-4' />
                      </Link>
                    </div>
                  }
                  {NFTAirdrops.length > 0 &&
                    <div className='flex flex-col gap-2'>
                      <div className='flex flex-col gap-4'>
                        {NFTAirdrops.slice(0, 2).map((item, i) => (
                          <AirdropDiv key={i} item={item} />
                        ))}
                      </div>
                      <Link to='/airdrops/NFT' onClick={MoveToTop}>
                        <FormButton title='show more NFT airdrops' className='!text-sm !capitalize !rounded-md !py-4' />
                      </Link>
                    </div>
                  }
                  {newAirdrops.length > 0 &&
                    <div className='flex flex-col gap-2'>
                      <div className='flex flex-col gap-4'>
                        {newAirdrops.slice(0, 2).map((item, i) => (
                          <AirdropDiv key={i} item={item} />
                        ))}
                      </div>
                      <Link to='/airdrops/new' onClick={MoveToTop}>
                        <FormButton title='show more new airdrops' className='!text-sm !capitalize !rounded-md !py-4' />
                      </Link>
                    </div>
                  }
                  {potentialAirdrops.length > 0 &&
                    <div className='flex flex-col gap-2'>
                      <div className='flex flex-col gap-4'>
                        {potentialAirdrops.slice(0, 2).map((item, i) => (
                          <AirdropDiv key={i} item={item} />
                        ))}
                      </div>
                      <Link to='/airdrops/potential' onClick={MoveToTop}>
                        <FormButton title='show more potential airdrops' className='!text-sm !capitalize !rounded-md !py-4' />
                      </Link>
                    </div>
                  }
                  {earnCryptoAirdrops.length > 0 &&
                    <div className='flex flex-col gap-2'>
                      <div className='flex flex-col gap-4'>
                        {earnCryptoAirdrops.slice(0, 2).map((item, i) => (
                          <AirdropDiv key={i} item={item} />
                        ))}
                      </div>
                      <Link to='/airdrops/earn_crypto' onClick={MoveToTop}>
                        <FormButton title='show more earn crypto airdrops' className='!text-sm !capitalize !rounded-md !py-4' />
                      </Link>
                    </div>
                  }
                  <div className='max-w-[18rem] h-fit bg-primary p-4'>
                    <div className='font-bold text-center'>How it works for Airdrop Farmers</div>
                    <div className='flex flex-col gap-4 mt-6 pb-4'>
                      <div className='flex flex-col gap-2'>
                        <div className='text-lightgreen uppercase'>1. <span className='pl-1'>browse airdrops</span></div>
                        <div className='text-sm pl-5'>Use advanced filters to easily search through airdrop opportunities and find ones that match your interests and which blockchain you prefer to farm on.</div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='text-lightgreen uppercase'>2. <span className='pl-1'>select and participate</span></div>
                        <div className='text-sm pl-5'>Choose a crypto airdrop campaign on your preferred blockchain, follow the step-by-step guide provided, and start participating right away.</div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='text-lightgreen uppercase'>3. <span className='pl-1'>stay updated</span></div>
                        <div className='text-sm pl-5'>Enable notifications to receive real-time alerts about the latest airdrops, TGE’S, and airdrop eligibility checks, ensuring you never out on free crypto tokens</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
          <div className='mt-20 h-fit w-full bg-primary text-white py-10 px-4 flex flex-col gap-8 justify-center items-center' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
            <div className='relative w-fit'>
              <div className='md:text-5xl text-3xl font-bold capitalize py-2'>exchange</div>
              <div className='border-t-4 border-zinc-300 md:w-36 w-24 absolute top-0 left-0'></div>
              <div className='border-b-4 border-zinc-300 md:w-36 w-24 absolute bottom-0 right-0'></div>
            </div>
            <div className='text-center md:text-lg telg max-w-2xl mx-auto'>Easily Buy & Sell Gift Cards and Crypto instantly using bank transfers. <span className='text-lightgreen'>Simple, fast and reliable.</span></div>
            <Link to='/login'>
              <FormButton title='Tap and Trade' className='!w-fit !px-10 !rounded-md' onClick={MoveToTop} />
            </Link>
          </div>
          <div className='flex flex-col gap-10 mt-20'>
            <div className='relative w-fit mx-auto text-white'>
              <div className='md:text-5xl text-3xl font-bold capitalize py-2'>fAQ</div>
              <div className='border-t-4 border-zinc-500 md:w-16 w-10 absolute top-0 right-0'></div>
              <div className='border-b-4 border-zinc-500 md:w-16 w-10 absolute -bottom-2 left-0'></div>
            </div>
            <div className='h-fit w-full md:px-20 xl:px-28 px-6 pt-10 pb-10 bg-gradient-to-tr from-primary from-10% to-secondary  text-white' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
              <div className='text-center md:text-4xl text-2xl font-bold  capitalize'>Trade, upload and earn with us</div>
              <div className='text-center text-semi-white md:text-lg text-sm font-semibold md:w-3/4 mx-auto mt-4'>Below are some of the frequently asked questions on our platform, if you have any more questions, kindly goto view more to see all <Link to={`/faqs`} className='text-lightgreen'>FAQS</Link></div>
              <div className='flex flex-col md:gap-10 gap-7 mt-10'>
                {examplefaqs.map((item, i) => (
                  <div className={`w-full h-fit flex flex-col gap-4`} key={i}>
                    <div onClick={() => handleQuestions(i)} className='flex justify-between gap-4 items-center w-full h-fit cursor-pointer md:text-2xl text-lg font-bold'>
                      <span className='text-zinc-400'>{item.title}</span>
                      <div className='md:text-2xl text-lg text-lightgreen'>{faq !== i ? <FiPlus /> : <FiMinus />}</div>
                    </div>
                    <div className={`md:text-base text-sm border-b pb-2 ${faq === i ? 'block' : 'hidden'}`}>{item.desc}</div>
                  </div>
                ))
                }

              </div>
              <div className="w-full ml-auto mt-10">
                <Link to={`/faqs`} onClick={MoveToTop} className='w-fit px-4 py-2 rounded-xl bg-ash '>view more</Link>
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