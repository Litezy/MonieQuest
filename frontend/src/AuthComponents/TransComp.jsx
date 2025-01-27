import React, { useState } from 'react'
import { GoArrowDownLeft, GoArrowDownRight, GoArrowRight, GoArrowUpLeft, GoArrowUpRight } from 'react-icons/go'
import { currencies } from './AuthUtils'
import ModalLayout from '../utils/ModalLayout'
import TransModal from './TransModal'

const TransComp = ({ trans }) => {
    const [modal, setModal] = useState(false)

    const closeView = () => {
        setModal(false)
    }
    const openView = () => {
        setModal(true)
    }
    return (
        <div className='w-full mb-5'>

            {modal &&
                <ModalLayout clas={`w-11/12 mx-auto lg:w-1/2 scroll`} setModal={setModal}>
                    <div className="w-full p-5 lg:p-10  bg-primary rounded-md ">
                        <div className="text-center">More Details</div>
                        <div className="flex mt-5 items-center justify-between">
                            <TransModal selected={trans} />
                        </div>
                        <button className='mt-5 w-full text-center bg-red-600 py-2 rounded-md' onClick={closeView} >close</button>
                    </div>
                </ModalLayout>
            }
            <div onClick={openView} className="w-full flex items-center cursor-pointer lg:grid lg:grid-cols-3 justify-between border-b-primary pb-1 border-b mt-2 ">
                <div className="flex items-start gap-2 lg:gap-5 w-fit lg:w-full ">
                    <div className="w-fit px-4 py-4 rounded-full bg-primary">
                        {trans.type === 'buy' && <GoArrowDownLeft className='text-lightgreen' />}
                        {trans.type === 'sell' && <GoArrowUpRight className='text-red-600' />}
                        {trans.tag === 'bank withdrawal' && <GoArrowDownRight className='text-blue-600' />}
                        {trans.tag === 'profit tools' && <GoArrowRight className='text-white' />}
                    </div>
                    <div className="flex items-start flex-col lg:gap-1">
                        <div className="flex items-center gap-3">
                            <div className={`text-zinc-200 capitalize`}>{trans.tag}</div>
                            {trans.type && <div className="w-[0.5px] h-5 bg-gray-400"></div>}
                            {trans.type && <div className={` ${trans.type === 'buy' ? "text-lightgreen" : 'text-red-600'} capitalize`}> {trans.type}</div>}
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="">{trans.date}</div>
                            <div className="w-1 h-1 bg-lightgreen rounded-full"></div>
                            <div className="">Sun</div>
                        </div>
                    </div>
                </div>
                <div
                    className={` flex items-center text-sm justify-center lg:w-full rounded-md ${trans.status === 'pending' ? "text-yellow-300" : trans.status === 'completed' ? 'text-lightgreen/90  ' : 'text-red-600'}`}>
                    {trans.status}</div>

                <div className=" gap-1 font-bold lg:w-full flex items-center justify-center">
                    <div className={`${trans.type === 'buy' ? 'text-lightgreen' : trans.type === 'sell' ? 'text-red-600' : trans.tap === 'tools'?'text-white':'text-blue-600'}`}>{trans.type === 'buy'? '+': trans.type === 'sell'?"-":'-'}</div>
                    <div
                        className={`${trans.type === 'buy' ? 'text-lightgreen' : trans.tag === 'bank withdrawal' ? 'text-blue-500' : trans.tap === 'tools' ?'text-white':'text-red-600'} `}>{currencies[1].symbol}{trans.amount.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransComp