import React, { useState } from 'react'
import Crypto from '../../AuthComponents/Crypto'
import GiftCards from '../../AuthComponents/GiftCards'

const Exchange = () => {
  const tags = [`Cryptocurrency`,'Gift Cards']
  const [active,setActive] = useState(tags[0])
  return (
    <div className="overflow-y-auto   text-white">
      <div className="px-5 mx-auto ">
      <div className="w-full  flex items-start gap-10">
        <div className="w-[20%]  p-2">
          <div className="font-bold text-xl mb-4">MonieQuest Exchange</div>
          <div className="flex items-start flex-col gap-2">
            {tags.map((tag,i) =>{
              return (
                <div onClick={()=> setActive(tag)} className={`font-bold text-ash cursor-pointer ${tag ===  active ? 'bg-lightgreen text-white' : 'bg-ash text-lightgreen'}  text-[18px] leading-[30px] px-3 py-1.5  w-full text-center`} key={i}>{tag}</div>
              )
            })}
          </div>
        </div>
        <div className="w-[80%] bg-secondary p-2 py-10 ">
               {active === 'Cryptocurrency' ? 
                <div className="">
                  <Crypto/>
                </div>
               :
                <div className="">
                  <GiftCards/>
                </div>
              }
        </div>
      </div>
      </div>
    </div>
  )
}

export default Exchange