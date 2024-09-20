import React from "react";
import { Link } from "react-router-dom";

// Cart Category Component
function CartCategory({ pic, name, discount, state }) {
  return (
    <>
      <div className="w-2/3 md:max-w-80 md:w-80 bg-cart-home bg-center bg-cover  p-2 text-center text-[#521c03] tracking-wider">
        <img src={pic} alt="" className="w-full h-80 md:max-h-[320px]" />
        <div className=" my-2">
          <div className="text-[20px] font-medium">{name}</div>
          <div className="text-[32px] font-extrabold -my-1">{discount}</div>
          <Link
            to={"/products"}
            state={state}
            className="text-[20px] font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartCategory;
