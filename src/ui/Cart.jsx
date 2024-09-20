import React from "react";
import { Link } from "react-router-dom";

// Cart Component
function Cart({ pic, name, discountRange, url = "", className = "" }) {
  return (
    <div className="w-2/3 md:max-w-96 md:w-96 bg-cart-home bg-center bg-cover  p-2 text-center text-[#521c03] tracking-wider">
      <img src={pic} alt="" className="w-full h-64 md:max-h-[400px]" />
      <div className=" my-2">
        <div className="text-[20px] font-medium">{name}</div>
        <div className="text-[32px] font-extrabold -my-1">
          {discountRange}% OFF
        </div>
        <Link to={url} className="text-[20px] font-medium">
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Cart;
