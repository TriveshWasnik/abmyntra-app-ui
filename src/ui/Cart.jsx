import React from "react";
import { useNavigate } from "react-router-dom";

/* category:[], colors:[], sizes:[], desc, img, name, price,title, _id  */

// Cart Component
function Cart({ data, className = "" }) {
  const navigate = useNavigate();
  return (
    <div className="w-2/3 md:max-w-96 md:w-96 bg-cart-home bg-center bg-cover  p-2 text-center text-[#521c03] tracking-wider">
      <img src={data.img} alt="" className="w-full  md:h-[400px]" />
      <div className="my-2 h-32 relative">
        <div className="text-[20px] font-medium">{data.title}</div>
        <div className="text-[18px] font-medium text-[#f46f21]">{data.name.split("|")[0]}</div>
        <div className="flex items-center gap-4 justify-center text-[20px] font-extrabold my-2">
          <div> Rs.{data.price.mrp} </div>
          <div className="text-red-500 line-through ">Rs.{data.price.org}</div>
          <div>{data.price.off}% OFF</div>
        </div>
      </div>

      <div className="mx-auto py-2 text-[14px] w-[160px] cursor-pointer  border-2 border-red-500 font-medium bg-red-500 text-white mb-5 rounded-md hover:bg-transparent hover:text-red-500" onClick={() => navigate(`/details/${data._id}`)}>
        Shop Now
      </div>
    </div >
  );
}

export default Cart;
