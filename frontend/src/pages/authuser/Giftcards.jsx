import React, { useState } from 'react'
import BuyGiftcard from '../../AuthComponents/BuyGiftcard'
import SellGiftcard from '../../AuthComponents/SellGiftcard'

const Giftcards = () => {
    const tags = ['BUY', 'SELL']
  const [active, setActive] = useState(tags[0])
  return (
    <div className="overflow-y-auto    text-white">

      <div className="w-full  flex items-start ">
        <div className="w-full  ">
          <div className="mt-5  w-11/12 bg-[#1d1e30] rounded-md py-1 px-1 lg:w-2/3 mx-auto  gap-10 flex items-center justify-center">
            {tags.map((tag, i) => {
              return (
                <div onClick={() => setActive(tag)} 
                className={`cursor-pointer w-full py-3 ${ active === tag ? 'bg-white text-dark rounded-md' :'' } text-center `} key={i}>{tag}</div>
              )
            })}
          </div>
          {active === 'BUY' ?
            <div className="">
              <BuyGiftcard />
            </div>
            :
            <div className="">
              <SellGiftcard />
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default Giftcards