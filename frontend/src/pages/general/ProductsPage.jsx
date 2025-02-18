import React, { useEffect, useState } from "react";
import PageLayout from "../../GeneralComponents/PageLayout";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MoveToTop } from "../../utils/pageUtils";
import CartComponent from "../../GeneralComponents/CartComponent";
import FormInput from "../../utils/FormInput";
import { Apis, GetApi, imageurl } from "../../services/API";


const ProductsPage = () => {
  const [staticData, setStaticData] = useState([])
  const [products, setProducts] = useState([])
  const localName = 'products'
  const localData = JSON.parse(localStorage.getItem(localName))
  const [cartItems, setCartItems] = useState(localData || []);
  const [dataLoading, setDataLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [submitBtn, setSubmitBtn] = useState(false)

  useEffect(() => {
    const FetchAllListedProducts = async () => {
      try {
        const response = await GetApi(Apis.admin.listed_products)
        if (response.status === 200) {
          setStaticData(response.msg)
          setProducts(response.msg)
        }
      } catch (error) {
        //
      } finally {
        setDataLoading(false)
      }
    }
    FetchAllListedProducts()
  }, [])

  useEffect(() => {
    if (!localData) {
      localStorage.setItem(localName, JSON.stringify([]))
    }
  }, [cartItems])

  const AddToCart = (item) => {
    const findIfCartExist = cartItems.find((ele) => ele.id === item.id);
    if (!findIfCartExist) {
      setCartItems([...cartItems, item]);
      const currentData = JSON.parse(localStorage.getItem(localName))
      currentData.push(item)
      localStorage.setItem(localName, JSON.stringify(currentData))
    }
  }

  const CartButton = (id) => {
    const exists = cartItems.some(ele => ele.id === id)
    return exists ? (
      <span>Added to Cart</span>
    ) : (
      <>
        <IoCart className="text-lg" />
        <span>Add to Cart</span>
      </>
    )
  }

  const filterProducts = () => {
    const mainData = staticData
    if (search.length > 2) {
      const filtered = mainData.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || item.gen_id.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || item.category.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || item.feature1.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || item.feature2.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      setProducts(filtered)
    } else {
      setProducts(staticData)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSubmitBtn(true)
      } else {
        setSubmitBtn(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <PageLayout>
      {submitBtn &&
        <div
          data-aos='fade-up-left' data-aos-duration="1000"
          className="fixed z-40 rounded-full cursor-pointer right-5 top-1/2">
          <Link to={`/login`} className="w-fit px-4 py-2 bg-ash text-white rounded-md">Submit your product</Link>
        </div>}
      <div className="pb-20 bg-dark">
        <div className="pageBg">
          <div className="w-full h-full bg-[#212134ea] py-10">
            <div className="md:text-4xl text-3xl font-bold text-white text-center capitalize">
              products
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto text-gray-200 mt-16">
          <CartComponent cartItems={cartItems} setCartItems={setCartItems} dataLoading={dataLoading} />
          <div className="flex flex-col gap-2 items-center mt-20">
            <div className="text-3xl font-bold text-center">Say Goodbye to Stress, Simplify your Hustle, Maximize your Wealth!
            </div>
            <div className="text-lg font-bold text-center">“Products you can Trust, Knowledge that pays”</div>
            <div className="flex gap-2 items-center mt-2">
              <FormInput placeholder='Find available tools and eBooks' className='md:!w-96 !w-64' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={filterProducts} />
              <button className="outline-none w-fit h-fit bg-ash py-2 px-4 text-2xl rounded-lg" onClick={filterProducts}>
                <IoIosSearch />
              </button>
            </div>
            <div className="mt-2 lg:w-1/2 text-center">Equip yourself with tools and knowledge designed by experts to help you simplify your workflow, manage income effectively and turn your dreams into reality.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            {dataLoading ?
              <>
                {new Array(4).fill(0).map((_, i) => (
                  <div key={i} className='w-72 h-80 rounded-[4px] bg-slate-400 animate-pulse p-1'>
                    <div className="w-full h-48 bg-slate-500 rounded-t-[4px]"></div>
                  </div>
                ))}
              </>
              :
              <>
                {products.length > 0 ?
                  <>
                    {products.map((item, i) => {
                      const categories = item.category ? JSON.parse(item.category) : []
                      return (
                        <div key={i} className="bg-primary h-fit md:w-full w-11/12 mx-auto rounded-[4px] relative z-10">
                          {item.discount_percentage &&
                            <>
                              <div className="bg-red-700 text-white text-[0.8rem] uppercase font-extrabold py-1.5 px-3 absolute -top-1 -left-3">
                                {item.discount_percentage}% off
                              </div>
                              <div className="edge"></div>
                            </>
                          }
                          <Link to={`/products/${item.id}/${item.slug}`} onClick={MoveToTop}>
                            <img
                              src={`${imageurl}/products/${item.image}`}
                              alt='product image'
                              className="w-full h-48 rounded-t-[4px] object-cover object-center"
                            />
                          </Link>
                          <div className="flex flex-col gap-4 px-2 py-4">
                            <div className="flex justify-between items-center">
                              <div className="capitalize text-sm font-bold">
                                {item?.title}
                              </div>
                              <FaCheckCircle className="text-lightgreen text-xl" />
                            </div>
                            <div className="flex justify-between gap-4 items-center">
                              <div className="w-full overflow-x-auto scrollsdown cursor-all-scroll">
                                <div className="w-fit">
                                  {categories.length > 0 &&
                                    <div className='flex gap-1 text-xs text-lightgreen truncate'>
                                      {categories.map((ele, i) => (
                                        <div key={i}>{ele}{i !== categories.length - 1 && ','}</div>
                                      ))}
                                    </div>
                                  }
                                </div>
                              </div>
                              <div className="flex gap-2 items-center text-sm font-extrabold">
                                {item.discount_percentage && item.price ?
                                  <>
                                    <div className="text-red-700 underline">
                                      ₦{((100 - item.discount_percentage) / 100 * item.price).toLocaleString()}
                                    </div>
                                    <div className="line-through">
                                      ₦{item.price.toLocaleString()}
                                    </div>
                                  </>
                                  :
                                  <div>₦{item.price.toLocaleString()}</div>
                                }
                              </div>
                            </div>
                            <button
                              className="outline-none w-full h-fit flex gap-2 items-center justify-center py-2 bg-ash hover:bg-secondary uppercase text-sm font-semibold rounded-[4px] text-white tracking-wider"
                              onClick={() => AddToCart(item)}
                            >
                              {CartButton(item.id)}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </>
                  :
                  <div className="flex justify-center items-center mx-auto col-span-4">
                    <div className="text-center bg-primary py-2 px-4 rounded-md">No products found...</div>
                  </div>
                }
              </>
            }
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
