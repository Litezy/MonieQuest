import React, { useEffect, useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import FormInput from '../../utils/FormInput';
import BlogsLayout from '../../AdminComponents/BlogsLayout';
import BlogComp from '../../AdminComponents/BlogComp';

const records = [
    {
        id: 1,
        gen_id: '123456789',
        title: 'blum launches memepad for memecoin trading',
        feature: 'trading',
        main_header: '',
        first_paragraph: '',
        second_paragraph: '',
        extras: '',
        conclusion: ''
    },
    {
        id: 2,
        gen_id: '123456789',
        title: 'how to check your wallet gift card balance',
        feature: 'trading',
        main_header: '',
        first_paragraph: '',
        second_paragraph: '',
        extras: '',
        conclusion: ''
    },
    {
        id: 2,
        gen_id: '123456789',
        title: 'how to earn $500 every week with your just your mobile phone and internet',
        feature: 'personal finance',
        main_header: '',
        first_paragraph: '',
        second_paragraph: '',
        extras: '',
        conclusion: ''
    },
]

const AdminAllBlogs = () => {
    const tags = ['all', 'airdrop', 'trading', 'personal finance']
    const [active, setActive] = useState(tags[0])
    const [search, setSearch] = useState('')
    const [dataLoading, setDataLoading] = useState(true)
    const [staticData, setStaticData] = useState([])
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        setStaticData(records)
        setBlogs(records);
    }, []);

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)

    const airdropBlogs = useMemo(() => {
        return blogs.filter((ele) => ele.feature === 'airdrop');
    }, [blogs])
    const tradingBlogs = useMemo(() => {
        return blogs.filter((ele) => ele.feature === 'trading');
    }, [blogs])
    const financeBlogs = useMemo(() => {
        return blogs.filter((ele) => ele.feature === 'personal finance');
    }, [blogs])

    const filterBlogs = () => {
        const mainData = staticData
        if (search.length > 1) {
            const filtered = mainData.filter(item => String(item.title).toLowerCase().startsWith(search.toLocaleLowerCase()) || String(item.gen_id).toLowerCase().startsWith(search.toLocaleLowerCase()))
            setBlogs(filtered)
        } else {
            setBlogs(mainData)
        }
    }

    return (
        <BlogsLayout>
            <div className='w-11/12 mx-auto'>
                <div className="w-full lg:w-2/3 mx-auto relative">
                    <FormInput placeholder='Search by title and ID' value={search} onChange={(e) => setSearch(e.target.value)} className="!rounded-lg" onKeyUp={filterBlogs} />
                    <div className="absolute top-5 right-3">
                        <CiSearch className='text-xl cursor-pointer text-white' />
                    </div>
                </div>
                <div className="grid md:grid-cols-6 grid-cols-1 gap-2 items-center mt-4">
                    <div className="text-zinc-300 font-semibold capitalize text-sm lg:text-base col-span-1">Sort blogs by:</div>
                    <div className='md:col-span-5 col-span-1'>
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 items-center lg:w-11/12 w-full mx-auto">
                            {tags.map((tag, i) => {
                                return (
                                    <div key={i} onClick={() => setActive(tag)}
                                        className={`w-full h-fit py-1 text-sm md:text-base flex items-center justify-center text-center rounded-md capitalize ${active === tag ? 'bg-ash' : 'bg-primary hover:bg-primary/50'} cursor-pointer`}>{tag}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    {dataLoading ?
                        <div className='w-full h-fit'>
                            <div className='h-11 bg-slate-600 animate-pulse rounded-t-lg'></div>
                            <div className='md:h-24 h-40 bg-slate-500 animate-pulse rounded-b-lg'></div>
                        </div>
                        :
                        <>
                            {blogs.length > 0 ?
                                <>
                                    <div className='flex flex-col gap-4'>
                                        {active === 'all' &&
                                            <>
                                                {blogs.map((item, i) => (
                                                    <BlogComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'airdrop' &&
                                            <>
                                                {airdropBlogs.length > 0 ?
                                                    <>
                                                        {airdropBlogs.map((item, i) => (
                                                            <BlogComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                        {active === 'trading' &&
                                            <>
                                                {tradingBlogs.length > 0 ?
                                                    <>
                                                        {tradingBlogs.map((item, i) => (
                                                            <BlogComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                        {active === 'personal finance' &&
                                            <>
                                                {financeBlogs.length > 0 ?
                                                    <>
                                                        {financeBlogs.map((item, i) => (
                                                            <BlogComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                    </div>
                                </>
                                :
                                <div className="w-full text-gray-400 text-center">No record found...</div>
                            }
                        </>
                    }
                </div>
            </div>
        </BlogsLayout>
    )
}

export default AdminAllBlogs