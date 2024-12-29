import React, { useEffect, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import Loading from '../../GeneralComponents/Loading';

const Blogs = () => {

    const [blogs, setBlogs] = useState([])


    useEffect(() => {
        const fetchCryptoNews = async () => {
            const apiKey = "pub_63262ef8f878b3e6144346a66dee7e82f4633";
            const baseUrl = "https://newsdata.io/api/1/news";
            const query = "crypto";
            const totalResults = 100;
            const lang = `language=en`;

            let allNews = [];
            let nextPage = null;

            do {
                const url = nextPage ? `${baseUrl}?apikey=${apiKey}&q=${query}&${lang}&page=${nextPage}`
                    : `${baseUrl}?apikey=${apiKey}&q=${query}&${lang}`;
                const response = await fetch(url);
                const data = await response.json();
                if (data.results) {
                    allNews = allNews.concat(data.results);
                }
                nextPage = data.nextPage;
            } while (nextPage && allNews.length < totalResults);

            const final = allNews.slice(0, totalResults);
            localStorage.setItem("news", JSON.stringify(final));
            setBlogs(final);
        };

        const localName = "news";
        const storedNews = localStorage.getItem(localName);

        if (storedNews) {
            const parsedNews = JSON.parse(storedNews);
            setBlogs(parsedNews);
        } else {
            fetchCryptoNews().catch(() => {
                console.error("Failed to fetch data.");
            });
        }
    }, []);



    return (
        <PageLayout>
            <div className='pb-20 bg-dark w-full text-gray-200'>
                <div className='pageBg'>
                    <div className='w-full h-full bg-[#212134ea] py-20'>
                        <div className='text-4xl font-bold text-white text-center'>Crypto Blog News</div>
                    </div>
                </div>
                <div className="lg:w-4/5 w-11/12 mx-auto mt-20">
                    <div className="w-full flex flex-col gap-10 items-start">
                        {blogs.length > 0 ? blogs.map((blog, index) => {
                            return (
                                <div key={index} className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-10">
                                    <div className="lg:w-[30%] w-full">
                                        <img src={blog.image_url} className={`w-full `} alt={blog.image_url ? blog.source_id : ''} />
                                    </div>
                                    <div className="lg:w-[70%] w-full flex items-start gap-3">
                                        <div className="">{blog.title}</div>
                                    </div>
                                </div>
                            )
                        })
                            :
                            <div className="w-full bg-white h-32">
                                <Loading />
                            </div>
                        }
                    </div>
                </div>
            </div >
        </PageLayout >
    )
}

export default Blogs