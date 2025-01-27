import React, { useEffect, useState } from 'react'
import ProfitToolsLayout from '../../AuthComponents/ProfitToolsLayout'
import ToolComp from '../../AuthComponents/ToolComp';
import { CiSearch } from 'react-icons/ci';
import FormInput from '../../utils/FormInput';
const records = [
    {
        gen_id: '123456789',
        title: 'acrobat',
        catgory: 'AI assistant',
        price: 100,
        link: 'https://app.gradient.network',
        contact_details: '09011234567',
        status: 'approved'
    },
    {
        gen_id: '123456789',
        title: 'playwrite',
        catgory: 'font',
        price: 20,
        link: 'https://app.gradient.network',
        contact_details: '09011234567',
        status: 'declined'
    },
    {
        gen_id: '123456789',
        title: 'the grinch mas',
        catgory: 'graphics',
        price: 50,
        link: 'https://app.gradient.network',
        contact_details: '09011234567',
        status: 'pending'
    }
]

const ProfitTools = () => {
    const tags = ['all', 'pending', 'approved', 'declined']
    const [active, setActive] = useState(tags[0])
    const [search, setSearch] = useState('')
    const [dataLoading, setDataLoading] = useState(true)
    const [allTools, setAllTools] = useState([])

    useEffect(() => {
        setAllTools(records);
    }, []);

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)

    const filterTools = () => {
        const mainData = records
        if (search.length > 1) {
            const filtered = mainData.filter(item => String(item.title).toLowerCase().startsWith(search.toLocaleLowerCase()) || String(item.gen_id).toLowerCase().startsWith(search.toLocaleLowerCase()))
            setAllTools(filtered)
        } else {
            setAllTools(mainData)
        }
    }

    return (
        <ProfitToolsLayout>
            <div className='w-11/12 mx-auto'>
                <div className="w-full lg:w-2/3 mx-auto relative">
                    <FormInput placeholder='Search by title and ID' value={search} onChange={(e) => setSearch(e.target.value)} className="!rounded-lg" onKeyUp={filterTools} />
                    <div className="absolute top-5 right-3">
                        <CiSearch className='text-xl cursor-pointer text-white' />
                    </div>
                </div>
                <div className="grid md:grid-cols-6 grid-cols-1 gap-2 items-center mt-4">
                    <div className="text-zinc-300 font-semibold capitalize text-sm lg:text-base col-span-1">Sort tools by:</div>
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
                            {allTools.length > 0 ?
                                <>
                                    <div className='flex flex-col gap-4'>
                                        {active === 'all' &&
                                            <>
                                                {allTools.map((item, i) => (
                                                    <ToolComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'pending' &&
                                            <>
                                                {allTools.filter((ele) => ele.status === 'pending').map((item, i) => (
                                                    <ToolComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'approved' &&
                                            <>
                                                {allTools.filter((ele) => ele.status === 'approved').map((item, i) => (
                                                    <ToolComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'declined' &&
                                            <>
                                                {allTools.filter((ele) => ele.status === 'declined').map((item, i) => (
                                                    <ToolComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                    </div>
                                </>
                                :
                                <div className="w-full text-gray-400 text-center">No results found...</div>
                            }
                        </>
                    }
                </div>
            </div>
        </ProfitToolsLayout>
    )
}

export default ProfitTools