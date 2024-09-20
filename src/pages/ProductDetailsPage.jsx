import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import axios from "axios";

// Product Details Page
function ProductDetailsPage() {
  // get the perticular page location
  const location = useLocation();
  const sizes = location.state.size.split(",");
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);

  async function addProductsWishlist() {
    try {
      // get the current user

      if (user === null) {
        navigate("/login");
      } else {
        // fetch the user uid
        // fetch the product title
        // set the product data on user collection
        // display the message
        const res = await axios.put(
          `https://abmyntra-api.onrender.com/api/v1/wishlist/addwishlist/${location.state._id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        navigate("/wishlist");
        toast.success("Product Added to the Wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductBag() {
    try {
      // get the current user

      if (user === null) {
        navigate("/login");
      } else {
        const res = await axios.post(
          `https://abmyntra-api.onrender.com/api/v1/cart/addToCart`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res.data);
        //navigate("/cart");
        //toast.success("Product Added to the Cart");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="grid grid-rows-2 max-w-[600px]">
          <img src={location.state.productImage1} alt="" className="p-1 " />
          <div className="flex w-1/3 h-1/3">
            <img src={location.state.productImage2} alt="" className="p-1" />
            <img src={location.state.productImage3} alt="" className="p-1" />
            <img src={location.state.productImage4} alt="" className="p-1 " />
          </div>
        </div>

        <div className="-mt-40 md:mt-0 p-5 max-w-[600px]">
          <h1 className="text-xl md:text-2xl font-bold">
            {location.state.brand}
          </h1>
          <h1 className="text-gray-500 text-[14px] md:text-xl">
            {location.state.shortDescription}
          </h1>
          <hr className="mt-2" />
          <div className="flex items-center mt-4">
            <h1 className="text-2xl font-bold">
              Rs.
              {location.state.sellingPrice}
            </h1>
            <h1 className="text-xl text-gray-500 ml-2">MRP </h1>
            <h1 className="text-xl line-through text-gray-500 ml-1">
              Rs.
              {location.state.mrpPrice}
            </h1>
            <h1 className="text-orange-500 ml-2 font-bold text-lg">
              (
              {(
                ((location.state.mrpPrice - location.state.sellingPrice) /
                  location.state.mrpPrice) *
                100
              ).toPrecision(2)}
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
            <div
              className={`w-8 h-8  rounded`}
              style={{ backgroundColor: location.state.color }}
            ></div>
          </div>
          <div className="flex flex-col">
            <div className="my-5 font-semibold text-[16px] tracking-wide">
              SELECT SIZE
            </div>
            <div className="flex gap-4">
              {sizes.map((size, idx) => (
                <div
                  key={idx}
                  className={`px-3 h-12 flex items-center font-medium justify-center border-2 border-black text-[18px]  rounded-full`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={addProductBag}
              icon={<HiOutlineShoppingBag size={20} />}
              label="ADD TO BAG"
              className="w-[200px] font-bold text-white text-[15px] tracking-wider"
            />
            <Button
              onClick={addProductsWishlist}
              icon={<FaRegHeart size={20} />}
              label="WISHLIST"
              className="w-[160px] font-bold text-[15px] tracking-wider bg-transparent text-black border-[2px]"
            />
          </div>
          <hr />
          <div className="mt-8 text-[18px]">
            {parse(location.state.description)}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetailsPage;
