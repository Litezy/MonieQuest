import React from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { airdropsfaqs, exchangefaqs, generalfaqs, profitfaqs } from '../../utils/pageUtils'

const FAQS = () => {
    return (
        <PageLayout>
            <div className="bg-dark text-zinc-300 ">
                <div className="pageBg">
                    <div className="w-full h-full bg-[#212134ea] py-10">
                        <div className="md:text-4xl text-3xl font-bold text-white text-center capitalize">
                            FAQs
                        </div>
                    </div>
                </div>

                <div className="w-11/12 mx-auto text-lg">
                    <div className="flex items-start gap-10 mt-10 flex-col">
                        <div className="flex items-start gap-3 flex-col">
                            <div className="text-3xl font-bold text-lightgreen">General Questions</div>
                            <div className="">{generalfaqs.map((que,i)=>{
                                return (
                                    <div key={i} className="flex items-start gap-1 mb-5 flex-col ">
                                        <div className="text-lightgreen/80">{que.title}</div>
                                        <div className="">{que.desc}</div>
                                    </div>
                                )
                            })}</div>
                        </div>
                        <div className="flex items-start gap-3 flex-col">
                            <div className="text-3xl font-bold text-lightgreen">Airdrop Questions</div>
                            <div className="">{airdropsfaqs.map((que,i)=>{
                                return (
                                    <div key={i} className="flex items-start gap-1 mb-5 flex-col py-2 ">
                                        <div className="text-lightgreen/80">{que.title}</div>
                                        <div className="">{que.desc}</div>
                                    </div>
                                )
                            })}</div>
                        </div>
                        <div className="flex items-start gap-3 flex-col">
                            <div className="text-3xl font-bold text-lightgreen">Exchange Questions</div>
                            <div className="">{exchangefaqs.map((que,i)=>{
                                return (
                                    <div key={i} className="flex items-start gap-1 mb-5 flex-col py-2 ">
                                        <div className="text-lightgreen/80">{que.title}</div>
                                        <div className="">{que.desc}</div>
                                    </div>
                                )
                            })}</div>
                        </div>
                        <div className="flex items-start gap-3 flex-col">
                            <div className="text-3xl font-bold text-lightgreen">Profit Tools Questions</div>
                            <div className="">{profitfaqs.map((que,i)=>{
                                return (
                                    <div key={i} className="flex items-start gap-1 mb-5 flex-col py-2 ">
                                        <div className="text-lightgreen/80">{que.title}</div>
                                        <div className="">{que.desc}</div>
                                    </div>
                                )
                            })}</div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default FAQS