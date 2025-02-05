import React, { useEffect, useState } from "react";
import PageLayout from "../../GeneralComponents/PageLayout";
import testimg from "../../assets/images/pdt.jpg";
import testimg2 from "../../assets/images/pdt2.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MoveToTop } from "../../utils/pageUtils";
import CartComponent from "../../GeneralComponents/CartComponent";
import FormInput from "../../utils/FormInput";

const products = [
  {
    id: 1,
    image: testimg,
    title: "playwrite",
    category: ["Fonts", "AI Tool", "Tech & Solution"],
    price: 6000,
    discount_percentage: 50,
  },
  {
    id: 2,
    image: testimg2,
    title: "the grinch mas",
    category: ["Graphics", "Creative Tool"],
    price: 12000,
    discount_percentage: null,
  },
]


const ProductsPage = () => {
  const localName = 'products'
  const localData = JSON.parse(localStorage.getItem(localName))
  const [cartItems, setCartItems] = useState(localData || []);
  const [dataLoading, setDataLoading] = useState(true)
  const [search, setSearch] = useState('')

  setTimeout(() => {
    setDataLoading(false)
  }, 2000)

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
  };

  const CartButton = (id) => {
    const exists = cartItems.some(ele => ele.id === id)
    return exists ? (
      <span>Added to Cart</span>
    ) : (
      <>
        <IoCart className="text-lg" />
        <span>Add to Cart</span>
      </>
    );
  };

  return (
    <PageLayout>
      <div className="pb-20 bg-dark">
        <div className="pageBg">
          <div className="w-full h-full bg-[#212134ea] py-10">
            <div className="md:text-4xl text-3xl font-bold text-white text-center capitalize">
              profit tools
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto text-gray-200 mt-16">
          <CartComponent cartItems={cartItems} setCartItems={setCartItems} dataLoading={dataLoading} />
          <div className="flex flex-col gap-2 items-center mt-20">
            <div className="text-3xl font-bold text-center">Say Goodbye to Stress, Simplify your Hustle, Maximize your Wealth!
            </div>
            <div className="text-lg font-bold text-center">“Tools you can Trust, Knowledge that pays”</div>
            <div className="flex gap-2 items-center mt-2">
              <FormInput placeholder='Find available tools and eBooks' className='md:!w-96 !w-64 -mt-2' value={search} onChange={(e) => setSearch(e.target.value)} />
              <button className="outline-none w-fit h-fit bg-ash py-2 px-4 text-2xl rounded-lg">
                <IoIosSearch />
              </button>
            </div>
            <div className="mt-2 lg:w-1/2 text-center">Equip yourself with tools and knowledge designed by experts to help you simplify your workflow, manage income effectively and turn your dreams into reality.
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-16">
            {dataLoading ?
              <>
                {new Array(4).fill(0).map((_, i) => (
                  <div key={i} className='w-72 h-80 rounded-[4px] bg-slate-400 animate-pulse'></div>
                ))}
              </>
              :
              <>
                {products.map((item) =>
                  new Array(4).fill().map((_, index) => (
                    <div
                      key={index}
                      className="bg-primary h-fit w-72 rounded-[4px] relative z-10"
                    >
                      {item.discount_percentage &&
                        <>
                          <div className="bg-[#B2212F] text-white text-[0.8rem] uppercase font-extrabold py-1.5 px-3 absolute -top-1 -left-3">
                            {item.discount_percentage}% off
                          </div>
                          <div className="edge"></div>
                        </>
                      }
                      <Link to={`/products/${index}/${item.title}`} onClick={MoveToTop}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 rounded-t-[4px] object-cover object-center"
                        />
                      </Link>
                      <div className="flex flex-col gap-4 px-2 py-4">
                        <div className="flex justify-between items-center">
                          <div className="capitalize text-sm font-bold">
                            {item.title}
                          </div>
                          <FaCheckCircle className="text-lightgreen text-xl" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className='flex gap-1 text-xs text-lightgreen'>
                            {item.category.slice(0, 2).map((ele, i) => (
                              <div key={i} className=''>{ele}{i !== item.category.length - 1 && ','}</div>
                            ))}
                            {item.category.length > 2 && <div>...</div>}
                          </div>
                          <div className="flex gap-2 items-center text-sm font-extrabold">
                            {item.discount_percentage && item.price !== undefined ?
                              <>
                                <div className="text-[#B2212F] underline">
                                  ₦{((100 - item.discount_percentage) / 100 * item.price).toLocaleString()}
                                </div>
                                <div className="line-through">
                                  ₦{item.price.toLocaleString()}
                                </div>
                              </>
                              :
                              <div>₦{(item.price || 0).toLocaleString()}</div>
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
                  ))
                )}
              </>
            }
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
