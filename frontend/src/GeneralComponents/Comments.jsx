import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { PiChatTeardropTextFill } from "react-icons/pi";
import { HiChevronDoubleDown } from "react-icons/hi2";
import { Link, useSearchParams } from 'react-router-dom';
import { MoveToTop } from '../utils/pageUtils';
import ModalLayout from '../utils/ModalLayout';

const Comments = ({ i,param,feature }) => {
  const [reply, setReply] = useState(false)
  const [showComments, setShowComments] = useState(false)

  return (
    <div className='w-full px-4 relative py-2 rounded-md bg-primary '>

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
      }

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
          <div onClick={() => setReply(prev => !prev)} className="flex cursor-pointer items-center gap-2 bg-ash rounded-md px-3 py-1 ">
            <FaReply />
            <div className="">reply</div>
          </div>
        </div>
        <div className="poppins ">This is the actual comment. It's can be long or short. And must contain only text information.</div>
        <div
          //  to={`/blogs/id/comment/${i}`}
          onClick={() => setShowComments(prev => !prev)}
          className="w-fit  cursor-pointer rounded-md py-2 px-8 flex items-center gap-2 bg-ash">
          <HiChevronDoubleDown className='hover:animate-bounce' />
          <div className="text-sm">view 5 comments</div>
        </div>
        {reply && <div className="flex items-start flex-col gap-3 w-full poppins">
          <div className="text-lg font-bold  ">New Reply</div>
          <div className="flex items-start lg:flex-row w-full lg:gap-5 gap-3">
            <div className=""><PiChatTeardropTextFill className='text-3xl text-ash' /></div>
            <textarea
              className=' resize-y w-3/4 max-h-52 min-h-20 p-2 rounded-md bg-primary' placeholder='enter your reply'
              name="" id=""></textarea>
          </div>
          <div className="w-full flex items-center justify-center ml-auto gap-3">
            <button onClick={() => setReply(false)} className='w-full bg-gray-600 hover:bg-gray-700 rounded-md py-2'>Cancel</button>
            <button className='w-full bg-ash hover:bg-ash/90 rounded-md py-2'>Reply</button>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Comments