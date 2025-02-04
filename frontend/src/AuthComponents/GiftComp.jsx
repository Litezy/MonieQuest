import React from 'react'
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { currencies } from './AuthUtils'

const GiftComp = ({trans}) => {
    return (
        <div className='w-full mb-5'>

            <Link to={`/user/giftcards/orders/${trans.id}`} className="w-full flex items-center cursor-pointer lg:grid lg:grid-cols-3 justify-between border-b-primary pb-1 border-b mt-2 ">
                <div className="flex items-start gap-2 lg:gap-5 w-fit lg:w-full ">
                    <div className="w-fit px-4 py-4 rounded-full bg-primary">
                     <GoArrowUpRight className='text-red-600' />
                    </div>
                    <div className="flex items-start flex-col lg:gap-1">
                        <div className="flex items-center gap-3">
                            <div className={`text-zinc-200 capitalize`}>{trans.brand}</div>
                            {trans.type && <div className="w-[0.5px] h-5 bg-gray-400"></div>}
                            {trans.type && <div className={` ${trans.type === 'buy' ? "text-lightgreen" : 'text-red-600'} capitalize`}> {trans.type}</div>}
                        </div>
                        <div className="flex items-center gap-1 lg:text-base text-sm">
                            <div className="text-xs">{moment(trans.createdAt).format(`hh:mm a`)}</div>
                            <div className="w-1 h-1 bg-lightgreen rounded-full"></div>
                            <div className="">{moment(trans.createdAt).format('ddd')}</div>
                        </div>
                    </div>
                </div>
                <div
                    className={` flex items-center text-sm justify-center lg:w-full rounded-md ${trans.status === 'pending' ? "text-yellow-300" : trans.status === 'paid' ? 'text-lightgreen/90  ' : 'text-red-600'}`}>
                    {trans.status}</div>

                <div className=" gap-1 font-bold lg:w-full flex items-center justify-center">
                    <div className={`${trans.type === 'buy' ? 'text-lightgreen' : trans.type === 'sell' ? 'text-red-600' : trans.tap === 'tools' ? 'text-white' : 'text-blue-600'}`}>{trans.type === 'buy' ? '+' : trans.type === 'sell' ? "-" : '-'}</div>
                    <div
                        className={`${trans.type === 'buy' ? 'text-lightgreen' : trans.tag === 'bank withdrawal' ? 'text-blue-500' : trans.tap === 'tools' ? 'text-white' : 'text-red-600'} `}>{currencies[0].symbol}{trans.amount.toLocaleString()}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default GiftComp