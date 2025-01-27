import React from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { useNavigate } from 'react-router-dom'
import { services } from '../../utils/pageUtils'

const TermsPage = () => {
  const navigate = useNavigate()
  return (
    <PageLayout>
      <div className='bg-dark w-full'>
        <div className='pageBg'>
          <div className='w-full h-full bg-[#212134ea] py-10'>
            <div className='md:text-4xl text-3xl font-bold text-white text-center'>Our Terms of service</div>
          </div>
        </div>
        <div className='w-11/12 mx-auto text-lg pt-5 pb-10'>
          <div className='text-white text-xl'>Welcome to MonieQuest! By accessing our platform, you agree to the terms below.</div>

          <div className="flex text-gray-300 items-start gap-3 flex-col mt-10">
            <div className="w-full flex flex-col">
              <div className="flex text-white mb-2 items-start flex-col gap-3">
                <div className="text-lightgreen">1. Acceptance of terms</div>
                <div className="">By using MonieQuest, you agree to these <span className='text-lightgreen'>Terms and Conditions</span> and our <span onClick={() => navigate('/privacy_policy')} className='text-lightgreen cursor-pointer'>Privacy Policy</span>.</div>
              </div>

              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">2. Account Registration</div>
                <div className="w-full">
                  {services.slice(0, 2).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 ml-10 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className='list-disc '>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">2. Earning Tasks and Rewards</div>
                <div className="w-full">
                  {services.slice(2, 4).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 ml-10 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className='list-disc '>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">4. MonieQuest Exchange</div>
                <div className="w-full">
                  {services.slice(4, 6).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 ml-10 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className='list-disc '>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">5. User-Contributed Tools</div>
                <div className="w-full">
                  {services.slice(6, 7).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 ml-10 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className='list-disc '>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">6. Liability Limitations</div>
                <div className="w-full">
                  {services.slice(7, 9).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 ml-10 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className='list-disc '>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">7. Governing Law</div>
                <div className="w-full">
                  {services.slice(9, 10).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className=''>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">8. Termination</div>
                <div className="w-full">
                  {services.slice(10, 11).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className=''>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">9. Fees</div>
                <div className="w-full">
                  {services.slice(11, 12).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className=''>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="text-lightgreen">10. Modifications to Terms</div>
                <div className="w-full">
                  {services.slice(12, 13).map((item, i) => {
                    return (
                      <ul key={i} className='mb-2 text-gray-300 flex flex-col lg:flex-row gap-1  items-start'>
                        <li className=''>{item}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default TermsPage