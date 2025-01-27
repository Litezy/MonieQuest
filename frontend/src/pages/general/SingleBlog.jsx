import React from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import img1 from '../../assets/images/blog1.jpg'
import { CiLink } from "react-icons/ci";
import { IoChevronForwardSharp } from "react-icons/io5";
import FormInput from '../../utils/FormInput';
import Comments from '../../GeneralComponents/Comments';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
    const parapgraphs = [
        `Main header`,
        `First paragraph`,
        `Second paragraph`,
        `Extras paragraph`,
        `Conclusion`,
    ]

    const { feature, id } = useParams()
    return (
        <PageLayout>
            <div className='w-full bg-dark py-10 text-white'>
                <div className="w-11/12 mx-auto">
                    <div className="w-full flex items-start gap-5 flex-col lg:flex-row">
                        <div className="lg:w-[30%] w-full p-2">
                            <div className="flex items-start flex-col gap-20">
                                <img src={img1} alt="blog" className="w-full rounded-xl max-h-52 object-cover " />
                                <div className="w-full flex items-start flex-col gap-2">
                                <div className="poppins font-bold text-2xl">Table of contents</div>
                                  {parapgraphs.map((item,i)=>{
                                    return (
                                        <div key={i} className={`cursor-pointer hover:text-lightgreen mont `}>{item}</div>
                                    )
                                  })}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[70%] w-full ">
                            <div className="flex items-start w-full justify-between">
                                <div className="flex items-start gap-2">
                                    <img src={img1} alt="blog" className=" rounded-full h-10 w-10 object-cover " />
                                    <div className="flex items-start flex-col gap-1 text-sm">
                                        <div className="mont">Mark Osborne</div>
                                        <div className="text-xs text-gray-400">Updated on 03 Dec, 2024</div>
                                        <div className="text-xs text-gray-400">Written on 03 Dec, 2023</div>
                                    </div>
                                </div>
                                <div className="">
                                    <CiLink className='text-3xl cursor-pointer text-sky-400' />
                                </div>
                            </div>
                            <div className="mt-5 text-sky-400 text-sm flex items-center gap-2">
                                <div className="">blogs</div>
                                <div className=""><IoChevronForwardSharp /></div>
                                <div className=" lowercase">Airdrops</div>
                            </div>
                            <div className="mt-5 text-[1.8rem] leading-[33px] font-bold poppins "> Main Header</div>
                            <div className="flex items-start poppins flex-col gap-16 mt-8 text-gray-400">
                                <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aut id natus ratione fugit? Animi sint tempora consequatur assumenda sapiente illo deleniti minima repellendus debitis voluptatibus doloribus asperiores expedita voluptate facere inventore natus, dolorem accusamus sed ullam ipsum. Odio, porro. Eos fugit alias architecto laboriosam quasi dicta aperiam expedita quaerat!</div>
                                <div className="flex items-start gap-2 flex-col">
                                    <div className="text-white font-bold leading-[33px] text-2xl poppins ">First Paragragh</div>
                                    <div className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque debitis et neque eius facilis deserunt, tenetur, laborum dicta esse ratione maiores omnis reiciendis necessitatibus dolores minus quaerat ut doloribus vitae hic eaque. Dolorem culpa corporis quae non? Fuga non repellat praesentium illo deleniti, nostrum, voluptatem id aut dicta eius omnis, placeat debitis? Eligendi sapiente nam aperiam, officiis esse sint eum sed vero dolorum obcaecati dolorem laudantium, libero est molestias sit tempore quam? Sequi ullam, earum veritatis tempore, doloribus vero ipsa at, similique ipsum cum nam commodi libero quam? Est dolorum molestias nobis beatae temporibus ab hic provident nihil corrupti pariatur.</div>
                                </div>
                                <div className="flex items-start gap-2 flex-col">
                                    <div className="text-white font-bold leading-[33px] poppins  text-2xl">Second Paragraph.</div>
                                    <div className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque debitis et neque eius facilis deserunt, tenetur, laborum dicta esse ratione maiores omnis reiciendis necessitatibus dolores minus quaerat ut doloribus vitae hic eaque. Dolorem culpa corporis quae non? Fuga non repellat praesentium illo deleniti, nostrum, voluptatem id aut dicta eius omnis, placeat debitis? Eligendi sapiente nam aperiam, officiis esse sint eum sed vero dolorum obcaecati dolorem laudantium, libero est molestias sit tempore quam? Sequi ullam, earum veritatis tempore, doloribus vero ipsa at, similique ipsum cum nam commodi libero quam? Est dolorum molestias nobis beatae temporibus ab hic provident nihil corrupti pariatur.</div>
                                </div>
                                <div className="flex items-start gap-2 flex-col">
                                    <div className="text-white font-bold leading-[33px] poppins  text-2xl">extras</div>
                                    <div className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed delectus natus ullam laudantium id iste autem unde magni tempora pariatur dolor blanditiis tenetur, porro a repellat nobis quibusdam harum velit eum consequuntur dignissimos consectetur similique excepturi. Magnam rem a quia error eum natus possimus ab perferendis. Corporis perferendis magnam itaque!</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 flex-col my-5">
                        <div className="text-white font-bold leading-[33px] text-2xl poppins ">Conclusion</div>
                        <div className="text-gray-400 poppins">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque debitis et neque eius facilis deserunt, tenetur, laborum dicta esse ratione maiores omnis reiciendis necessitatibus dolores minus quaerat ut doloribus vitae hic eaque. Dolorem culpa corporis quae non? Fuga non repellat praesentium illo deleniti, nostrum, voluptatem id aut dicta eius omnis, placeat debitis? Eligendi sapiente nam aperiam, officiis esse sint eum sed vero dolorum obcaecati dolorem laudantium, libero est molestias sit tempore quam? Sequi ullam, earum veritatis tempore, doloribus vero ipsa at, similique ipsum cum nam commodi libero quam? Est dolorum molestias nobis beatae temporibus ab hic provident nihil corrupti pariatur.</div>
                    </div>

                    <div className="mt-10 w-full   mb-10">
                        <div className="mont text-lg font-bold mb-5 ">Comments</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                            {new Array(5).fill(0).map((_, i) => {
                                return (
                                    <Comments feature={feature} key={i} i={i} param={id} />
                                )
                            })}
                        </div>

                    </div>
                    <form className="w-full p-3 rounded-md bg-primary">
                        <div className="text-lg mont">Leave a comment</div>
                        <div className="flex mt-4 flex-col gap-4 w-full lg:w-3/4">
                            <div className="flex items-center flex-col lg:flex-row gap-5">
                                <div className="w-full">
                                    <FormInput label={`Username`} />
                                </div>
                                <div className="w-full">
                                    <FormInput label={`Email Address`} type='email' />
                                </div>
                            </div>
                            <div className="w-full flex-col  flex items-start gap-2">
                                <div className="text-base">Comment</div>
                                <textarea
                                    className=' resize-y w-full max-h-52 min-h-20 p-2 rounded-md bg-primary' placeholder='enter your comment'
                                    name="" id=""></textarea>
                            </div>
                            <div className="w-1/2 flex items-center justify-center ml-auto">
                                <button className='w-full bg-ash hover:bg-ash/90 rounded-md py-2'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    )
}

export default SingleBlog