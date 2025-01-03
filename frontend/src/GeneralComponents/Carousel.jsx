import React from 'react'
import { Carousel, theme } from "flowbite-react";


const CarouselComponent = ({ singleProductImages, setTrack }) => {

    return (
        <div className="md:h-80 h-56 w-full">
            <Carousel slide={false} indicators={false} onSlideChange={(i) => setTrack(i)}>
                {singleProductImages.map((item, i) => (
                    <img src={item} alt={item} key={i} className='w-full h-full object-cover' />
                ))}
            </Carousel>
        </div>
    )
}

export default CarouselComponent