import React, { useEffect } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { useParams} from 'react-router-dom'
import { GiArrowScope } from 'react-icons/gi'
import BlogDiv from '../../GeneralComponents/BlogDiv'
import { MoveToTop } from '../../utils/pageUtils'

const SingleFeatureBlog = () => {
    const { feature } = useParams()
    useEffect(()=>{
        MoveToTop()
    })
    return (
        <PageLayout>
            <div className="bg-dark py-1 w-full text-white">
                <div className="w-11/12 mx-auto">
                    <div className="w-11/12 mx-auto my-10 poppins">
                        <div className="flex items-center gap-5 w-11/12 lg:w-1/2 ">
                            <div className="text-xl"><GiArrowScope /></div>
                            <div className="text-lg capitalize">Latest articles on {feature === 'personal_finance' ?"Personal Finance":feature}</div>
                        </div>
                        <div className="mt-3 w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                            {new Array(6).fill(0).map((item, i) => {
                                const isEven = i % 2 === 0
                                return (
                                    <BlogDiv feat={feature} key={i} item={item} i={i} isEven={isEven} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default SingleFeatureBlog