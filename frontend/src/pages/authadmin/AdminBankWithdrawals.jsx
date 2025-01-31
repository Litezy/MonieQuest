import React, { useEffect, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { alltransactions, currencies } from '../../AuthComponents/AuthUtils'
import { CiSearch } from 'react-icons/ci'
import { dummy } from '../../AdminComponents/AdminUtils'
import { Link } from 'react-router-dom'

const AdminBankWithdrawals = () => {
    const tags = ['All', 'Crypto', 'GiftCards', 'Withdrawal']
    const [active, setActive] = useState(tags[0])
    const [searchValue, setSearchValue] = useState('')
    const [records, setRecords] = useState([])

    useEffect(() => {
        setRecords(alltransactions);
    }, []);

    const Topheaders = [`ID`, 'FullName', 'Date', 'Amount', 'Details']

    const filterTrans = () => {
        const mainData = alltransactions
        if (searchValue.length > 1) {
            const filtered = mainData.filter(trans => String(trans.tag).toLowerCase().startsWith(searchValue.toLocaleLowerCase()) || String(trans.type).toLowerCase().startsWith(searchValue.toLocaleLowerCase()) || String(trans.trans_id).toLowerCase().startsWith(searchValue.toLocaleLowerCase()))
            setRecords(filtered)
        } else {
            setRecords(mainData)
        }
    }
    return (
        <AdminPageLayout>
            <div className='w-full'>
                <div className='w-11/12 mx-auto'>
                <div className=" text-lg font-bold w-full text-center capitalize">See Latest withdrawal requests</div>
                <div className="relative overflow-x-auto rounded-md mt-10">
                    <table className="w-full text-sm text-center rtl:text-right">
                        <thead className=" bg-primary text-base poppins ">
                            <tr>
                                {Topheaders.map((item, i) => (
                                    <th key={i} scope="col" className="px-3 text-lightgreen py-3">{item}</th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(dummy) && dummy.length > 1 ? dummy.map((item, i) => (
                                <tr className=" border-b " key={i}>
                                    <th scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                        {item.id}
                                    </th>
                                    <td className="px-3 py-3">
                                        {item.fullname}
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
                                <tr className=" w-full text-lg  font-semibold ">
                                    <td>No withdrawal requests  </td>
                                </tr>
                            }

                        </tbody>
                    </table>


                </div>
            </div>
            </div>
        </AdminPageLayout>
    )
}

export default AdminBankWithdrawals