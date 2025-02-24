import React, { useEffect, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import TestimonialDiv from '../../AdminComponents/TestimonialDiv'
import { Apis, AuthGetApi } from '../../services/API'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'

const AdminTestimonials = () => {

    const [loading, setLoading] = useState(false)
    const localName = 'Testimonials';
    const [data,setData] = useState([])

    const fetchTestimonials = async () => {
        setLoading(true)
        try {
            const res = await AuthGetApi(Apis.user.get_testimonials);
            if (res.status !== 200) return;
            const data = res.data;
            localStorage.setItem(localName, JSON.stringify(data));
            setData(data);
            return data;
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally { setLoading(false) }
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(localName));
        if (storedData && storedData.length > 0) {
            setData(storedData);
        } else {
            localStorage.setItem(localName, JSON.stringify([]))
            fetchTestimonials();
        }
    }, []);
    return (
        <AdminPageLayout>
            {loading ?
                <ModalLayout >
                    <Loader />
                </ModalLayout> :
                <div className="w-11/12 mx-auto ">
                    <div className="my-10 text-center text-3xl font-bold text-">Testimonials</div>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {data && data.length > 0 && data.map((item, i) => (
                            <TestimonialDiv item={item} key={i} />
                        ))}
                    </div>
                </div>
            }
        </AdminPageLayout>
    )
}

export default AdminTestimonials