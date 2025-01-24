"use client";
import React from 'react'
import testimg from '../assets/images/contact_photo.jpg'
import testimg2 from '../assets/images/testimg.webp'
import testimg3 from '../assets/images/airdrop_banner.jfif'
import { Carousel } from "flowbite-react";

const theme = {
    "control": {
    "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
  },
    "scrollContainer": {
    "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
  }
  }


const CarouselComp = () => {
    return (
        <div className="w-full h-full">
            <Carousel theme={theme}>
                <img src={testimg} alt="..." className='w-full h-full object-cover' />
                <img src={testimg2} alt="..." className='w-full h-full object-cover'/>
                <img src={testimg3} alt="..." className='w-full h-full object-cover'/>
            </Carousel>
        </div>
    )
}

export default CarouselComp