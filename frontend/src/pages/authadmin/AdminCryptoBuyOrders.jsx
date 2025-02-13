import React, { useEffect, useState } from 'react'
import { currencies } from '../../AuthComponents/AuthUtils'
import { Link } from 'react-router-dom'
import AdminExchangeLayout from '../../AdminComponents/AdminExchangeLayout'
import { dummy } from '../../AdminComponents/AdminUtils'
import { Apis, AuthGetApi } from '../../services/API'

const AdminCryptoBuyOrders = () => {
    const Topheaders = [`ID`, 'FullName', 'Crypto', 'Network', 'Amount', 'Details']
    const [data, setData] = useState([])

    const fetchBuys = async () => {
        try {
            const res = await AuthGetApi(Apis.admin.cryptobuy_orders)
            if (res.status !== 200) return;
            const data = await res.data
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBuys()
    }, [])

    return (
        <AdminExchangeLayout>
            <div className='w-11/12 mx-auto'>
                <div className=" text-lg font-bold w-full text-center capitalize">See Latest Buy Orders below</div>
                <div className="relative overflow-x-auto rounded-md mt-10">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className=" bg-primary text-base poppins ">
                            <tr>
                                {Topheaders.map((item, i) => (
                                    <th key={i} scope="col" className="px-3 text-lightgreen py-3">{item}</th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, i) => (
                                <tr className=" border-b " key={i}>
                                    <th scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                        {item?.id}
                                    </th>
                                    <td className="px-3 py-3">
                                        {item?.crypto_buyer?.first_name}  {item?.crypto_buyer?.surname}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.crypto_currency}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.network}
                                    </td>

                                    <td className="px-3 py-3">
                                        {currencies[1].symbol}{item?.amount.toLocaleString()}
                                    </td>
                                    <td className="px-3 py-3">
                                        <Link to={`${item?.id}`}
                                            className="bg-primary to-sec truncate text-white px-5 rounded-lg py-2">view details</Link>
                                    </td>

                                </tr>
                            )) :
                                <tr className="w-full truncate text-lg font-semibold">
                                    <td colSpan="6" className='text-center py-2'>No Buy Orders</td>
                                </tr>
                            }

                        </tbody>
                    </table>


                </div>
            </div>
        </AdminExchangeLayout>
    )
}

export default AdminCryptoBuyOrders