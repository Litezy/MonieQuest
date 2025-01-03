import React from 'react'
import { Carousel } from "flowbite-react";

const custom = {
    "control": {
        "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    },
    "scrollContainer": {
        "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
    }
}

const CarouselComponent = ({ singleProductImages, setTrack }) => {

    return (
        <div className="md:h-80 h-56 w-full">
            <Carousel slide={false} indicators={false} onSlideChange={(i) => setTrack(i)} theme={custom}>
                {singleProductImages.map((item, i) => (
                    <img src={item} alt={item} key={i} className='w-full h-full object-cover' />
                ))}
            </Carousel>
        </div>
    )
}

export default CarouselComponent