import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { useParams } from 'react-router-dom'
import { FaXTwitter } from 'react-icons/fa6'
import { SiTelegram } from 'react-icons/si'
import { LuArrowRightLeft } from 'react-icons/lu'
import testimg from '../../assets/images/testimg.webp'

const SingleAirdropPage = () => {
  const { id } = useParams()
  const [singleAirdrop, setSingleAirdrop] = useState({})

  return (
    <PageLayout>
      <div className='w-full bg-dark py-20'>
        <div className='md:w-5/6 w-11/12 mx-auto text-gray-200'>
          <div className='flex flex-col gap-14'>
            <div className='flex lg:flex-row lg:justify-between flex-col gap-4'>
              <span className='capitalize md:text-4xl text-3xl font-bold'>ape express</span>
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
                <p className='pt-4'>The Airdrop Campaign offers 200,000,000 $CAML tokens, worth $500,000 USDT. By completing simple tasks, participants unlock rewards, explore MiRA’s Web3 ecosystem, and experience the future of metaphysical services</p>
                <p className='pt-4'>Ape express uses blockchain and advanced AI to bring transparency and personalization to metaphysical consulting. It modernizes practices like Feng Shui and astrology, bridging ancient wisdom with cutting-edge technology for a secure and transformative experience.</p>
              </div>
              <div className='lg:col-span-2 col-span-1'>
                <img alt={singleAirdrop.image} src={testimg} className='w-full h-auto'></img>
              </div>
            </div>
            <div className='grid lg:grid-cols-6 grid-cols-1 gap-8'>
              <div className='lg:col-span-2 col-span-1'>
                <div className='grid lg:grid-cols-2 grid-cols-4 md:gap-4 gap-1.5'>
                  <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                    <span className='md:text-lg text-sm font-bold text-center capitalize'>$500,000</span>
                    <span className='text-gray-400 md:text-base text-xs text-center'>Aprrox. value</span>
                  </div>
                  <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                    <span className='md:text-lg text-sm font-bold text-center capitalize'>200 million</span>
                    <span className='text-gray-400 md:text-base text-xs text-center'>$CAML</span>
                  </div>
                  <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                    <span className='md:text-lg text-sm font-bold text-center capitalize'>binance</span>
                    <span className='text-gray-400 md:text-base text-xs text-center'>Blockchain</span>
                  </div>
                  <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                    <span className='md:text-lg text-sm font-bold text-center capitalize'>8</span>
                    <span className='text-gray-400 md:text-base text-xs text-center'>days left</span>
                  </div>
                </div>
              </div>
              <div className='lg:col-span-4 col-span-1'>
                <div className='w-full h-fit border border-ash bg-secondary rounded-md py-10 px-4'>
                  <div className='text-xl font-bold'>Step by step guide <span className='capitalize'>ape express</span> Airdrop</div>
                  <div className='flex flex-col gap-4 mt-8'>
                    <div className='flex md:gap-8 gap-4 items-center md:px-8 px-4 py-3 hover:bg-primary hover:rounded-md'>
                      <span className='text-lg font-bold'>1</span>
                      <span className='text-sm'>Launch the <span className='text-lightgreen capitalize'>ape express</span> GameBot on Telegram and click “Play Ape.</span>
                    </div>
                    <div className='flex md:gap-8 gap-4 items-center md:px-8 px-4 py-3 hover:bg-primary hover:rounded-md'>
                      <span className='text-lg font-bold'>2</span>
                      <span className='text-sm'>Click the USDT icon in the top-right corner and copy your BSC address.</span>
                    </div>
                    <div className='flex md:gap-8 gap-4 items-center md:px-8 px-4 py-3 hover:bg-primary hover:rounded-md'>
                      <span className='text-lg font-bold'>3</span>
                      <span className='text-sm'>Go to the Ape Express Airdrop page, paste your BSC address, and click “Confirm”.</span>
                    </div>
                    <div className='flex md:gap-8 gap-4 items-center md:px-8 px-4 py-3 hover:bg-primary hover:rounded-md'>
                      <span className='text-lg font-bold'>4</span>
                      <span className='text-sm'>Complete tasks like following <span className='text-lightgreen'>@APE__WEB3</span> on X, logging in daily, and engaging in Team Blessings via the “Room” page to maximize your rewards.</span>
                    </div>
                  </div>
                  <div className='pt-12 text-sm'>
                    <span className='font-bold'>* Note:</span> Earn higher rewards by inviting friends and maintaining daily logins. Embrace <span className='capitalize'>ape express's</span> journey!
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-secondary border border-ash rounded-md w-full h-fit p-4 text-sm italic'>
              <p><span className='font-bold'>Disclaimer:</span> All content & airdrop guides are for educational and informational purposes only. It is not financial advice or endorsement for the projects and airdrops. Conduct thorough research before making any deposits or investment decisions (Do Your Own Research). Farming airdrops comes with a set of risks, so make sure your knowledge about online security is up to date.</p>
              <p className='pt-4'>At MonieQuest we vet the projects with all the public available information, to make sure all our published crypto airdrops display the correct details.</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default SingleAirdropPage