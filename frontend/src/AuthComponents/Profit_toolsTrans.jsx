import React from 'react'
import { alltransactions } from './AuthUtils'
import TransComp from './TransComp'

const Profit_toolsTrans = () => {
  return (
    <div className='w-full'>
      {alltransactions.filter((trx) => trx.tag === 'profit tools').map((trans, i) => {
        return (
          <TransComp key={i} trans={trans} />
        )
      })}

    </div>
  )
}

export default Profit_toolsTrans