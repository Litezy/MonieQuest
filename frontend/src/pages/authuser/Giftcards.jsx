import React, { useState } from 'react'
import SellGiftcard from '../../AuthComponents/SellGiftcard'
import AuthPageLayout from '../../AuthComponents/AuthPageLayout'

const Giftcards = () => {
  const [screen, setScreen] = useState(1)

  return (
    <AuthPageLayout>
      <div className="mt-5 w-11/12 lg:w-2/3 mx-auto">
        {screen === 1 && <div className="bg-[#1d1e30] py-4 rounded-md  px-1 gap-10 flex items-center justify-center">
          <div className="font-bold text-zinc-300 text-xl">Best rates, fast payments – make the most of your gift cards with us!</div>
        </div>}
        <div className="">
          <SellGiftcard setScreen={setScreen} screen={screen} />
        </div>
      </div>
    </AuthPageLayout>
  )
}

export default Giftcards