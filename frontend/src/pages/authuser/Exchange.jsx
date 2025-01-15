import React, { useState } from 'react'
import Crypto from '../../AuthComponents/Crypto'
import GiftCards from '../../AuthComponents/GiftCards'

const Exchange = () => {
  const tags = [`Cryptocurrency`, 'Gift Cards']
  const [active, setActive] = useState(tags[0])
  return (
    <div className="overflow-y-auto    text-white">

      <div className="w-full  flex items-start ">
        <div className="w-full  ">
          {active === 'Cryptocurrency' ?
            <div className="">
              <Crypto />
            </div>
            :
            <div className="">
              <GiftCards />
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default Exchange