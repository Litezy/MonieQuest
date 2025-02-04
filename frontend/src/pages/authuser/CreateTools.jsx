import React, { useEffect, useRef, useState } from 'react'
import { SlClock } from "react-icons/sl";
import { FiUploadCloud } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import ProfitToolsLayout from '../../AuthComponents/ProfitToolsLayout';
import { ErrorAlert } from '../../utils/pageUtils';
import ModalLayout from '../../utils/ModalLayout';
import Loader from '../../GeneralComponents/Loader';
import { bankacc } from '../../AuthComponents/AuthUtils';
import { FaEdit } from 'react-icons/fa';
import FormInput from '../../utils/FormInput';

// const aiTools = [
//   "Test-to-Image", "Test-to-Text", "code generators", "AI assistants"
// ]
// const creativeTools = [
//   "graphics design resources", "image editors", "video editors", "animation and 3d modelling tools"
// ]
// const productivityTools = [
//   "workflow optimizers", "task and time management tools", "collaboration platforms"
// ]
// const businessResources = [
//   "marketing strategies", "sales funnels", "financial planning and investment guides"
// ]
// const learningDevelopment = [
//   "tutorials and guides", "eBooks on personal growth", "online course resources"
// ]
// const mediaGenerators = [
//   "video creation tools", "meme and content generators", "audio and music creation tools"
// ]
// const automationTools = [
//   "data management systems", "task automation platforms", "software integration tools"
// ]
// const techSolutions = [
//   "upscaling tools", "bug tracking and debugging tools", "cloud management tools"
// ]
// const eBooks = [
//   "how to guides", "industry insights", "case studies and white papers"
// ]

const allCategories = [
  "AI Tools", "Creative Tools", "Productivity Tools", "Business Resources", "Learning and Skill Development", "Media Generators", "Automation and Utility Tools", "Tech and Software Solutions", "eBooks and Written Guides"
]


const CreateTools = () => {
  const [screen, setScreen] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    category: [],
    other_category: '',
    price: '',
    title: '',
    about_tool: '',
    feature1: '',
    feature2: '',
    bank: '',
    account_number: '',
    account_name: '',
    video_url: '',
    phone: ''
  })
  const [toolImage, setToolImage] = useState({
    img: null,
    image: null
  })
  const imgref = useRef()

  const formHandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file.size >= 1000000) {
      imgref.current.value = null
      return ErrorAlert('Image size too large, file must not exceed 1mb')
    }
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
    }
    setToolImage({
      img: URL.createObjectURL(file),
      image: file
    })
  }

  const PrefillBank = () => {
    setForm({
      ...form,
      bank: bankacc.bank,
      account_name: bankacc.account_name,
      account_number: bankacc.account_number
    })
  }

  const Submit = (e) => {
    e.preventDefault()
    setScreen(3)
  }

  const addCategory = (val)=>{
    setForm((prev) =>{
      const {category} = prev
      if(category.includes(val)){
        return {
          ...prev,
          category: category.filter(item => item !== val)
        }
      }else{
        return {
          ...prev,
          category: [...category, val]
        }
      }
    })
  }

  useEffect(()=>{
    console.log(form.category)
  },[addCategory])
  return (
    <ProfitToolsLayout>
      <div className='w-11/12 mx-auto'>
        {loading &&
          <ModalLayout clas={`w-11/12 mx-auto`}>
            <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
              <Loader />
              <div>...submitting</div>
            </div>
          </ModalLayout>
        }
        {screen === 1 &&
          <div className='max-w-2xl mx-auto h-fit p-6 border border-gray-400'>
            <div className='flex flex-col gap-4'>
              <div className='md:text-3xl text-2xl uppercase border-b-2 w-fit font-bold'>submit your tools</div>
              <div>If you have a tool, resource, or guide that could benefit others, share it with Us! Each
                submission undergoes a quality review, and once approved, you’ll get paid. Your tool will then
                be featured on our platform for others to discover and use.</div>
              <div className='flex flex-col gap-4 mt-2'>
                <div className='capitalize text-xl font-bold'>submission guidelines:</div>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-2 text-lg font-bold capitalize'>
                    <span>1.</span>
                    <span>video review requirement</span>
                  </div>
                  <div className='flex items-baseline'>
                    <div className='w-[5%]'>
                      <div className='w-2 h-2 rounded-full bg-lightgreen'></div>
                    </div>
                    <span className='w-[95%]'>Upload a demonstration video of your tool or eBook on your preferred social media
                      platform or YouTube.</span>
                  </div>
                  <div className='flex items-baseline'>
                    <div className='w-[5%]'>
                      <div className='w-2 h-2 rounded-full bg-lightgreen'></div>
                    </div>
                    <span className='w-[95%]'>Share the video link with us for review.</span>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-2 text-lg font-bold capitalize'>
                    <span>2.</span>
                    <span>evaluation process</span>
                  </div>
                  <div className='flex items-baseline'>
                    <div className='w-[5%]'>
                      <div className='w-2 h-2 rounded-full bg-lightgreen'></div>
                    </div>
                    <span className='w-[95%]'>Our team will evaluate the tool based on its quality and relevance.</span>
                  </div>
                  <div className='flex items-baseline'>
                    <div className='w-[5%]'>
                      <div className='w-2 h-2 rounded-full bg-lightgreen'></div>
                    </div>
                    <span className='w-[95%]'>If it aligns with our platform's goals, we will proceed to purchase it at your listed price
                      or negotiate if needed.</span>
                  </div>
                  <div className='flex items-baseline'>
                    <div className='w-[5%]'>
                      <div className='w-2 h-2 rounded-full bg-lightgreen'></div>
                    </div>
                    <span className='w-[95%]'>Tools not meeting our standards will be disapproved. We will notify you and explain the reason.</span>
                  </div>
                </div>
              </div>
              <button className='bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-fit h-fit py-3 px-20 rounded-lg outline-none uppercase font-bold mx-auto' onClick={() => setScreen(2)}>continue</button>
            </div>
          </div>
        }
        {screen === 2 &&
          <form onSubmit={Submit} className='grid md:grid-cols-5 grid-cols-1 mt-5'>
            <div className='flex flex-col gap-10 col-span-2'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-3 font-bold text-lg text-lightgreen'>
                    <span>1.</span>
                    <span>Pick the Type of Tool or eBook
                    </span>
                  </div>
                  <div className='text-sm'>(Choose the category that best describes your submission)</div>
                </div>
                <div className='flex flex-col gap-3'>
                  {allCategories.map((item, i) => (
                    <div onClick={()=>addCategory(item)} className='flex gap-3 cursor-pointer' key={i}>
                      <div className='w-5 h-5 border border-white rounded-full flex justify-center items-center' >
                        <div className={`w-3.5 h-3.5 rounded-full cursor-pointer ${form.category.includes(item) && 'bg-lightgreen'}`}></div>
                      </div>
                      <div className='text-sm'>{item}</div>
                    </div>
                  ))}
                  <div className='flex flex-col mt-2'>
                    <div className='text-sm text-lightgreen'>Other? Specify Your Tool or eBook Category:</div>
                    <FormInput formtype='textarea' placeholder='Explain what your tool can do here...' name='other_category' value={form.other_category} onChange={formHandler} className='!w-72 !h-24 !rounded-none' />
                  </div>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='font-bold text-lg text-lightgreen'>2.</div>
                <div className='flex flex-col gap-2 w-full'>
                  <div className='font-bold text-lg text-lightgreen'>Pricing</div>
                  <div className='text-sm'>Enter the price you want to sell your tool or eBook for.</div>
                  <div className='grid grid-cols-6 w-full h-fit items-center'>
                    <div className='col-span-1 h-full flex items-center justify-center border border-gray-400 uppercase text-xs'>ngn</div>
                    <div className='col-span-5'>
                      <FormInput placeholder='Amount' name='price' value={form.price} onChange={formHandler} className='!rounded-none !-mt-2' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='font-bold text-lg text-lightgreen'>3.</div>
                <div className='flex flex-col w-full'>
                  <div className='font-bold text-lg text-lightgreen'>Tool Details</div>
                  <FormInput placeholder='Enter Title' name='title' value={form.title} onChange={formHandler} className='!rounded-none' />
                  <FormInput formtype='textarea' placeholder='What is this tool about?' name='about_tool' value={form.about_tool} onChange={formHandler} className='!rounded-none' />
                  <FormInput formtype='textarea' placeholder='Key Feature1' name='feature1' value={form.feature1} onChange={formHandler} className='!rounded-none !h-16' />
                  <FormInput formtype='textarea' placeholder='Key Feature2' name='feature2' value={form.feature2} onChange={formHandler} className='!rounded-none !h-16' />
                  <label className='cursor-pointer mt-2'>
                    {toolImage.img ?
                      <div className='relative'>
                        <img src={toolImage.img} className='h-56 w-full object-cover object-center'></img>
                        <div className="absolute top-0 -right-3 main font-bold">
                          <FaEdit className='text-2xl text-lightgreen' />
                        </div>
                      </div>
                      :
                      <div className='w-full h-56 border border-dashed rounded-xl flex flex-col gap-2 items-center justify-center'>
                        <div className='bg-primary rounded-full p-4'><FiUploadCloud /></div>
                        <span>click to add image</span>
                      </div>
                    }
                    <input ref={imgref} type="file" onChange={handleUpload} hidden />
                  </label>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='font-bold text-lg text-lightgreen'>4.</div>
                <div className='flex flex-col w-full'>
                  <div className='font-bold text-lg text-lightgreen'>Payment Details</div>
                  <FormInput placeholder='Account Number' name='account_number' value={form.account_number} onChange={formHandler} className='!rounded-none' />
                  <FormInput placeholder='Account Name' name='account_name' value={form.account_name} onChange={formHandler} className='!rounded-none' />
                  <FormInput placeholder='Enter Bank' name='bank' value={form.bank} onChange={formHandler} className='!rounded-none' />
                  <div onClick={PrefillBank} className="w-fit mt-2 px-5 py-2 rounded-md cursor-pointer bg-ash text-white">Use linked account</div>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='font-bold text-lg text-lightgreen'>5.</div>
                <div className='flex flex-col w-full'>
                  <div className='font-bold text-lg text-lightgreen'>Video Link</div>
                  <FormInput placeholder='Insert URL to the tool or eBook Demo' name='video_url' value={form.video_url} onChange={formHandler} className='!rounded-none' />
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='font-bold text-lg text-lightgreen'>6.</div>
                <div className='flex flex-col w-full'>
                  <div className='font-bold text-lg text-lightgreen'>Contact Details</div>
                  <FormInput placeholder='WhatsApp or Phone Number' name='phone' value={form.phone} onChange={formHandler} className='!rounded-none' />
                </div>
              </div>
              <div className='w-full'>
                <div className='flex flex-col gap-4 items-center'>
                  <div className=''>We Accept: AI tools, eBooks, Productive tools, Creative resources and lots
                    More! All submissions are manually reviewed by our staff.</div>
                  <button className='bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-fit h-fit py-3 px-24 rounded-lg outline-none uppercase font-bold' onClick={() => setScreen(2)}>submit</button>
                </div>
              </div>
            </div>
          </form>
        }
        {screen === 3 &&
          <div className='flex flex-col gap-7 items-center max-w-md mx-auto mt-20'>
            <SlClock className='text-8xl' />
            <div className='text-center'>Thank you for your submission! Our team is currently reviewing your demo video. Please allow up to 2 days for us to assess it. We’ll reach out to you via WhatsApp or phone with our feedback soon.</div>
            <Link to="/user/dashboard">
              <button className='bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-fit h-fit py-3 px-16 rounded-lg outline-none uppercase font-bold'>go to dashboard</button>
            </Link>
          </div>
        }
      </div>
    </ProfitToolsLayout>
  )
}

export default CreateTools