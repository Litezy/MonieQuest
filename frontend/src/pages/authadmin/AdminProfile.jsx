import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUser } from "react-icons/hi2";
import { BiSolidEditAlt, BiSolidPhoneCall } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import FormInput from '../../utils/FormInput';
import PasswordInputField from '../../utils/PasswordInputField';
import { CookieName, ErrorAlert, SuccessAlert } from '../../utils/pageUtils';
import FormButton from '../../utils/FormButton';
import AdminPageLayout from '../../AdminComponents/AdminPageLayout';
import ModalLayout from '../../utils/ModalLayout';
import Loader from '../../GeneralComponents/Loader';
import Loading from '../../GeneralComponents/Loading';
import Cookies from 'js-cookie'
import { useAtom } from 'jotai';
import { BANK, PROFILE, UTILS } from '../../services/store';
import avatar from '../../assets/images/avatar.svg'
import { Apis, AuthPostApi, AuthPutApi, imageurl } from '../../services/API';

const AdminProfile = () => {
    const [user, setUser] = useAtom(PROFILE)
    const [bank, setBank] = useAtom(BANK)
    const [utils, setUtils] = useAtom(UTILS)
    const [loading, setLoading] = useState({
        main: false,
        sub1: false,
        sub2: false
    })
    const [form, setForm] = useState({
        first_name: user?.first_name || '',
        surname: user?.surname || '',
        email: user?.email || '',
        username: user?.username || '',
        phone_number: user?.phone_number || '',
        old_password: '',
        new_password: '',
        bank_name: '',
        account_number: '',
        account_name: '',
        exchange_rate: '',
        giftcard_rate: ''
    })
    const [profile, setProfile] = useState({
        img: user.image ? `${imageurl}/profiles/${user.image}` : avatar,
        image: null
    })
    const imgref = useRef()
    const navigate = useNavigate()

    const logoutAccount = () => {
        Cookies.remove(CookieName)
        navigate('/login')
    }

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        setForm({
            ...form,
            bank_name: bank?.bank_name || '',
            account_name: bank?.account_name || '',
            account_number: bank?.account_number || ''
        })
    }, [bank])

    useEffect(() => {
        setForm({
            ...form,
            exchange_rate: utils?.exchange_rate || '',
            giftcard_rate: utils?.giftcard_rate || '',
        })
    }, [utils])

    const handleProfileUpload = (event) => {
        const file = event.target.files[0]
        if (file.size >= 1000000) {
            imgref.current.value = null
            return ErrorAlert('Image size too large, file must not exceed 1mb')
        }
        if (!file.type.startsWith('image/')) {
            imgref.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setProfile({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const Submit = async (e) => {
        e.preventDefault()

        const formbody = new FormData()
        formbody.append('image', profile.image)
        formbody.append('first_name', form.first_name)
        formbody.append('surname', form.surname)
        formbody.append('email', form.email)
        formbody.append('phone_number', form.phone_number)
        formbody.append('old_password', form.old_password)
        formbody.append('new_password', form.new_password)

        setLoading({
            main: true
        })
        try {
            const response = await AuthPutApi(Apis.user.update_profile, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                setUser(response.user)
                setForm({
                    ...form,
                    old_password: '',
                    new_password: ''
                })
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading({
                main: false
            })
        }
    }

    const AddBankAccount = async () => {
        if (!form.account_number || !form.account_name || !form.bank_name) return ErrorAlert('Enter all fields')
        const formbody = {
            bank_name: form.bank_name,
            account_number: form.account_number,
            account_name: form.account_name
        }

        setLoading({
            sub1: true
        })
        try {
            const response = await AuthPostApi(Apis.user.create_update_bank, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                setBank(response.bank)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading({
                sub1: false
            })
        }
    }

    const UpdateUtils = async () => {
        if (!form.exchange_rate || !form.giftcard_rate) return ErrorAlert('Enter all fields')
        if(isNaN(form.exchange_rate) || isNaN(form.giftcard_rate)) return ErrorAlert('Enter valid numbers')

        const formbody = {
            exchange_rate: parseFloat(form.exchange_rate),
            giftcard_rate: parseFloat(form.giftcard_rate)
        }

        setLoading({
            sub2: true
        })
        try {
            const response = await AuthPutApi(Apis.admin.update_utils, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                setUtils(response.utils)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading({
                sub2: false
            })
        }
    }


    return (
        <AdminPageLayout>
            <div>
                {loading.main &&
                    <ModalLayout clas={`w-11/12 mx-auto`}>
                        <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                            <Loader />
                            <div>...submitting</div>
                        </div>
                    </ModalLayout>
                }
                <div className='h-36 w-full -mt-10 py-8 bg-gradient-to-br from-ash to-primary'>
                    <div className='w-11/12 mx-auto flex gap-2 justify-end items-center text-2xl font-bold uppercase mt-14'>
                        <span>profile</span>
                        <FaRegUserCircle className='text-lightgreen' />
                    </div>
                </div>
                <div className="w-11/12 mx-auto">
                    <div className='flex md:flex-row flex-col justify-between'>
                        <div className='flex flex-col gap-4 -mt-20'>
                            <div className='relative w-fit'>
                                <img src={profile.img} className='h-44 w-44 object-cover border-8 border-[#141523] bg-primary rounded-full'></img>
                                <label>
                                    <div className='bg-primary rounded-full w-fit h-fit p-2 text-xl absolute bottom-4 right-0 border border-secondary cursor-pointer text-lightgreen'>
                                        <BiSolidEditAlt />
                                    </div>
                                    <input ref={imgref} type="file" onChange={handleProfileUpload} hidden />
                                </label>
                            </div>
                            <div className='text-2xl font-bold capitalize'>{user?.first_name} {user?.surname}</div>
                            <div className='flex gap-1 items-center text-sm'>
                                <div className='capitalize'>admin / moderator</div>
                                <MdOutlineAdminPanelSettings className='text-lightgreen text-lg' />
                            </div>
                        </div>
                        <div className='bg-primary w-fit h-fit py-1.5 px-5 rounded-lg md:text-base text-sm text-red-600 font-medium flex gap-1 items-center mt-4 cursor-pointer hover:bg-[#2f2f47]' onClick={logoutAccount}>
                            <IoLogOut />
                            <span>Log out</span>
                        </div>
                    </div>
                    <form className='flex flex-col gap-8 mt-16' onSubmit={Submit}>
                        <div className='flex flex-col gap-5'>
                            <div className='text-xl capitalize font-medium text-lightgreen'>personal details</div>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                                <div className='relative'>
                                    <FormInput label='First name' placeholder='Your first name' name='first_name' value={form.first_name} onChange={formHandler} className='!pl-4 !pr-10' />
                                    <HiUser className='absolute top-11 right-3 text-xl text-gray-400' />
                                </div>
                                <div className='relative'>
                                    <FormInput label='Surname' placeholder='Your surname' name='surname' value={form.surname} onChange={formHandler} className='!pl-4 !pr-10' />
                                    <HiUser className='absolute top-11 right-3 text-xl text-gray-400' />
                                </div>
                                <div className='relative'>
                                    <FormInput label='Email address' placeholder='example@gmail.com' name='email' value={form.email} onChange={formHandler} type='email' className='!pl-4 !pr-10' />
                                    <MdEmail className='absolute top-11 right-3 text-xl text-gray-400' />
                                </div>
                                <div className='relative'>
                                    <FormInput label='Phone number' placeholder='Phone number' name='phone_number' value={form.phone_number} onChange={formHandler} className='!pl-4 !pr-10' />
                                    <BiSolidPhoneCall className='absolute top-11 right-3 text-xl text-gray-400' />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-xl capitalize font-medium text-lightgreen'>password & security</div>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                                <PasswordInputField label='Old password' placeholder='Enter old password' name='old_password' value={form.old_password} onChange={formHandler} className={{ icon: '!text-gray-400' }} />
                                <PasswordInputField label='New password' placeholder='Create new password' name='new_password' value={form.new_password} onChange={formHandler} className={{ icon: '!text-gray-400' }} />
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1'>
                            <FormButton title='Save changes' />
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-xl capitalize font-medium text-lightgreen'>add a bank account</div>
                            <div className='w-fit h-fit bg-primary rounded-2xl p-4 flex flex-col gap-1 relative'>
                                {loading.sub1 && <Loading />}
                                <FormInput placeholder='Account number' name='account_number' value={form.account_number} onChange={formHandler} className='!bg-secondary !w-64' border={false} />
                                <FormInput placeholder='Account name' name='account_name' value={form.account_name} onChange={formHandler} className='!bg-secondary !w-64' border={false} />
                                <FormInput placeholder='Bank name' name='bank_name' value={form.bank_name} onChange={formHandler} className='!bg-secondary !w-64' border={false} />
                                <FormButton title={Object.keys(bank).length !== 0 ? 'Update' : 'Save'} className='!py-3 !text-base mt-2' type='button' onClick={AddBankAccount} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-xl capitalize font-medium text-lightgreen'>update settings</div>
                            <div className='w-fit h-fit bg-primary rounded-2xl p-4 flex flex-col gap-1 relative'>
                                {loading.sub2 && <Loading />}
                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col'>
                                        <div className='font-medium text-gray-200 ml-2'>Exchange rate:</div>
                                        <FormInput placeholder='Enter rate amount' name='exchange_rate' value={form.exchange_rate} onChange={formHandler} className='!bg-secondary !w-64' border={false} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='font-medium text-gray-200 ml-2'>Giftcard rate:</div>
                                        <FormInput placeholder='Enter rate amount' name='giftcard_rate' value={form.giftcard_rate} onChange={formHandler} className='!bg-secondary !w-64' border={false} />
                                    </div>
                                </div>
                                <FormButton title='Update' className='!py-3 !text-base mt-2' type='button' onClick={UpdateUtils} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminPageLayout>
    )
}

export default AdminProfile