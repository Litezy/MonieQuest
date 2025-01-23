import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv'

const CategoryAirdropsPage = () => {
    const { category } = useParams()
    const [categoryAirdrops, setCategoryAirdrops] = useState([])
    const [dataLoading, setDataLoading] = useState(true)

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)


    return (
        <PageLayout>
            <div className='w-full bg-dark py-20'>
                <div className='w-11/12 mx-auto text-gray-200'>
                    {dataLoading ?
                        <div className='flex flex-col gap-6'>
                            <div className='w-64 h-4 rounded-full bg-slate-400 animate-pulse'></div>
                            <div className='flex flex-wrap gap-4'>
                                {new Array(4).fill(0).map((_, i) => (
                                    <div className='w-72 h-40 rounded-md bg-slate-400 animate-pulse' key={i}></div>
                                ))}
                            </div>
                        </div>
                        :
                        <div className='flex flex-col gap-6'>
                            <div className='text-2xl font-bold capitalize'>{category === 'others' ? 'More ways to earn crypto' : `All ${category} airdrops`}</div>
                            <div className='flex flex-wrap gap-4'>
                                {new Array(12).fill(0).map((item, i) => (
                                    <AirdropDiv key={i} item={item} />
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default CategoryAirdropsPage