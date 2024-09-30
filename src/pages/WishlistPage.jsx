import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-hot-toast";
import Container from "../ui/Container";
import axios from "axios";
import { useSelector } from "react-redux";

// Wishlist Page

const WishlistPage = () => {

  const user = useSelector((store) => store.user.currentUser)
  const [productList, setProductList] = useState([]);

  async function productsWishlist() {
    if (!user) {
      navigate("/login")
    } else {
      const token = localStorage.getItem("abmyntra-token");
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/favourite`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          //withCredentials: true,
        });
      setProductList(res?.data);
    }
  }

  useEffect(() => {
    productsWishlist();
  }, [productList])


  async function addProductBag(id) {
    if (!user) {
      navigate("/login")
    } else {
      const token = localStorage.getItem("abmyntra-token");
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/cart`,
        { productId: id, quantity: 1 },
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

  async function removeProductsWishlist(id) {
    if (!user) {
      navigate("/login")
    } else {
      const token = localStorage.getItem("abmyntra-token");
      const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/favourite`,
        { productId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          //withCredentials: true,
        });
      console.log(res);
      if (res) {
        toast.success("Product remove from  wishlist")
      }
    }
  }

  return (
    <>
      <Container>
        <h1 className="text-lg font-bold ml-5 mt-3">
          My Wishlist :-
          {productList.length} Items
        </h1>
        <div className="flex items-center my-10 min-h-[75vh] justify-left w-full gap-10 flex-wrap ">
          {productList?.map((product) => (
            <div
              key={product._id}
              className="w-72 p-2 flex justify-center text-left text-[#521c03] tracking-wider border-[1px] border-black"
            >
              <Link>
                <Carousel
                  className="w-64 p-2"
                  showThumbs={false}
                  showArrows={false}
                  autoPlay={false}
                >
                  <div>
                    <img src={product.img} alt="" className="w-fit h-fit" />
                  </div>
                </Carousel>
                <div className="my-2 pl-3">
                  <div className=" font-bold mt-6">{
                    product.name
                  }</div>
                  <div className="flex items-center">
                    <div className=" font-bold text-sm ">
                      Rs. {
                        product?.price?.mrp
                      }
                    </div>
                  </div>
                  <div className="mt-2 flex">
                    <div onClick={() => addProductBag(product._id)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                      Add to Cart
                    </div>
                    <div onClick={() => removeProductsWishlist(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                      Remove
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default WishlistPage;
