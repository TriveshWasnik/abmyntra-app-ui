import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { useSelector } from "react-redux";
import axios from "axios";

// Product Details Page
function ProductDetailsPage() {
  // get the perticular page location


  const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState({})

  async function getProductDetail() {

    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        //withCredentials: true,
      });
    setProduct(res?.data);

  }

  useEffect(() => {
    getProductDetail();
  }, [])

  const user = useSelector((store) => store.user.currentUser);


  async function addProductsWishlist() {
    if (!user) {
      navigate("/login")
    } else {
      const token = localStorage.getItem("abmyntra-token");
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/favourite`,
        { productId: product?._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          //withCredentials: true,
        });
      console.log(res);
      if (res) {
        toast.success("Product added to wishlist")
      }
    }
  }


  async function addProductBag() {
    if (!user) {
      navigate("/login")
    } else {
      const token = localStorage.getItem("abmyntra-token");
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/cart`,
        { productId: product?._id, quantity: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          //withCredentials: true,
        });

      if (res) {
        toast.success("Product added to Cart");
        navigate("/cart")
      }
    }
  }




  return (
    <Container>

      <div className="flex flex-col min-h-[82vh] md:flex-row justify-center mb-10">
        {

          <><div className="flex flex-col max-w-[600px]">
            <img src={product.img} alt="" className="" />
          </div><div className="-mt-40 md:mt-0 p-10 max-w-[600px]">
              <h1 className="text-xl md:text-2xl font-bold">
                {product.title}
              </h1>
              <h1 className="text-gray-500 text-[14px] md:text-xl">
                {product.name}
              </h1>
              <hr className="mt-2" />
              <div className="flex items-center mt-4">
                <h1 className="text-2xl font-bold">
                  Rs.
                  {
                    product?.price && product?.price?.mrp
                  }
                </h1>
                <h1 className="text-xl text-gray-500 ml-2">MRP </h1>
                <h1 className="text-xl line-through text-gray-500 ml-1">
                  Rs.
                  {
                    product?.price && product?.price?.org
                  }
                </h1>
                <h1 className="text-orange-500 ml-2 font-bold text-lg">
                  (
                  {
                    product?.price && product?.price?.off
                  }
                  % OFF)
                </h1>
              </div>
              <h1 className="text-green-800 font-semibold mt-3">
                inclusive of all taxes
              </h1>
              <div className="flex flex-col">
                <div className="my-5 font-semibold text-[16px] tracking-wide">
                  AVAILABLE COLORS
                </div>
                <div className="flex gap-1">
                  {
                    product?.colors?.map((color, idx) =>
                      <div key={idx}
                        className={`w-8 h-8 rounded border-[1px] border-black`}
                        style={{ backgroundColor: color }}
                      ></div>
                    )
                  }
                </div>



              </div>
              <div className="flex flex-col">
                <div className="my-5 font-semibold text-[16px] tracking-wide">
                  AVAILABLE SIZES
                </div>
                <div className="flex gap-4">
                  {
                    product?.sizes?.map((size, idx) => (
                      <div
                        key={idx}
                        className={`px-3 h-12 w-12 flex items-center font-medium justify-center border-2 border-black text-[18px]  rounded-full`}
                      >
                        {size}
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={addProductBag}
                  icon={<HiOutlineShoppingBag size={20} />}
                  label="ADD TO BAG"
                  className="w-[200px] font-bold text-white text-[15px] tracking-wider" />
                <Button
                  onClick={addProductsWishlist}
                  icon={<FaRegHeart size={20} />}
                  label="WISHLIST"
                  className="w-[160px] font-bold text-[15px] tracking-wider bg-transparent text-black border-[2px]" />
              </div>
              <hr />
              <div className="mt-8 text-[18px]">
                {product?.desc?.split(".").map((d) => <div className="text-justify mb-3" >{d}.</div>)}
              </div>
            </div></>

        }
      </div>
    </Container>
  );
}

export default ProductDetailsPage;
