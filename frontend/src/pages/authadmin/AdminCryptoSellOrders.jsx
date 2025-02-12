import React, { useEffect, useState } from 'react'
import { currencies } from '../../AuthComponents/AuthUtils'
import { Link } from 'react-router-dom'
import AdminExchangeLayout from '../../AdminComponents/AdminExchangeLayout'
import { Apis, AuthGetApi } from '../../services/API'

const AdminCryptoSellOrders = () => {
    const Topheaders = [`ID`, 'FullName', 'Crypto', 'TxID/Hash', 'Amount', 'Details']

    const [data, setData] = useState([])
    const fetchSells = async () => {
        try {
            const res = await AuthGetApi(Apis.admin.cryptosell_orders)
            // console.log(res)
            if (res.status !== 200) return;
            const data = await res.data
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSells()
    }, [])
    return (
        <AdminExchangeLayout>
            <div className='w-11/12 mx-auto'>
                <div className=" text-lg font-bold w-full text-center capitalize">See Latest Sell Orders below</div>
                <div className="relative overflow-x-auto rounded-md mt-10">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className=" bg-primary text-base poppins ">
                            <tr>
                                {Topheaders.map((item, i) => (
                                    <th key={i} scope="col" className="px-3 text-red-600 py-3">{item}</th>
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
                                        {item?.crypto_seller?.first_name} {item?.crypto_seller?.surname}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.crypto_currency}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.trans_hash.slice(0,10)}*******
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
                                <div className=" w-full text-lg font-semibold flex items-center justify-center">No Sell Orders  </div>
                            }

                        </tbody>
                    </table>


                </div>
            </div>
        </AdminExchangeLayout>
    )
}

export default AdminCryptoSellOrders