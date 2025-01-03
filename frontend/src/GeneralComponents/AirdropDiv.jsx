import React from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import { LuArrowRightLeft } from 'react-icons/lu'
import { SiTelegram } from 'react-icons/si'
import testImage from '../assets/images/testimage.jfif'
import { Link } from 'react-router-dom'
import { MoveToTop } from '../utils/pageUtils'

const AirdropDiv = ({ item }) => {
    return (
        <Link to='/airdrops/1' onClick={MoveToTop} className='h-fit w-fit bg-primary border hover:border-bg-green border-ash rounded-md p-4 flex flex-col gap-4 text-white'>
            <div className='flex items-center gap-2'>
                <img alt='airdrop logo' src={testImage} className='w-14 h-14 rounded-full object-cover'></img>
                <div className='flex flex-col gap-1'>
                    <div className='capitalize text-lg font-bold'>ape express</div>
                    <div className='flex items-center gap-2'>
                        <div href='/' className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-xs flex items-center justify-center'>
                            <FaXTwitter />
                        </div>
                        <div href='' className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-xs flex items-center justify-center'>
                            <SiTelegram />
                        </div>
                        <div href='' className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-xs flex items-center justify-center'>
                            <LuArrowRightLeft />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-12 pb-2'>
                <div className='flex flex-col gap-2 items-center capitalize text-[0.8rem]'>
                    <div className='font-bold'>play to earn</div>
                    <div className='text-xs'>$PRO airdrop</div>
                </div>
                <div className='flex flex-col gap-2 items-center capitalize text-[0.8rem]'>
                    <div className='font-bold'>web3 gaming studio</div>
                    <div className='text-xs'>p'wrd by TON blockchain</div>
                </div>
            </div>
        </Link>
    )
}

export default AirdropDiv