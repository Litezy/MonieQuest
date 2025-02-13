import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
;

const Comments = ({ i,param,feature }) => {
  const [reply, setReply] = useState(false)
  const [showComments, setShowComments] = useState(false)

  return (
    <div className='w-full px-4 relative py-2 rounded-md bg-primary/20 '>
{/* 
      {showComments &&

        <ModalLayout setModal={setShowComments} clas={`lg:w-5/6 w-11/12 mx-auto scroll`}>
          <div className="w-full bg-primary  p-5 rounded-md ">
            <div className="flex items-start gap-52 md:gap-0 lg:justify-between w-full">
              <div className="flex items-start  gap-2">
                <div className="p-2 rounded-full bg-white ">
                  <FaUser className='text-primary text-2xl' />
                </div>
                <div className="flex items-start flex-col  text-base">
                  <div className="text-white font-bold lg:text-xl">Basir ahmed</div>
                  <div className="text-xs text-gray-500">11 min ago</div>
                </div>
              </div>
            </div>
            <div className="poppins mt-2">This is the actual comment. It's can be long or short. And must contain only text information.</div>

            <div className="mt-10 mb-5 poppins font-bold text-xl ">Top 5 replies</div>
            <div className="ml-5 lg:ml-10">
              {new Array(5).fill(0, 1, 5).map((_, j) => {
                return (
                  <div className="mb-5 w-full">
                    <div className="flex items-start  gap-2">
                      <div className="p-2 rounded-full bg-white ">
                        <FaUser className='text-primary text-2xl' />
                      </div>
                      <div className="flex items-start flex-col  text-base">
                        <div className="text-white font-bold lg:text-xl">Basir ahmed</div>
                        <div className="text-xs text-gray-500">11 min ago</div>
                      </div>
                    </div>
                    <div className="poppins mt-2">This is the actual comment. It's can be long or short. And must contain only text information.</div>
                  </div>
                )
              })}
              <div className="ml-auto w-fit ">
                <Link 
                to={`/blogs/${feature}/${param}/comment/${i+1}`} onClick={MoveToTop}
                className='px-4 py-1.5 rounded-md bg-ash'>view all comments</Link>
              </div>
            </div>
          </div>


        </ModalLayout>
      } */}

      <div className="w-full flex-col gap-5 flex items-start">
        <div className="flex items-start gap-52 md:justify-between w-full">
          <div className="flex items-start gap-2">
            <div className="p-2 rounded-full bg-white ">
              <FaUser className='text-primary text-2xl' />
            </div>
            <div className="flex items-start flex-col text-base">
              <div className="text-white font-bold lg:text-xl">Basir ahmed</div>
              <div className="text-xs text-gray-500">11 min ago</div>
            </div>
          </div>
         
        </div>
        <div className="poppins ">This is the actual comment. It's can be long or short. And must contain only text information.</div>

      
      </div>
    </div>
  )
}

export default Comments