import React from 'react'
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { currencies } from './AuthUtils'

const GiftComp = ({trans}) => {
    return (
        <div className='w-full mb-5'>

            <Link to={`/user/giftcards/orders/${trans.id}`} className="w-full flex items-center cursor-pointer lg:grid lg:grid-cols-3 justify-between border-b-primary py-2 border-b ">
                <div className="flex items-start gap-2 lg:gap-5 w-fit lg:w-full ">
                    <div className="w-fit px-4 py-4 rounded-full bg-primary">
                     <GoArrowUpRight className='text-red-600' />
                    </div>
                    <div className="flex items-start flex-col lg:gap-1">
                        <div className="flex items-center gap-3">
                            <div className={`text-lightgreen capitalize`}>{trans.brand}</div>
                        </div>
                        <div className="flex items-center gap-1 lg:text-base text-sm">
                            <div className="text-xs">{moment(trans.createdAt).format(`hh:mm a`)}</div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="mont text-sm text-indigo-500">{moment(trans.createdAt).format('ddd')}</div>
                        </div>
                    </div>
                </div>
                <div
                    className={` flex items-center text-sm justify-center lg:w-full rounded-md text-yellow-300   `}>
                    {trans.status}</div>

                <div className=" gap-1 font-bold lg:w-full flex items-center justify-center">
                    {/* <div className="">-</div> */}
                    <div
                        className={` `}>{currencies[0].symbol}{trans.amount.toLocaleString()}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default GiftComp