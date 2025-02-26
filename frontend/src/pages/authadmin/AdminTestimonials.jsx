import React, { useEffect, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import TestimonialDiv from '../../AdminComponents/TestimonialDiv'
import { Apis, AuthGetApi } from '../../services/API'
import Loader from '../../GeneralComponents/Loader'
import { Link } from 'react-router-dom'

const AdminTestimonials = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [monitor, setMonitor] = useState(false)

    const fetchTestimonials = async () => {
        setLoading(true)
        try {
            const res = await AuthGetApi(Apis.user.get_testimonials);
            if (res.status !== 200) return;
            const data = res.data;
            setData(data);
            return data;
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally { setLoading(false) }
    };

    useEffect(() => {
        fetchTestimonials()
    }, [monitor]);
    return (
        <AdminPageLayout>
            {loading ?
                <Loader />
                :
                <div className="w-11/12 mx-auto mb-10 ">
                    <div className=" text-center text-3xl mb-5 font-bold text-">Testimonials</div>
                    {data?.length <= 6 && <Link to={`/admin/testimonials/create`}
                        className="px-3 py-1.5 text-sm rounded-xl bg-white text-dark w-fit">Create New Testimonial</Link>}
                    <div className="mt-10 capitalize">below are current testimonials on monieQuest</div>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {data && data.length > 0 ? data.map((item, i) => (
                            <TestimonialDiv setMonitor={setMonitor} item={item} key={i} />
                        )) :
                            <div className="">No testimonials uploaded </div>
                        }
                    </div>
                </div>
            }
        </AdminPageLayout>
    )
}

export default AdminTestimonials