import React, { useEffect, useState } from 'react'
import { alltransactions, currencies } from '../../AuthComponents/AuthUtils'
import { CiSearch } from "react-icons/ci";
import TransComp from '../../AuthComponents/TransComp';
import AuthPageLayout from '../../AuthComponents/AuthPageLayout';

const TransHistory = () => {
  const tags = ['All', 'Crypto', 'GiftCards', 'Withdrawal']
  const [active, setActive] = useState(tags[0])


  const [searchValue, setSearchValue] = useState('')
  const [records, setRecords] = useState([])

  useEffect(() => {
    setRecords(alltransactions);
  }, []);

  const filterTrans = () => {
    const mainData = alltransactions
    if (searchValue.length > 1) {
      const filtered = mainData.filter(trans => String(trans.tag).toLowerCase().startsWith(searchValue.toLocaleLowerCase()) || String(trans.type).toLowerCase().startsWith(searchValue.toLocaleLowerCase()) || String(trans.trans_id).toLowerCase().startsWith(searchValue.toLocaleLowerCase()))
      setRecords(filtered)
    } else {
      setRecords(mainData)
    }
  }


  return (
    <AuthPageLayout>
      <div className="w-11/12 mx-auto">
        <div className="mb-3 w-1/2 py-2 mx-auto flex items-center justify-center lg:w-2/3 bg-ash rounded-xl">
          <div className="flex text-white items-center justify-center flex-col w-full">
            <div className=" font-bold">Account Balance:</div>
            <div className=" text-2xl font-bold">{currencies[1].symbol}25,000</div>
          </div>
        </div>
        <div className="w-full my-2">
          <div className="w-full lg:w-2/3 flex gap-2 pr-2 mx-auto items-center border border-zinc-500 rounded-lg ">
            <input type="text" onChange={(e) => setSearchValue(e.target.value)} onKeyUp={filterTrans}
              placeholder='Search by tag , type or ID '
              value={searchValue}
              className='outline-none focus-within:outline-none focus:outline-none focus:ring-0 bg-transparent border-none focus:border-none focus:border w-[95%]' />
            <div className="">
              <CiSearch onClick={filterTrans} className='text-xl cursor-pointer text-white' />
            </div>
          </div>
        </div>
        <div className="my-5 text-2xl font-bold lg:text-center text-lightgreen">Recent Transactions</div>
        <div className="flex flex-col gap-1">
          <div className="grid md:grid-cols-6 grid-cols-1 gap-2 items-center mt-4">
            <div className="text-zinc-300 font-semibold capitalize text-sm lg:text-base col-span-1">sort transactions:</div>
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
          <div className="text-zinc-400 mt-5">{active ? active === 'Withdrawal' ? 'Bank Withdrawal' : active : 'All'} Transactions</div>
        </div>
        <div className="w-full mt-5">
          {records.length > 0 ?
            <>
              {active === tags[0] &&
                <>
                  {records.length > 0 && records.map((trans, i) => {
                    return (
                      <TransComp key={i} trans={trans} />
                    )
                  })}
                </>
              }
              {active === tags[1] &&
                <>
                  {records.filter((trx) => trx.tag === 'crypto').map((trans, i) => {
                    return (
                      <TransComp key={i} trans={trans} />
                    )
                  })}
                </>
              }
              {active === tags[2] &&
                <>
                  {records.filter((trx) => trx.tag === 'giftcard').map((trans, i) => {
                    return (
                      <TransComp key={i} trans={trans} />
                    )
                  })}
                </>
              }
              {active === tags[3] &&
                <>
                  {records.filter((trx) => trx.tag === 'bank withdrawal').map((trans, i) => {
                    return (
                      <TransComp key={i} trans={trans} />
                    )
                  })}
                </>
              }
            </>
            :
            <div className="w-full text-gray-400 text-center">No results found...</div>
          }
        </div>
      </div>
    </AuthPageLayout>
  )
}

export default TransHistory