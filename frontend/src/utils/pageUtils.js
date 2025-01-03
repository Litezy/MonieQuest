import {toast} from 'sonner'
import customer1 from '../assets/images/customer1.jfif'


export const ErrorAlert = (message) => {
    return toast.error(message, {
        position: "top-center",
        className: 'bg-red-600 text-white ',
    })
}

export const SuccessAlert = (message) => {
    return toast.success(message, {
        position: "top-center",
        className: 'bg-green-600 text-white ',

    })
}
export const errorMessage = (message) => {
    toast.error(message, {
        position: "top-center", 
        className: 'bg-red-600 text-white ',
    });
};
export const successMessage = (message) => {
    return toast.success(message),{
        className: 'bg-green-600 text-white ',
    }
    
}

export const MoveToTop = () => {
    document.documentElement.scrollTo({
        top: 0,
    })
}

export const HomeTestimonials = [
    {
        user: 'henry calvin',
        img: customer1,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Eveniet, accusantium.'
    },
    {
        user: 'henry calvin',
        img: customer1,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Eveniet, accusantium.'
    },
    {
        user: 'henry calvin',
        img: customer1,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Eveniet, accusantium.'
    },
    {
        user: 'henry calvin',
        img: customer1,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam natus deleniti consectetur sed, expedita illo quae sapiente nihil incidunt praesentium, nemo vero esse amet reprehenderit? Architecto, culpa reiciendis! Eveniet, accusantium.'
    },
]
