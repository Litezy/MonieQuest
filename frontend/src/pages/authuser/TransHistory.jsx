import React, { useEffect, useState } from 'react'
import { alltransactions, currencies } from '../../AuthComponents/AuthUtils'
import { CiSearch } from "react-icons/ci";
import CryptoTransactions from '../../AuthComponents/CryptoTransactions';
import BankWithdrawals from '../../AuthComponents/BankWithdrawals';
import GiftcardTransactions from '../../AuthComponents/GiftcardTransactions';
import TransComp from '../../AuthComponents/TransComp';
import Profit_toolsTrans from '../../AuthComponents/Profit_toolsTrans';

const TransHistory = () => {
  const tags = ['All', 'Crypto', 'Profit Tools', 'GiftCards', 'Withdrawal']
  const [active, setActive] = useState(tags[0])

  const CheckTag = (tag) => {
    if (active === tag) {
      setActive('')
    } else {
      setActive(tag)
    }
  }

  const [records, setRecords] = useState([])
  const [searchValue,setSearchValue] = useState('')
  const filterTrans = () => {
    const value = searchValue.trim();
    if (value.length > 1) {
      const filtered = alltransactions.filter(
        (trans) =>
          String(trans.tag).toLowerCase().startsWith(value.toLowerCase()) ||
          String(trans.type).toLowerCase().startsWith(value.toLowerCase()) ||
          String(trans.trans_id).toLowerCase().startsWith(value.toLowerCase())
      );
      setRecords(filtered.length > 0 ? filtered : []);
    } else {
      setRecords(alltransactions);
    }
  };
  
  useEffect(() => {
    filterTrans();
  }, [searchValue]);
  
  
  return (
    <div className="w-11/12 mx-auto">
      <div className="mb-3 w-1/2 py-2 mx-auto flex items-center justify-center lg:w-2/3 bg-white/80 rounded-xl">
        <div className="flex items-center justify-center flex-col w-full">
          <div className="text-dark font-bold">Account Balance:</div>
          <div className="text-primary text-2xl font-bold">{currencies[1].symbol}25,000</div>
        </div>
      </div>
      <div className="w-full my-2">
        <div className="w-full lg:w-2/3 flex gap-2 pr-2 mx-auto items-center border border-zinc-500 rounded-lg ">
          <input type="text" onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search by tag , type or ID ' 
          value={searchValue}
          className='outline-none focus-within:outline-none focus:outline-none focus:ring-0 bg-transparent border-none focus:border-none focus:border w-[95%]' />
          <div className="">
            <CiSearch onClick={filterTrans} className='text-xl cursor-pointer text-white' />
          </div>
        </div>
      </div>

      <div className="my-5  text-2xl font-bold lg:text-center text-lightgreen">Recent Transactions</div>
      <div className="flex lg:items-center lg:flex-row flex-col gap-1">
        <div className="text-zinc-300  font-semibold capitalize text-sm lg:text-base">Sort transactions by:</div>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:w-3/4 mx-auto  items-center w-full ">
          {tags.map((tag) => {
            return (
              <div onClick={() => CheckTag(tag)} onDoubleClick={() => setActive('')}
                className={`flex items-center md:text-base justify-center lg:text-center py-1 text-sm rounded-md ${active === tag ? 'bg-ash' : 'bg-primary hover:bg-primary/50'}   cursor-pointer`}>{tag}</div>
            )
          })}
        </div>
      </div>
      <div className="text-zinc-400 mt-5">{active ? active === 'Withdrawal' ? 'Bank Withdrawal' : active : 'All'} Transactions</div>
      <div className="w-full mt-5 ">
        {active === 'Crypto' &&
          <CryptoTransactions />
        }
        {active === 'GiftCards' &&
          <GiftcardTransactions />
        }
        {active === 'Withdrawal' &&
          <BankWithdrawals />
        }
        {active === tags[2] &&
          <Profit_toolsTrans />
        }
        {active === '' || active === 'All' &&

          <div className="">

            {!searchValue && records.length > 0 && records.map((trans, i) => {
              return (
                <TransComp key={i} trans={trans} />
              )
            })}
            {searchValue && records.length > 0 && records.map((trans, i) => {
              return (
                <TransComp key={i} trans={trans} />
              )
            })}
            {searchValue && records.length === 0 && 
            <div className="w-full text-gray-400 text-center">No results found.</div>
            }

          </div>
        }

      </div>
    </div>
  )
}

export default TransHistory