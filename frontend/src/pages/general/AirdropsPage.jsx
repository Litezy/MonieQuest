import React, { useEffect, useMemo, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv'
import { Link } from 'react-router-dom'
import FormInput from '../../utils/FormInput'
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { GiArrowScope } from "react-icons/gi";
import SelectComp from '../../GeneralComponents/SelectComp'
import { MoveToTop } from '../../utils/pageUtils'
import { Apis, GetApi } from '../../services/API'
import Loading from '../../GeneralComponents/Loading'

const statuses = ["Active", "Finished"]
const categories = ["Featured", "New", "DeFi", "NFT", "Other"]
const blockchains = ["Ton", "BNB", "ETH", "Solana"]

const AirdropsPage = () => {
  const [staticData, setStaticData] = useState([])
  const [airdrops, setAirdrops] = useState([])
  const [check, setCheck] = useState('')
  const [search, setSearch] = useState('')
  const [select, setSelect] = useState({
    status: '',
    category: '',
    blockchain: ''
  })
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    const FetchAllAirdrops = async () => {
      try {
        const response = await GetApi(Apis.admin.all_airdrops)
        if (response.status === 200) {
          setStaticData(response.msg)
          setAirdrops(response.msg)
        }
      } catch (error) {
        //
      } finally {
        setDataLoading(false)
      }
    }
    FetchAllAirdrops()
  }, [])

  const featuredAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'featured');
  }, [airdrops])
  const newAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'new');
  }, [airdrops])
  const NFTAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'NFT');
  }, [airdrops])
  const deFiAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'deFi');
  }, [airdrops])
  const otherAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'other');
  }, [airdrops])

  const SubmitFilter = () => {
    const mainData = staticData
    const kyc = check ? 'true' : 'false'
    const filteredData = mainData.filter(item => item.kyc === kyc || item.category.toLocaleLowerCase() === select.category.toLocaleLowerCase() || item.status.toLocaleLowerCase() === select.status.toLocaleLowerCase() || item.blockchain.toLocaleLowerCase() === select.blockchain.toLocaleLowerCase())
    setLoading(true)
    setTimeout(() => {
      setAirdrops(filteredData)
      setLoading(false)
    }, 1500)
  }

  const SearchFilter = () => {
    const mainData = staticData
    if (search.length > 1) {
      const filteredData = mainData.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      setAirdrops(filteredData)
    } else {
      setAirdrops(staticData)
    }
  }

  return (
    <PageLayout>
      <div className='pb-20 bg-dark w-full text-gray-200'>
        <div className='pageBg'>
          <div className='w-full h-full bg-[#212134ea] py-10'>
            <div className='text-3xl md:text-4xl font-bold text-white text-center'>Airdrops</div>
          </div>
        </div>
        <div className='w-11/12 mx-auto mt-16'>
          <div className='flex flex-col gap-6'>
            <div className='flex md:flex-row flex-col gap-4 items-center justify-center'>
              <div>Find an airdrop:</div>
              <FormInput placeholder='Search airdrops by title' className='md:!w-96 !w-72 -mt-2 !rounded-full ipt' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={SearchFilter} />
            </div>
            {dataLoading ?
              <div className='flex flex-col gap-16'>
                <div className='flex lg:flex-row flex-col lg:gap-8 gap-4 items-center justify-center'>
                  <div className='w-24 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                  <div className='grid md:grid-cols-4 grid-cols-2 gap-8 items-center'>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-28 h-12 rounded-full bg-slate-400 animate-pulse'></div>
                    ))}
                  </div>
                  <div className='w-28 h-12 rounded-full bg-slate-400 animate-pulse'></div>
                </div>
                <div className='flex flex-col gap-4 pb-8 border-b border-slate-400 animate-pulse'>
                  <div className='flex justify-between items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-6 h-6 rounded-full bg-slate-400 animate-pulse'></div>
                      <div className='w-52 h-4 rounded-full bg-slate-400 animate-pulse'></div>
                    </div>
                    <div className='md:flex gap-4 items-center hidden'>
                      <div className='w-16 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                      <div className='flex gap-2'>
                        {new Array(2).fill(0).map((_, i) => (
                          <div key={i} className='w-7 h-7 rounded-[3px] bg-slate-400 animate-pulse'></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='w-full overflow-x-hidden'>
                    <div className='w-fit flex gap-4'>
                      {new Array(5).fill(0).map((_, i) => (
                        <div key={i} className='w-72 h-40 rounded-md bg-slate-400 animate-pulse'></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className='flex flex-col gap-16'>
                <div className='flex lg:flex-row flex-col lg:gap-8 gap-4 items-center justify-center'>
                  <div className='capitalize font-bold'>filter here:</div>
                  <div className='grid md:grid-cols-4 grid-cols-2 gap-4 items-center'>
                    <div className='bg-[lightgrey] w-28 h-fit rounded-full flex justify-between items-center text-[#585858] p-3 font-semibold'>
                      <span>KYC</span>
                      <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className='cursor-pointer'></input>
                    </div>
                    <SelectComp title='Status' options={statuses} style={{ bg: 'lightgrey', rounded: 8, color: 'text-[#585858]', font: '1rem' }} value={select.status} handleChange={(e) => setSelect({ ...select, status: e.target.value })} />
                    <SelectComp title='Categories' options={categories} style={{ bg: 'lightgrey', rounded: 8, color: 'text-[#585858]', font: '1rem' }} value={select.category} handleChange={(e) => setSelect({ ...select, category: e.target.value })} />
                    <SelectComp title='Blockchain' options={blockchains} style={{ bg: 'lightgrey', rounded: 8, color: 'text-[#585858]', font: '1rem' }} value={select.blockchain} handleChange={(e) => setSelect({ ...select, blockchain: e.target.value })} />
                  </div>
                  <div className='w-fit relative'>
                    {loading && <Loading />}
                    <button onClick={SubmitFilter} className='outline-none w-fit h-fit bg-lightgreen text-black rounded-full py-3 px-8'>Search</button>
                  </div>
                </div>
                {airdrops.length > 0 ?
                  <div className='flex flex-col gap-12'>
                    {featuredAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-2 items-center text-xl'>
                            <GiArrowScope />
                            <span className='capitalize font-bold'>featured airdrops</span>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <Link to='/airdrops/featured' className='capitalize text-sm hover:text-lightgreen' onClick={MoveToTop}>view all</Link>
                            <div className='md:flex gap-2 items-center hidden'>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronLeft /></button>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronRight /></button>
                            </div>
                          </div>
                        </div>
                        <div className='w-full overflow-x-auto scrollsdown'>
                          <div className='w-fit flex gap-4'>
                            {featuredAirdrops.map((item, i) => (
                              <AirdropDiv key={i} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    }
                    {newAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-2 items-center text-xl'>
                            <GiArrowScope />
                            <span className='capitalize font-bold'>new airdrops</span>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <Link to='/airdrops/new' className='capitalize text-sm hover:text-lightgreen' onClick={MoveToTop}>view all</Link>
                            <div className='md:flex gap-2 items-center hidden'>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronLeft /></button>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronRight /></button>
                            </div>
                          </div>
                        </div>
                        <div className='w-full overflow-x-auto scrollsdown'>
                          <div className='w-fit flex gap-4'>
                            {newAirdrops.map((item, i) => (
                              <AirdropDiv key={i} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    }
                    {NFTAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-2 items-center text-xl'>
                            <GiArrowScope />
                            <span className='capitalize font-bold'>NFT airdrops</span>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <Link to='/airdrops/NFT' className='capitalize text-sm hover:text-lightgreen' onClick={MoveToTop}>view all</Link>
                            <div className='md:flex gap-2 items-center hidden'>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronLeft /></button>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronRight /></button>
                            </div>
                          </div>
                        </div>
                        <div className='w-full overflow-x-auto scrollsdown'>
                          <div className='w-fit flex gap-4'>
                            {NFTAirdrops.map((item, i) => (
                              <AirdropDiv key={i} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    }
                    {deFiAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-2 items-center text-xl'>
                            <GiArrowScope />
                            <span className='capitalize font-bold'>deFi airdrops</span>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <Link to='/airdrops/deFi' className='capitalize text-sm hover:text-lightgreen' onClick={MoveToTop}>view all</Link>
                            <div className='md:flex gap-2 items-center hidden'>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronLeft /></button>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronRight /></button>
                            </div>
                          </div>
                        </div>
                        <div className='w-full overflow-x-auto scrollsdown'>
                          <div className='w-fit flex gap-4'>
                            {deFiAirdrops.map((item, i) => (
                              <AirdropDiv key={i} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    }
                    {otherAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-2 items-center text-xl'>
                            <GiArrowScope />
                            <span className='capitalize font-bold'>more ways to earn crypto</span>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <Link to='/airdrops/other' className='capitalize text-sm hover:text-lightgreen' onClick={MoveToTop}>view all</Link>
                            <div className='md:flex gap-2 items-center hidden'>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronLeft /></button>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronRight /></button>
                            </div>
                          </div>
                        </div>
                        <div className='w-full overflow-x-auto scrollsdown'>
                          <div className='w-fit flex gap-4'>
                            {otherAirdrops.map((item, i) => (
                              <AirdropDiv key={i} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  :
                  <div className='text-center'>No airdrop found...</div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default AirdropsPage