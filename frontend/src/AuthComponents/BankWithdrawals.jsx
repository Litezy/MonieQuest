import React from 'react'
import TransComp from './TransComp'
import { alltransactions } from './AuthUtils'

const BankWithdrawals = () => {
    return (
        <div className='w-full'>
            {alltransactions.filter((trx) => trx.tag === 'bank withdrawal').map((trans, i) => {
                return (
                    <TransComp key={i} trans={trans} />
                )
            })}
        </div>
    )
}

export default BankWithdrawals