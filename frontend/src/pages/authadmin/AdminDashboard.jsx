import React, { useEffect, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import AdminSummary from '../../AdminComponents/AdminSummary'
import { Apis, AuthGetApi } from '../../services/API'

const AdminDashboard = () => {
    const [data, setData] = useState([])

    const fetchDashboard = async () => {
        try {
            const res = await AuthGetApi(Apis.admin.get_dashboard)
            if (res.status !== 200) return;
            const data = res.data
            setData(data)
        } catch (error) {
           console.log(error)
        }
    }
    useEffect(()=>{
        fetchDashboard()
    },[])
    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.map((item, i) => {
                        return (
                            <AdminSummary key={i} item={item} />
                        )
                    })}
                </div>
            </div>
        </AdminPageLayout>
    )
}

export default AdminDashboard