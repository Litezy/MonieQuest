import React, { useEffect, useMemo, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import AirdropDiv from '../../GeneralComponents/AirdropDiv'
import { Link, useSearchParams } from 'react-router-dom'
import FormInput from '../../utils/FormInput'
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { GiArrowScope } from "react-icons/gi";
import SelectComp from '../../GeneralComponents/SelectComp'
import { MoveToTop } from '../../utils/pageUtils'
import { Apis, GetApi } from '../../services/API'
import ButtonLoader from '../../GeneralComponents/ButtonLoader'

const statuses = ["Open", "Closed"]
const kyces = ["Required", "Unrequired"]
const categories = ["DeFi", "Featured", "New", "NFT", "Potential", "Earn_crypto"]
const blockchains = ['Abstract', 'Algorand', 'ApeChain', 'Abitrum', 'Avalanche', 'Base', 'Berachain', 'Binance', 'Bitcoin', 'Blast', 'Cardano', 'Celestia', 'Cosmos', 'Dogechain', 'Ethereum', 'Filecoin', 'Immutable', 'Injective', 'IoTeX', 'Linea', 'Manta Network', 'Near Protocol', 'Optimism', 'Other', 'Polkadot', 'Polygon', 'Ronin', 'Scroll', 'Solana', 'Sui', 'Tesnet', 'TON', 'Tron', 'zkSync']

const AirdropsPage = () => {
  const [params] = useSearchParams()
  const filCategory = params.get('c')
  const [staticData, setStaticData] = useState([])
  const [airdrops, setAirdrops] = useState([])
  const [search, setSearch] = useState('')
  const [select, setSelect] = useState({
    status: '',
    category: '',
    blockchain: '',
    kyc: ''
  })
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    const FetchAllAirdrops = async () => {
      try {
        const response = await GetApi(Apis.admin.all_open_airdrops)
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

  useEffect(() => {
    if (!dataLoading && filCategory) {
      setSelect({
        ...select,
        category: filCategory.charAt(0).toUpperCase() + filCategory.slice(1).toLowerCase()
      })
      const mainData = staticData
      const filteredData = mainData.filter(item => item.category.toLocaleLowerCase() === filCategory.toLocaleLowerCase())
      setAirdrops(filteredData)
    }
  }, [staticData])


  const deFiAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'deFi');
  }, [airdrops])
  const featuredAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'featured');
  }, [airdrops])
  const newAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'new');
  }, [airdrops])
  const NFTAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'NFT');
  }, [airdrops])
  const potentialAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'potential');
  }, [airdrops])
  const earnCryptoAirdrops = useMemo(() => {
    return airdrops.filter((ele) => ele.category === 'earn_crypto');
  }, [airdrops])

  const SubmitFilter = () => {
    const mainData = staticData
    const filteredData = mainData.filter(item => item.kyc.toLocaleLowerCase() === select.kyc.toLocaleLowerCase() || item.category.toLocaleLowerCase() === select.category.toLocaleLowerCase() || item.status.toLocaleLowerCase() === select.status.toLocaleLowerCase() || item.blockchain === select.blockchain)
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
                  <div className='grid md:grid-cols-5 grid-cols-2 gap-8 items-center'>
                    {new Array(5).fill(0).map((_, i) => (
                      <div key={i} className='w-28 h-12 rounded-[3px] bg-slate-400 animate-pulse'></div>
                    ))}
                  </div>
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
                    <SelectComp title={'KYC'} options={kyces} style={{ bg: 'white', rounded: 1, color: 'text-[#585858]', font: '0.8rem' }} value={select.kyc} handleChange={(e) => setSelect({ ...select, kyc: e.target.value })} />
                    <SelectComp title={'Status'} options={statuses} style={{ bg: 'white', rounded: 1, color: 'text-[#585858]', font: '0.8rem' }} value={select.status} handleChange={(e) => setSelect({ ...select, status: e.target.value })} />
                    <SelectComp title={`Category`} options={categories} style={{ bg: 'white', rounded: 1, color: 'text-[#585858]', font: '0.8rem' }} value={select.category} handleChange={(e) => setSelect({ ...select, category: e.target.value })} />
                    <SelectComp title={`Blockchain`} options={blockchains} style={{ bg: 'white', rounded: 1, color: 'text-[#585858]', font: '0.8rem' }} value={select.blockchain} handleChange={(e) => setSelect({ ...select, blockchain: e.target.value })} />
                  </div>
                  <div className='w-fit relative'>
                    {loading && <ButtonLoader className={`rounded-[4px]`} />}
                    <button onClick={SubmitFilter} className='outline-none w-fit h-fit bg-lightgreen/90 text-ash rounded-[4px] py-2.5 px-8 font-bold'>Search</button>
                  </div>
                </div>
                {airdrops.length > 0 ?
                  <div className='flex flex-col gap-12'>
                    {deFiAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-3 items-center text-xl'>
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
                    {featuredAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-3 items-center text-xl'>
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
                          <div className='flex gap-3 items-center text-xl'>
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
                          <div className='flex gap-3 items-center text-xl'>
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
                    {potentialAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-3 items-center text-xl'>
                            <GiArrowScope />
                            <span className='capitalize font-bold'>potential airdrops</span>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <Link to='/airdrops/potential' className='capitalize text-sm hover:text-lightgreen' onClick={MoveToTop}>view all</Link>
                            <div className='md:flex gap-2 items-center hidden'>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronLeft /></button>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronRight /></button>
                            </div>
                          </div>
                        </div>
                        <div className='w-full overflow-x-auto scrollsdown'>
                          <div className='w-fit flex gap-4'>
                            {potentialAirdrops.map((item, i) => (
                              <AirdropDiv key={i} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    }
                    {earnCryptoAirdrops.length > 0 &&
                      <div className='flex flex-col gap-4 pb-8 border-b border-gray-600'>
                        <div className='flex justify-between gap-4 items-center'>
                          <div className='flex gap-3 items-center text-xl'>
                            <GiArrowScope />
                            <span className='capitalize font-bold'>earn crypto airdrops</span>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <Link to='/airdrops/earn_crypto' className='capitalize text-sm hover:text-lightgreen' onClick={MoveToTop}>view all</Link>
                            <div className='md:flex gap-2 items-center hidden'>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronLeft /></button>
                              <button className='bg-primary hover:bg-[#2f2f47] w-fit h-fit p-2 outline-none rounded-[3px] text-lightgreen text-sm'><LuChevronRight /></button>
                            </div>
                          </div>
                        </div>
                        <div className='w-full overflow-x-auto scrollsdown'>
                          <div className='w-fit flex gap-4'>
                            {earnCryptoAirdrops.map((item, i) => (
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