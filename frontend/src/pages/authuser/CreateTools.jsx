import React, { useRef, useState } from 'react'
import { GiCheckMark } from "react-icons/gi";
import { SlClock } from "react-icons/sl";
import { FiUploadCloud } from 'react-icons/fi'
import { MdOutlineEdit } from 'react-icons/md'
import { Link } from 'react-router-dom';
import ProfitToolsLayout from '../../AuthComponents/ProfitToolsLayout';
import { ErrorAlert } from '../../utils/pageUtils';
import ModalLayout from '../../utils/ModalLayout';
import Loading from '../../GeneralComponents/Loading';

const aiTools = [
  "Test-to-Image", "Test-to-Text", "code generators", "AI assistants"
]
const creativeTools = [
  "graphics design resources", "image editors", "video editors", "animation and 3d modelling tools"
]
const productivityTools = [
  "workflow optimizers", "task and time management tools", "collaboration platforms"
]
const businessResources = [
  "marketing strategies", "sales funnels", "financial planning and investment guides"
]
const learningDevelopment = [
  "tutorials and guides", "eBooks on personal growth", "online course resources"
]
const mediaGenerators = [
  "video creation tools", "meme and content generators", "audio and music creation tools"
]
const automationTools = [
  "data management systems", "task automation platforms", "software integration tools"
]
const techSolutions = [
  "upscaling tools", "bug tracking and debugging tools", "cloud management tools"
]
const eBooks = [
  "how to guides", "industry insights", "case studies and white papers"
]


const CreateTools = () => {
  const [screen, setScreen] = useState(1)
  const [select, setSelect] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    textField: '',
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

  const Submit = (e) => {
    e.preventDefault()
    setScreen(3)
  }

  return (
    <ProfitToolsLayout>
      <div className='w-11/12 mx-auto'>
        {loading &&
          <ModalLayout>
            <div className="flex gap-5 flex-col mx-auto">
              <Loading />
              <div className="mt-20 text-white">...Submitting</div>
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
              <button className='bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-fit h-fit py-3 px-16 rounded-lg outline-none uppercase font-bold mx-auto' onClick={() => setScreen(2)}>continue</button>
            </div>
          </div>
        }
        {screen === 2 &&
          <form onSubmit={Submit} className='flex flex-col gap-12'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-3 font-bold text-lg'>
                  <span>1.</span>
                  <span>Pick the Type of Tool or eBook
                  </span>
                </div>
                <div className='text-sm'>(Choose the category that best describes your submission)</div>
              </div>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-12 items-start'>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>AI Tools
                    </div>
                    {aiTools.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item} {item === 'AI assistants' && <span>(<span className='lowercase'>e.g.,</span> chatbots, writing tools)</span>}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Creative Tools
                    </div>
                    {creativeTools.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Productivity Tools
                    </div>
                    {productivityTools.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Business Resources
                    </div>
                    {businessResources.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Learning and Skill Development
                    </div>
                    {learningDevelopment.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Media Generators
                    </div>
                    {mediaGenerators.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Automation and Utility Tools
                    </div>
                    {automationTools.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>Tech and Software Solutions
                    </div>
                    {techSolutions.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>eBooks and Written Guides
                    </div>
                    {eBooks.map((item, i) => (
                      <div className='flex gap-3' key={i}>
                        <div className={`w-4 h-4 rounded-full cursor-pointer ${select === item ? 'bg-lightgreen' : ' border border-white'}`} onClick={() => setSelect(item)}></div>
                        <div className='text-sm capitalize'>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex gap-3 items-baseline'>
                  <GiCheckMark className='text-sm' />
                  <div className='flex flex-col gap-3'>
                    <div className='font-bold'>other
                    </div>
                    <div className='flex flex-col gap-2'>
                      <div className='text-sm'>Specify Your Tool or eBook Category</div>
                      <textarea className='outline-none border border-white lg:text-sm text-base w-72 h-24 bg-transparent resize-none' placeholder='Explain what your tool can do here...' name='textField' value={form.textField} onChange={formHandler}></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='font-bold text-lg'>2.</div>
              <div className='flex flex-col gap-2'>
                <div className='font-bold text-lg'>Pricing</div>
                <div className='text-sm'>Enter the price you want to sell your tool or eBook for.</div>
                <div className='flex'>
                  <div className='w-fit h-fit p-4 border border-white uppercase text-xs'>ngn</div>
                  <input className='outline-none border border-white text-base w-72 h-fit p-3 bg-transparent iptt' placeholder='Amount' name='price' value={form.price} onChange={formHandler}></input>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='font-bold text-lg'>3.</div>
              <div className='flex flex-col gap-2'>
                <div className='font-bold text-lg'>Tool Details</div>
                <input className='outline-none border border-white text-base w-72 h-fit p-3 bg-transparent iptt' placeholder='Enter Title' name='title' value={form.title} onChange={formHandler}></input>
                <textarea className='outline-none border border-white lg:text-sm text-base w-72 h-28 bg-transparent resize-none' placeholder='What is this tool about?' name='about_tool' value={form.about_tool} onChange={formHandler}></textarea>
                <input className='outline-none border border-white w-72 h-fit p-3 bg-transparent iptt' placeholder='Key Feature1' name='feature1' value={form.feature1} onChange={formHandler}></input>
                <input className='outline-none border border-white w-72 h-fit p-3 bg-transparent iptt' placeholder='Key Feature2' name='feature2' value={form.feature2} onChange={formHandler}></input>
                <label className='cursor-pointer'>
                  {toolImage.img ?
                    <div className='flex items-center gap-1'>
                      <img src={toolImage.img} className='h-44 w-72 object-cover'></img>
                      <div className='text-sm bg-primary rounded-lg p-2 sha'>
                        <MdOutlineEdit />
                      </div>
                    </div>
                    :
                    <div className='w-72 h-44 border rounded-lg flex flex-col gap-2 items-center justify-center'>
                      <div className='bg-primary rounded-full p-4'><FiUploadCloud /></div>
                      <span className='text-xs'>click to add image</span>
                    </div>
                  }
                  <input ref={imgref} type="file" onChange={handleUpload} hidden />
                </label>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='font-bold text-lg'>4.</div>
              <div className='flex flex-col gap-2'>
                <div className='font-bold text-lg'>Payment Details</div>
                <input className='outline-none border border-white text-base w-72 h-fit p-3 bg-transparent iptt' placeholder='Select Bank' name='bank' value={form.bank} onChange={formHandler}></input>
                <input className='outline-none border border-white text-base w-72 h-fit p-3 bg-transparent iptt' placeholder='Account Details' name='account_number' value={form.account_number} onChange={formHandler}></input>
                <input className='outline-none border border-white text-base w-72 h-fit p-3 bg-transparent iptt' placeholder='Account Name' name='account_name' value={form.account_name} onChange={formHandler}></input>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='font-bold text-lg'>5.</div>
              <div className='flex flex-col gap-2'>
                <div className='font-bold text-lg'>Video Link</div>
                <input className='outline-none border border-white text-base w-72 h-fit p-3 bg-transparent iptt' placeholder='Insert URL to the tool or eBook Demo' name='video_url' value={form.video_url} onChange={formHandler}></input>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='font-bold text-lg'>6.</div>
              <div className='flex flex-col gap-2'>
                <div className='font-bold text-lg'>Contact Details</div>
                <input className='outline-none border border-white text-base w-72 h-fit p-3 bg-transparent iptt' placeholder='WhatsApp or Phone Number' name='phone' value={form.phone} onChange={formHandler}></input>
              </div>
            </div>
            <div className='md:w-2/5 w-full'>
              <div className='flex flex-col gap-4 items-center'>
                <div className=''>We Accept: AI tools, eBooks, Productive tools, Creative resources and lots
                  More! All submissions are manually reviewed by our staff.</div>
                <button className='bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-fit h-fit py-3 px-16 rounded-lg outline-none uppercase font-bold' onClick={() => setScreen(2)}>submit</button>
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