import React, { useState } from 'react'
import AdminToolsLayout from '../../AdminComponents/AdminToolsLayout'
import { GoArrowUpRight } from 'react-icons/go'
import ModalLayout from '../../utils/ModalLayout'
import moment from 'moment'
import { currencySign } from '../../utils/pageUtils'
import ToolsOrdersModal from '../../AdminComponents/ToolsOrdersModal'

const records = [
    {
        gen_id: '4fg567789ry',
        total_price: 7000,
        total_discount: 1700,
        amount_paid: 5300,
        status: 'paid',
        customer_email: 'gid@gmail.com',
        products: [
            {
                id: 1,
                gen_id: '123456789',
                title: 'acrobat',
                category: 'AI assistant',
                price: 2000,
                discount: 10,
                status: 'approved'
            },
            {
                id: 3,
                gen_id: '123456789',
                title: 'the grinch mas',
                category: 'graphics',
                price: 5000,
                discount: 30,
                status: 'approved'
            }
        ]
    },
    {
        gen_id: '4ee234kl09',
        total_price: 16000,
        total_discount: 3150,
        amount_paid: 12850,
        status: 'paid',
        customer_email: 'victor11@gmail.com',
        products: [
            {
                id: 2,
                gen_id: '123456789',
                title: 'playwrite',
                category: 'font',
                price: 11000,
                discount: 15,
                status: 'approved'
            },
            {
                id: 3,
                gen_id: '123456789',
                title: 'the grinch mas',
                category: 'graphics',
                price: 5000,
                discount: 30,
                status: 'aprroved'
            }
        ]
    }
]

const AdminToolsOrders = () => {
    const [allToolsOrders, setAllToolsOrders] = useState(records)
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState({})

    return (
        <AdminToolsLayout>
            <div className='w-11/12 mx-auto'>
                <div className='flex flex-col gap-5'>
                    <div className='w-72 h-5 rounded-full bg-slate-400'></div>
                    <div></div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className="text-xl lg:text-3xl font-bold text-gray-300 capitalize">latest tools purchases</div>
                    <div className='flex flex-col gap-5'>
                        {allToolsOrders.map((item, i) => (
                            <div key={i}>
                                {modal &&
                                    <ModalLayout clas={`w-11/12 mx-auto lg:w-1/2`} setModal={setModal}>
                                        <div className="w-full h-[70vh] overflow-y-auto scroll p-5 lg:p-10 bg-primary rounded-md">
                                            <div className="flex items-center justify-between">
                                                <ToolsOrdersModal selected={selected} />
                                            </div>
                                            <button className='mt-5 w-full text-center bg-red-600 py-2 rounded-md' onClick={() => setModal(false)} >close</button>
                                        </div>
                                    </ModalLayout>
                                }
                                <div onClick={() => { setModal(true); setSelected(item) }} className="w-full flex items-center cursor-pointer lg:grid lg:grid-cols-3 justify-between border-b-primary pb-1 border-b mt-2 ">
                                    <div className="flex items-start gap-2 lg:gap-5 w-fit lg:w-full ">
                                        <div className="w-fit px-4 py-4 rounded-full bg-primary">
                                            <GoArrowUpRight className='text-lightgreen' />
                                        </div>
                                        <div className="flex items-start flex-col lg:gap-1">
                                            <div className={`text-zinc-200 capitalize`}>tools purchase</div>
                                            <div className="flex items-center gap-1 lg:text-base text-sm">
                                                <div>{moment(item.createdAt).format('Do MMMM YYYY')}</div>
                                                <div className="w-1 h-1 bg-lightgreen rounded-full"></div>
                                                <div className="">{moment(item.createdAt).format('h:mm')}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex items-center text-sm justify-center lg:w-full rounded-md text-lightgreen/90`}>{item.status}</div>
                                    <div className=" font-bold lg:w-full flex items-center justify-center text-lightgreen">
                                        {currencySign[1]}{item.amount_paid.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminToolsLayout>
    )
}

export default AdminToolsOrders