import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { useParams } from 'react-router-dom'
import { FaXTwitter } from 'react-icons/fa6'
import { SiTelegram } from 'react-icons/si'
import { LuArrowRightLeft } from 'react-icons/lu'
import testimg from '../../assets/images/testimg.webp'
import airdropLogo from '../../assets/images/testimage.jfif'

const SingleAirdropPage = () => {
  const { id } = useParams()
  const [singleAirdrop, setSingleAirdrop] = useState({})
  const [dataLoading, setDataLoading] = useState(true)

  setTimeout(() => {
    setDataLoading(false)
  }, 2000)


  return (
    <PageLayout>
      <div className='w-full bg-dark py-20'>
        <div className='md:w-5/6 w-11/12 mx-auto text-gray-200'>
          {dataLoading ?
            <div className='flex flex-col gap-14'>
              <div className='flex lg:flex-row lg:justify-between flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-12 h-12 rounded-full bg-slate-400 animate-pulse'></div>
                  <div className='w-56 h-5 rounded-full bg-slate-400 animate-pulse'></div>
                </div>
                <div className='flex lg:flex-row lg:gap-40 flex-col gap-8 ml-auto'>
                  <div className='flex items-center gap-2 justify-end'>
                    {new Array(3).fill(0).map((_, i) => (
                      <div key={i} className='w-7 h-7 rounded-full bg-slate-400 animate-pulse'></div>
                    ))}
                  </div>
                  <div className='flex gap-3 items-center'>
                    {new Array(2).fill(0).map((_, i) => (
                      <div key={i} className='w-24 h-9 rounded-[4px] bg-slate-400 animate-pulse'></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='grid lg:grid-cols-5 grid-cols-1 gap-8'>
                <div className='lg:col-span-3 col-span-1 flex flex-col gap-4'>
                  <div>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-full h-1 rounded-full bg-slate-400 animate-pulse mt-2'></div>
                    ))}
                  </div>
                  <div>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-full h-1 rounded-full bg-slate-400 animate-pulse mt-2'></div>
                    ))}
                  </div>
                </div>
                <div className='lg:col-span-2 col-span-1 w-full h-52 bg-slate-400 animate-pulse'></div>
              </div>
              <div className='grid lg:grid-cols-6 grid-cols-1 gap-8'>
                <div className='lg:col-span-2 col-span-1'>
                  <div className='grid grid-cols-2 gap-4'>
                    {new Array(2).fill(0).map((_, i) => (
                      <div key={i} className='w-full h-24 rounded-md bg-slate-400 animate-pulse'></div>
                    ))}
                  </div>
                </div>
                <div className='lg:col-span-4 col-span-1 w-full h-96 bg-slate-400 animate-pulse rounded-md'></div>
              </div>
              <div className='w-full h-32 bg-slate-400 animate-pulse rounded-md'></div>
            </div>
            :
            <div className='flex flex-col gap-14'>
              <div className='flex lg:flex-row lg:justify-between flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <div>
                    <img alt={singleAirdrop.logo} src={airdropLogo} className='w-14 h-14 rounded-full object-cover'></img>
                  </div>
                  <div className='capitalize md:text-4xl text-3xl font-bold'>ape express</div>
                </div>
                <div className='flex lg:flex-row lg:gap-40 flex-col gap-8 ml-auto'>
                  <div className='flex items-center gap-2 justify-end'>
                    <a href='' className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-sm hover:border-lightgreen hover:bg-lightgreen hover:text-black flex items-center justify-center'>
                      <FaXTwitter />
                    </a>
                    <a href='' className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-sm hover:border-lightgreen hover:bg-lightgreen hover:text-black flex items-center justify-center'>
                      <SiTelegram />
                    </a>
                    <a href='' className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-sm hover:border-lightgreen hover:bg-lightgreen hover:text-black flex items-center justify-center'>
                      <LuArrowRightLeft />
                    </a>
                  </div>
                  <div className='flex gap-3 items-center'>
                    <button className='outline-none bg-primary rounded-[4px] py-2 px-6 text-sm text-lightgreen font-semibold capitalize cursor-default'>featured</button>
                    <button className='outline-none bg-lightgreen rounded-[4px] py-2 px-6 text-sm text-primary font-bold capitalize cursor-default'>active</button>
                  </div>
                </div>
              </div>
              <div className='grid lg:grid-cols-5 grid-cols-1 gap-8'>
                <div className='lg:col-span-3 col-span-1'>
                  <p>Ape express blends ancient traditions with cutting-edge blockchain technology, creating a seamless platform of trust and innovation. With AI-driven insights and decentralized solutions, it transforms spiritual guidance into an advanced digital experience.</p>
                  <p className='pt-4'>Ape express uses blockchain and advanced AI to bring transparency and personalization to metaphysical consulting. It modernizes practices like Feng Shui and astrology, bridging ancient wisdom with cutting-edge technology for a secure and transformative experience.</p>
                </div>
                <div className='lg:col-span-2 col-span-1'>
                  <img alt={singleAirdrop.image} src={testimg} className='w-full h-auto'></img>
                </div>
              </div>
              <div className='grid lg:grid-cols-6 grid-cols-1 gap-8'>
                <div className='lg:col-span-2 col-span-1'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                      <span className='md:text-lg text-sm font-bold text-center capitalize'>binance</span>
                      <span className='text-gray-400 md:text-base text-xs text-center'>Blockchain</span>
                    </div>
                    <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                      <span className='md:text-lg text-sm font-bold text-center capitalize'>active</span>
                      <span className='text-gray-400 md:text-base text-xs text-center'>Mining</span>
                    </div>
                  </div>
                </div>
                <div className='lg:col-span-4 col-span-1'>
                  <div className='w-full h-fit border border-ash bg-secondary rounded-md py-10 px-4'>
                    <div className='text-xl font-bold'>Step by step guide on <span className='capitalize'>ape express</span> Airdrop</div>
                    <div className='flex flex-col gap-4 mt-8'>
                      <div className='flex md:gap-8 gap-4 items-center md:px-8 px-4 py-3 hover:bg-primary hover:rounded-md'>
                        <span className='text-lg font-bold'>1</span>
                        <span className='text-sm'>Launch the <a href='' className='text-lightgreen capitalize'>ape express</a> GameBot on Telegram and click “Play Ape.</span>
                      </div>
                      <div className='flex md:gap-8 gap-4 items-center md:px-8 px-4 py-3 hover:bg-primary hover:rounded-md'>
                        <span className='text-lg font-bold'>2</span>
                        <span className='text-sm'>Go to the Ape Express Airdrop page, paste your BSC address, and click “Confirm”.</span>
                      </div>
                      <div className='flex md:gap-8 gap-4 items-center md:px-8 px-4 py-3 hover:bg-primary hover:rounded-md'>
                        <span className='text-lg font-bold'>3</span>
                        <span className='text-sm'>Complete tasks like following <a href='' className='text-lightgreen'>@APE__WEB3</a> on X, logging in daily, and engaging in Team Blessings via the “Room” page to maximize your rewards.</span>
                      </div>
                    </div>
                    <div className='pt-10 text-sm'>
                      <span className='capitalize'>referral link: </span><a href='https://app.gradient.network/signup?code=DXD99K' className='text-lightgreen'>https://app.gradient.network/signup?code=DXD99K</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-secondary border border-ash rounded-md w-full h-fit p-4 text-sm italic'>
                <p><span className='font-bold'>Disclaimer:</span> All content & airdrop guides are for educational and informational purposes only. It is not financial advice or endorsement for the projects and airdrops. Conduct thorough research before making any deposits or investment decisions (Do Your Own Research). Farming airdrops comes with a set of risks, so make sure your knowledge about online security is up to date.</p>
                <p className='pt-4'>At MonieQuest we vet the projects with all the public available information, to make sure all our published crypto airdrops display the correct details.</p>
              </div>
            </div>
          }
        </div>
      </div>
    </PageLayout>
  )
}

export default SingleAirdropPage