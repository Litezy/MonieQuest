import React from 'react'
import { alltransactions } from './AuthUtils'
import TransComp from './TransComp'

const CryptoTransactions = () => {
  return (
    <div className='w-full'>
         {alltransactions.filter((trx)=> trx.tag === 'crypto').map((trans,i)=>{
              return (
                <TransComp key={i} trans={trans}/>
              )
            })}
    </div>
  )
}

export default CryptoTransactions