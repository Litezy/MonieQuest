import toast from 'react-hot-toast';

export const ErrorAlert = (message) => {
    return toast.error(message, {
        position: "top-center",
    })
}

export const SuccessAlert = (message) => {
    return toast.success(message, {
        position: "top-center"
    })
}

export const MoveToTop = () => {
    document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}