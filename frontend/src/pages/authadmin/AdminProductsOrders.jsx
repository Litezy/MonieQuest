import React, { useEffect, useState } from 'react'
import { GoArrowUpRight } from 'react-icons/go'
import ModalLayout from '../../utils/ModalLayout'
import moment from 'moment'
import { currencySign } from '../../utils/pageUtils'
import { Apis, AuthGetApi } from '../../services/API'
import AdminProductsLayout from '../../AdminComponents/AdminProductLayout'
import ProductsOrdersModal from '../../AdminComponents/ProductOrdersModal'


const AdminProductsOrders = () => {
    const [productOrders, setProductOrders] = useState([])
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState({})
    const [datatLoading, setDataLoading] = useState(true)

    useEffect(() => {
        const FetchProductOrders = async () => {
            try {
                const response = await AuthGetApi(Apis.admin.all_products_orders)
                if (response.status === 200) {
                    setProductOrders(response.msg)
                }
            } catch (error) {
                //
            } finally {
                setDataLoading(false)
            }
        }
        FetchProductOrders()
    }, [])

    return (
        <AdminProductsLayout>
            <div className='w-11/12 mx-auto'>
                {datatLoading ?
                    <div className='flex flex-col gap-10'>
                        <div className='md:w-80 w-56 md:h-5 h-3.5 rounded-full bg-slate-400'></div>
                        <div className='flex items-center lg:grid lg:grid-cols-3 justify-between  border-b border-slate-400 pb-1 w-full'>
                            <div className='flex lg:gap-5 gap-2 items-start'>
                                <div className='w-12 h-12 rounded-full bg-slate-400'></div>
                                <div className='flex flex-col gap-5'>
                                    <div className='md:w-32 w-28 md:h-3.5 h-3 rounded-full bg-slate-400'></div>
                                    <div className='md:w-44 w-36 h-2 rounded-full bg-slate-400'></div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='md:w-12 w-10 h-2 rounded-full bg-slate-400'></div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='md:w-16 w-12 h-2 rounded-full bg-slate-400'></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col gap-5'>
                        <div className="text-xl md:text-3xl font-bold text-gray-300 capitalize">latest tools purchases</div>
                        {modal &&
                            <ModalLayout clas={`w-11/12 mx-auto lg:w-1/2 scroll rounded-md`} setModal={setModal}>
                                <div className="w-full p-5 lg:p-10 bg-primary">
                                    <div className="flex items-center justify-between">
                                        <ProductsOrdersModal selected={selected} />
                                    </div>
                                    <button className='mt-5 w-full text-center bg-red-600 py-2 rounded-md' onClick={() => setModal(false)} >close</button>
                                </div>
                            </ModalLayout>
                        }
                        {productOrders.length > 0 ?
                            <div className='flex flex-col gap-5'>
                                {productOrders.map((item, i) => (
                                    <div key={i}>
                                        <div onClick={() => { setModal(true); setSelected(item) }} className="w-full flex items-center cursor-pointer lg:grid lg:grid-cols-3 justify-between border-b-primary pb-1 border-b mt-2">
                                            <div className="flex items-start gap-2 lg:gap-5 w-fit lg:w-full">
                                                <div className="w-fit px-4 py-4 rounded-full bg-primary">
                                                    <GoArrowUpRight className='text-lightgreen' />
                                                </div>
                                                <div className="flex items-start flex-col gap-1">
                                                    <div className={`text-zinc-200`}>ID: {item?.gen_id}</div>
                                                    <div className="flex items-center gap-1 md:text-sm text-xs">
                                                        <div>{moment(item?.createdAt).format('Do MMMM YYYY')}</div>
                                                        <div className="w-1 h-1 bg-lightgreen rounded-full"></div>
                                                        <div className="">{moment(item?.createdAt).format('h:mm')}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`flex items-center text-sm justify-center lg:w-full rounded-md text-lightgreen/90`}>{item?.status}</div>
                                            <div className=" font-bold lg:w-full flex items-center justify-center text-lightgreen">
                                                {currencySign[1]}{item?.amount_paid && item.amount_paid.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="text-gray-400 text-center">No record found...</div>
                        }
                    </div>
                }
            </div>
        </AdminProductsLayout>
    )
}

export default AdminProductsOrders