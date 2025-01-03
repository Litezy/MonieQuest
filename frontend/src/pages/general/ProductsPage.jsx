import React, { useEffect, useState } from "react";
import PageLayout from "../../GeneralComponents/PageLayout";
import testimg from "../../assets/images/pdt.jpg";
import testimg2 from "../../assets/images/pdt2.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MoveToTop } from "../../utils/pageUtils";
import CartComponent from "../../GeneralComponents/CartComponent";

const products1 = [
  {
    id: 1,
    image: testimg,
    title: "playwrite",
    category: "fonts",
    old_price: 6,
    new_price: 3,
  },
];

const products2 = [
  {
    id: 2,
    image: testimg2,
    title: "the grinch mas",
    category: "graphics",
    old_price: 120,
    new_price: 12,
  },
];

const ProductsPage = () => {
  const localName = 'products'
  const localData = JSON.parse(localStorage.getItem(localName))
  const [cartItems, setCartItems] = useState(localData || []);
  const [dataLoading, setDataLoading] = useState(true)

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
          <div className="w-full h-full bg-[#212134ea] py-20">
            <div className="md:text-4xl text-3xl font-bold text-white text-center">
              Products
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto text-gray-200 mt-16">
          <CartComponent cartItems={cartItems} setCartItems={setCartItems} />
          <div className="flex flex-col gap-16 mt-20">
            {/* Popular this week */}
            <div className="flex flex-col gap-8">
              <div className="text-2xl font-bold">Popular this week</div>
              <div className="flex flex-wrap gap-6 justify-center">
                {dataLoading ?
                  <>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-72 h-80 rounded-[4px] bg-slate-400 animate-pulse'></div>
                    ))}
                  </>
                  :
                  <>
                    {products1.map((item) =>
                      new Array(4).fill().map((_, index) => (
                        <div
                          key={index}
                          className="bg-primary h-fit w-72 rounded-[4px] relative z-10"
                        >
                          <>
                            <div className="bg-[#B2212F] text-white text-[0.8rem] uppercase font-extrabold py-1.5 px-3 absolute -top-1 -left-3">
                              90% Off
                            </div>
                            <div className="edge"></div>
                          </>
                          <Link to={`/products/${index}`} onClick={MoveToTop}>
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
                            <div className="flex justify-between">
                              <div className="text-xs capitalize">
                                in <span className="text-lightgreen">{item.category}</span>
                              </div>
                              <div className="flex gap-2 items-center text-sm font-extrabold">
                                <div className="text-[#B2212F] underline">
                                  ${item.new_price.toFixed(2)}
                                </div>
                                <div className="line-through">
                                  ${item.old_price.toFixed(2)}
                                </div>
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

            {/* New releases */}
            <div className="flex flex-col gap-8">
              <div className="text-2xl font-bold">New releases</div>
              <div className="flex flex-wrap gap-6 justify-center">
                {dataLoading ?
                  <>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-72 h-80 rounded-[4px] bg-slate-400 animate-pulse'></div>
                    ))}
                  </>
                  :
                  <>
                    {products2.map((item) =>
                      new Array(4).fill().map((_, index) => (
                        <div
                          key={index}
                          className="bg-primary h-fit w-72 rounded-[4px] relative z-10"
                        >
                          <>
                            <div className="bg-[#B2212F] text-white text-[0.8rem] uppercase font-extrabold py-1.5 px-3 absolute -top-1 -left-3">
                              90% Off
                            </div>
                            <div className="edge"></div>
                          </>
                          <Link to={`/products/${index}`} onClick={MoveToTop}>
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
                            <div className="flex justify-between">
                              <div className="text-xs capitalize">
                                in <span className="text-lightgreen">{item.category}</span>
                              </div>
                              <div className="flex gap-2 items-center text-sm font-extrabold">
                                <div className="text-[#B2212F] underline">
                                  ${item.new_price.toFixed(2)}
                                </div>
                                <div className="line-through">
                                  ${item.old_price.toFixed(2)}
                                </div>
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
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
