import React from "react";
import { useNavigate } from "react-router-dom";

// Cart Category Component
function CartCategory({ category }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-2/3 md:max-w-80 md:w-80 bg-cart-home bg-center bg-cover  p-2 text-center text-[#521c03] tracking-wider">
        <img src={category.picPath} alt="" className="w-full h-80 md:max-h-[320px]" />
        <div className=" my-2">
          <div className="text-[20px] font-medium">{category.name}</div>
          <div className="text-[32px] font-extrabold -my-1">{category.discountRange}% OFF</div>
          <div
            className="text-[20px] font-medium hover:cursor-pointer hover:text-red-500 hover:font-semibold" onClick={() => navigate(`/products?category=${category.name}`)}
          >
            Shop Now
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCategory;
