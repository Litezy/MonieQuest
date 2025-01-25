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
                    <FormInput placeholder='Search by title and ID' value={search} onChange={(e) => setSearch(e.target.value)} className="!rounded-lg"  onKeyUp={filterTools}/>
                    <div className="absolute top-5 right-3">
                        <CiSearch className='text-xl cursor-pointer text-white' />
                    </div>
                </div>
                <div className="flex lg:items-center lg:flex-row flex-col gap-2 mt-4">
                    <div className="text-lightgreen/70 font-semibold capitalize text-sm lg:text-base">Sort tools by:</div>
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:w-3/4 mx-auto items-center w-full ">
                        {tags.map((tag) => {
                            return (
                                <div onClick={() => setActive(tag)}
                                    className={`px-10 flex items-center justify-center text-center py-1 rounded-md capitalize ${active === tag ? 'bg-ash' : 'bg-primary hover:bg-primary/50'} cursor-pointer`}>{tag}</div>
                            )
                        })}
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