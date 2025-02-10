import React, { useEffect, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import AdminSummary from '../../AdminComponents/AdminSummary'
import { Apis, AuthGetApi } from '../../services/API'
import { useAtom } from 'jotai'
import { USERS } from '../../services/store'


const AdminDashboard = () => {
    const [data, setData] = useState([])
    const [, setUsers] = useAtom(USERS)
    const [dataLoading, setDataLoading] = useState(true)

    const fetchDashboard = async () => {
        setDataLoading(true)
        try {
            const res = await AuthGetApi(Apis.admin.get_dashboard)
            if (res.status !== 200) return;
            const data = res.data
            setData(data)
            setUsers(data[0])
        } catch (error) {
            console.log(error)
        } finally {
            setDataLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])


    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.map((item, i) => {
                        return (
                            <AdminSummary key={i} item={item} loading={dataLoading} />
                        )
                    })}
                    {/* {dataLoading ?
                        <>
                            {new Array(3).fill(0).map((_, i) => (
                                <div key={i} className='h-32 w-full mb-5 bg-slate-400 animate-pulse rounded-e-xl rounded-tl-lg'>
                                    <div className='w-full h-1/2 bg-slate-500 animate-pulse rounded-lg'></div>
                                </div>
                            ))}
                        </>
                        :
                        <>
                            
                        </>
                    } */}
                </div>
            </div>
        </AdminPageLayout>
    )
}

export default AdminDashboard