import React, { useEffect, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import img1 from '../../assets/images/blog1.jpg'
import img2 from '../../assets/images/blog2.jpg'


const Blogs = () => {

    

    return (
        <PageLayout>
            <div className='pb-20 bg-dark w-full text-gray-200'>
                <div className='pageBg'>
                    <div className='w-full h-full bg-[#212134ea] py-10'>
                        <div className='text-4xl font-bold text-white text-center'>Crypto Blog News</div>
                    </div>
                </div>
                <div className=""></div>
            </div >
        </PageLayout >
    )
}

export default Blogs