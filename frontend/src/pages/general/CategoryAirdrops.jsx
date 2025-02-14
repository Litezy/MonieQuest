import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv'
import { Apis, GetApi } from '../../services/API'

const CategoryAirdropsPage = () => {
    const { category } = useParams()
    const [categoryAirdrops, setCategoryAirdrops] = useState([])
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        const FetchCategoryAirdrops = async () => {
            try {
                const response = await GetApi(`${Apis.admin.category_airdrops}/${category}`)
                if (response.status === 200) {
                    setCategoryAirdrops(response.msg)
                }

            } catch (error) {
                //
            } finally {
                setDataLoading(false)
            }
        }
        FetchCategoryAirdrops()
    }, [])


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
                            <div className='text-2xl font-bold capitalize'>{category === 'earn_crypto' ? 'all earn crypto' : `all ${category} airdrops`}</div>
                            {categoryAirdrops.length > 0 ?
                                <div className='flex flex-wrap gap-4'>
                                    {categoryAirdrops.map((item, i) => (
                                        <AirdropDiv key={i} item={item} />
                                    ))}
                                </div>
                                :
                                <div>No results found...</div>
                            }
                        </div>
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default CategoryAirdropsPage