import React from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link } from 'react-router-dom'

const AdminEditTestimonial = () => {
  return (
    <AdminPageLayout>
        <div className="w-11/12 mx-auto">
        <Link to={`/admin/testimonials`}>back to testimonials</Link>
        </div>
    </AdminPageLayout>
  )
}

export default AdminEditTestimonial