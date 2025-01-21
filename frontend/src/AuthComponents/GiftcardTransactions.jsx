import React from 'react'
import TransComp from './TransComp'
import { alltransactions } from './AuthUtils'

const GiftcardTransactions = () => {
  return (
    <div className='w-full'>
    {alltransactions.filter((trx)=> trx.tag === 'giftcard').map((trans,i)=>{
         return (
           <TransComp key={i} trans={trans}/>
         )
       })}
</div>
  )
}

export default GiftcardTransactions