import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";

function CartPage() {
  const user = useSelector(store => store.user.currentUser)
  const navigate = useNavigate();


  /*  const [deliveryDetails, setDeliveryDetails] = useState({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      completeAddress: "",
    }); */

  const [products, setProducts] = useState([])

  async function productsCart() {
    try {
      if (!user) {
        navigate("/login")
      } else {
        const token = localStorage.getItem("abmyntra-token");
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/cart`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            //withCredentials: true,
          });
        setProducts(res?.data?.cartItems);

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    productsCart();
  }, [products]);



  const calculateSubtotal = () => {
    return products.reduce((total, item) => total + (item.quantity * item?.product?.price?.mrp), 0)
  }


  return (
    <section className=" min-h-[85vh] relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Shopping Cart
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                {products.length}
              </h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-lg leading-8 text-gray-400">
                  Product Details
                </p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Quantity
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Total
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {
              products?.map((item, idx) =>
                <div key={idx} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                  <div className="w-full md:max-w-[126px]">
                    <img
                      src={item?.product?.img}
                      alt=""
                      className="mx-auto rounded-xl object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                    <div className="md:col-span-2">
                      <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">
                          {item?.product?.name}
                        </h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">

                        </h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                          Rs. {item?.product?.price?.mrp}
                        </h6>
                      </div>
                    </div>
                    <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                      <div className="flex items-center h-full">
                        <div className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                          -
                        </div>
                        <input
                          value={item?.quantity}
                          type="text"
                          className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                          placeholder="1"
                        />
                        <div className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                          +
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                      <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                        Rs. {item?.quantity * item?.product?.price?.mrp}
                      </p>
                    </div>
                  </div>
                </div>
              )
            }


          </div>
          <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div className="mt-8">
              <div className="flex items-center justify-between py-8">
                <p className="font-medium text-xl leading-8 text-black">
                  {products.length} Items
                </p>
                <p className="font-semibold text-xl leading-8 text-indigo-600">
                  Rs. {calculateSubtotal().toFixed(2)}
                </p>
              </div>
            </div>


            <form >
              <div className="flex flex-col gap-3 py-6 w-full ">
                <p className="font-medium text-[18px] leading-8 text-black">
                  Delivery Details
                </p>
                <Input
                  type="text"
                  value={""}
                  //onChange={(e) => setDeliveryDetails({ ...deliveryDetails, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"

                  required
                />
                <Input
                  type="email"
                  value={""}
                  //onChange={(e) => setDeliveryDetails({ ...deliveryDetails, email: e.target.value })}
                  placeholder="Email Address"
                  className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"

                  required
                />
                <Input
                  type="text"
                  value={""}
                  //onChange={(e) => setDeliveryDetails({ ...deliveryDetails, mobile: e.target.value })}
                  placeholder="Mobile Number"
                  className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"

                  required
                />
                <Input
                  type="text"
                  value={""}
                  //onChange={(e) => setDeliveryDetails({ ...deliveryDetails, fullAddress: e.target.value })}
                  placeholder="Full Address (Address, State, Country, Pincode)"
                  className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
                  isTextArea={true}
                  required
                />
                <p className="font-medium text-[18px] leading-8 text-black">
                  Payment Details
                </p>
                <Input
                  type="text"
                  value=""
                  //onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="Card Number"
                  className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"

                  required
                />
                <div className="flex gap-1">
                  <Input
                    type="text"
                    value=""
                    //onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Expiration Date"
                    className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"

                    required
                  />
                  <Input
                    type="text"
                    value=""
                    //onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Card CVV"
                    className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"

                    required
                  />

                </div>
                <Input
                  type="text"
                  value=""
                  //onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="Card Holder Name"
                  className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"

                  required
                />
                <Button
                  label="Place Order"
                  type="submit"
                  className="w-full text-white"
                />



              </div>
            </form>


          </div>
        </div>
      </div >
    </section >
  );
}

export default CartPage;


