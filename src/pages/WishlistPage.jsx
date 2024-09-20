import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-hot-toast";
import Container from "../ui/Container";
import axios from "axios";
import { useSelector } from "react-redux";

// Wishlist Page

const WishlistPage = () => {
  const [productList, setProductList] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  async function getProducts() {
    try {
      // check the current user
      // get the user uid from users collection
      // reconnect the products of Perticular user
      if (user) {
        const res = await axios.get(
          `https://abmyntra-api.onrender.com/api/v1/wishlist/list`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.data);
        setProductList(res.data.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-lg font-bold ml-5 mt-3">
          My Wishlist :-
          {productList.length} Items
        </h1>
        <div className="flex items-center justify-center w-full gap-10 flex-wrap ">
          {productList?.map((product) => (
            <div
              key={product._id}
              className="w-64 p-2  text-left text-[#521c03] tracking-wider"
            >
              <Link>
                <Carousel
                  className="w-64 p-2"
                  showThumbs={false}
                  showArrows={false}
                  autoPlay={false}
                >
                  <div>
                    <img src={product.product.productImage1} alt="" />
                  </div>
                </Carousel>
                <div className="my-2 pl-3">
                  <div className=" font-bold mt-6">{product.product.name}</div>
                  <div className="flex items-center">
                    <div className=" font-bold text-sm ">
                      Rs. {product.product.mrpPrice}
                    </div>
                  </div>
                  {/* <div className="mt-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                      Add to Cart
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                      Remove
                    </button>
                  </div>*/}
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
