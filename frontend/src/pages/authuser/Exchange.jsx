import React, { useState } from 'react'
import Crypto from '../../AuthComponents/Crypto'
import SellCrypto from '../../AuthComponents/SellCrypto'

const Exchange = () => {
  const tags = ['BUY', 'SELL']
  const [active, setActive] = useState(tags[0])

  return (
    <div className="w-full flex items-start ">
      <div className="w-full">
        <div className="mt-5 w-11/12 bg-[#1d1e30] rounded-md p-1.5 lg:w-2/3 mx-auto  gap-10 flex items-center justify-center">
          {tags.map((tag, i) => {
            return (
              <div onClick={() => setActive(tag)}
                className={`cursor-pointer w-full py-3 ${active === tag ? 'bg-white text-dark rounded-md' : ''} text-center `} key={i}>{tag}</div>
            )
          })}
        </div>
        {active === 'BUY' ?
          <div className="">
            <Crypto />
          </div>
          :
          <div className="">
            <SellCrypto />
          </div>
        }
      </div>
    </div>
  )
}

export default Exchange