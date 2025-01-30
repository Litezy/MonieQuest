import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import FormInput from '../../utils/FormInput';
import AirdropsLayout from '../../AdminComponents/AirdropsLayout';
import AdminAirdropComp from '../../AdminComponents/AdminAirdropComp';

const records = [
    {
        id: 1,
        gen_id: '123456789',
        title: 'ape express',
        category: 'featured',
        referral_link: 'https://app.gradient.network',
        twiter_link: 'https://x.com/i/flow/login?lang=en&mx=2',
        telegram_link: 'https://web.telegram.org/a/',
        website_link: 'https://app.gradient.network',
        blockchain: 'binance',
        status: 'active'
    },
    {
        id: 2,
        gen_id: '123456789',
        title: 'blum',
        category: 'deFi',
        referral_link: 'https://app.gradient.network',
        twiter_link: 'https://x.com/i/flow/login?lang=en&mx=2',
        telegram_link: 'https://web.telegram.org/a/',
        website_link: 'https://app.gradient.network',
        blockchain: 'ton',
        status: 'active'
    },
    {
        id: 3,
        gen_id: '123456789',
        title: 'gradient',
        category: 'new',
        referral_link: 'https://app.gradient.network',
        twiter_link: 'https://x.com/i/flow/login?lang=en&mx=2',
        telegram_link: 'https://web.telegram.org/a/',
        website_link: 'https://app.gradient.network',
        blockchain: 'solana',
        status: 'finished'
    },
    {
        id: 3,
        gen_id: '123456789',
        title: 'paws voucher',
        category: 'nft',
        referral_link: 'https://app.gradient.network',
        twiter_link: 'https://x.com/i/flow/login?lang=en&mx=2',
        telegram_link: 'https://web.telegram.org/a/',
        website_link: 'https://app.gradient.network',
        blockchain: 'solana',
        status: 'finished'
    },
    {
        id: 3,
        gen_id: '123456789',
        title: 'litas',
        category: 'others',
        referral_link: 'https://app.gradient.network',
        twiter_link: 'https://x.com/i/flow/login?lang=en&mx=2',
        telegram_link: 'https://web.telegram.org/a/',
        website_link: 'https://app.gradient.network',
        blockchain: 'eth',
        status: 'active'
    }
]

const AdminAllAirdrops = () => {
    const tags = ['all', 'featured', 'deFi', 'new', 'NFTs', 'others']
    const [active, setActive] = useState(tags[0])
    const [search, setSearch] = useState('')
    const [dataLoading, setDataLoading] = useState(true)
    const [airdrops, setAirdrops] = useState([])

    useEffect(() => {
        setAirdrops(records);
    }, []);

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)

    const filterTools = () => {
        const mainData = records
        if (search.length > 1) {
            const filtered = mainData.filter(item => String(item.title).toLowerCase().startsWith(search.toLocaleLowerCase()) || String(item.gen_id).toLowerCase().startsWith(search.toLocaleLowerCase()))
            setAirdrops(filtered)
        } else {
            setAirdrops(mainData)
        }
    }

    return (
        <AirdropsLayout>
            <div className='w-11/12 mx-auto'>
                <div className="w-full lg:w-2/3 mx-auto relative">
                    <FormInput placeholder='Search by title and ID' value={search} onChange={(e) => setSearch(e.target.value)} className="!rounded-lg" onKeyUp={filterTools} />
                    <div className="absolute top-5 right-3">
                        <CiSearch className='text-xl cursor-pointer text-white' />
                    </div>
                </div>
                <div className="grid md:grid-cols-6 grid-cols-1 gap-2 items-center mt-4">
                    <div className="text-zinc-300 font-semibold capitalize text-sm lg:text-base col-span-1">Sort airdrops by:</div>
                    <div className='md:col-span-5 col-span-1'>
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 items-center lg:w-11/12 w-full mx-auto">
                            {tags.map((tag) => {
                                return (
                                    <div onClick={() => setActive(tag)}
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
                            {airdrops.length > 0 ?
                                <>
                                    <div className='flex flex-col gap-4'>
                                        {active === 'all' &&
                                            <>
                                                {airdrops.map((item, i) => (
                                                    <AdminAirdropComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'featured' &&
                                            <>
                                                {airdrops.filter((ele) => ele.category === 'featured').map((item, i) => (
                                                    <AdminAirdropComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'deFi' &&
                                            <>
                                                {airdrops.filter((ele) => ele.category === 'deFi').map((item, i) => (
                                                    <AdminAirdropComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'new' &&
                                            <>
                                                {airdrops.filter((ele) => ele.category === 'new').map((item, i) => (
                                                    <AdminAirdropComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'NFTs' &&
                                            <>
                                                {airdrops.filter((ele) => ele.category === 'nft').map((item, i) => (
                                                    <AdminAirdropComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'others' &&
                                            <>
                                                {airdrops.filter((ele) => ele.category === 'others').map((item, i) => (
                                                    <AdminAirdropComp key={i} item={item} />
                                                ))}
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
        </AirdropsLayout>
    )
}

export default AdminAllAirdrops