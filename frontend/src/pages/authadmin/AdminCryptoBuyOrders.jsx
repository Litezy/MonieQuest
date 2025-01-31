import React from 'react'
import { currencies } from '../../AuthComponents/AuthUtils'
import { Link } from 'react-router-dom'
import AdminExchangeLayout from '../../AdminComponents/AdminExchangeLayout'
import { dummy } from '../../AdminComponents/AdminUtils'

const AdminCryptoBuyOrders = () => {
    const Topheaders = [`ID`, 'FullName', 'Crypto', 'Network', 'Amount', 'Details']

   
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
                            {Array.isArray(dummy) ? dummy.map((item, i) => (
                                <tr className=" border-b " key={i}>
                                    <th scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                        {item.id}
                                    </th>
                                    <td className="px-3 py-3">
                                        {item.fullname}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item.crypto}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item.network}
                                    </td>

                                    <td className="px-3 py-3">
                                        {currencies[1].symbol}{item.amount.toLocaleString()}
                                    </td>
                                    <td className="px-3 py-3">
                                        <Link to={`${item.id}`}
                                        className="bg-primary to-sec truncate text-white px-5 rounded-lg py-2">view details</Link>
                                    </td>

                                </tr>
                            )) :
                                <div className=" w-full text-lg font-semibold flex items-center justify-center">No Buy Orders  </div>
                            }

                        </tbody>
                    </table>


                </div>
            </div>
        </AdminExchangeLayout>
    )
}

export default AdminCryptoBuyOrders