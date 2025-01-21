import React, { useState } from 'react'
import SellGiftcard from '../../AuthComponents/SellGiftcard'

const Giftcards = () => {
  const [screen, setScreen] = useState(1)

  return (
    <div className="overflow-y-auto text-white">

      <div className="w-full flex items-start ">
        <div className="w-full">
          <div className="mt-5  w-11/12 bg-[#1d1e30] py-4 rounded-md  px-1 lg:w-2/3 mx-auto  gap-10 flex items-center justify-center">
          { screen ===1 &&<div className="font-bold text-zinc-300 text-xl">Best rates, fast payments – make the most of your gift cards with us!</div>}
          </div>
            <div className="">
              <SellGiftcard setScreen={setScreen} screen={screen} />
            </div>
        </div>
      </div>

    </div>
  )
}

export default Giftcards