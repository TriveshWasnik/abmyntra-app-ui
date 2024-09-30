import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MyCarousel from "../components/Carousel.jsx"

import Container from "../ui/Container";
import pic4080OffBanner from "/assets/images/banners/4080OffBanner.png";
import Banner from "../components/Banner.jsx";
import picFlat300Off from "/assets/images/banners/flat300OffBanner.png";
import Heading from "../ui/Heading.jsx";
import couponBannerPic from "/assets/images/banners/homeCouponBanner.png";
import openBannerPic from "/assets/images/banners/menOpenOfferBanner.png";
import flat70BannerPic from "/assets/images/banners/flat70OffBanner.png";
import crezyDealsPic from "/assets/images/banners/creazyDealsBanner.png";
import axios from "axios";

import { menSlider } from "../data/menCarousel.js";
import { womenSlider } from "../data/womenCarousel.js";

// it shows all the product data like clothes, furniture, Electronics etc.

const ProductsPage = () => {
  const location = useLocation();
  const queryType = location.search.replace(/^[?]/g, "").split("=")[0];
  const categoryName = decodeURIComponent(location.search.split("=")[1]);

  const [products, setProducts] = useState([]);

  async function getFilteredProductsData() {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product?category=${categoryName}&keyword=${categoryName}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        //withCredentials: true,
      });
    if (queryType === "category") {
      setProducts(res.data.products.filter((prod) => prod.category.includes(categoryName)));
    } else if (queryType === "keyword") {
      const result = res.data.products.filter((prod) => prod.category.includes(categoryName) || prod.colors.includes(categoryName) || prod.name.includes(categoryName) || prod.desc.includes(categoryName))
      setProducts(result)
    }
  }

  useEffect(() => {
    getFilteredProductsData();
  }, [categoryName])


  let sliderProduct = null;
  if (categoryName === "Mens") { sliderProduct = menSlider; }
  if (categoryName === "Womens") { sliderProduct = womenSlider; }

  return (
    <>
      <Container>
        <Banner
          pic={picFlat300Off}
          className="px-1 md:px-20 w-full md:w-[95%] mt-2 md:mt-8 mb-3 md:mb-6"
          url="/"
        />
        <Banner pic={pic4080OffBanner} className="px-1 md:px-20" url="/" />

        {
          (queryType !== "keyword") && (
            <>
              <Heading
                text="COUPONS CORNER"
                className="text-[20px] md:text-[48px] text-center py-5 md:py-20"
              />
              <Banner pic={couponBannerPic} url="/" className="px-1 md:px-20" />
              <Banner pic={openBannerPic} url="/" className="mt-5" /></>)

        }

        {
          sliderProduct && <MyCarousel data={sliderProduct} className="my-10" />
        }

        {
          (queryType === "keyword") && (

            <div className="flex items-center text-gray-500 text-sm my-10  ml-5">
              <div className="text-black text-[28px] font-semibold ">Search Result for : <span className="text-red-500">{categoryName}</span></div>
            </div>
          )
        }

        {
          (queryType !== "keyword") && (
            <>
              <div className="flex items-center text-gray-500 text-sm mt-5 ml-5">
                <Link to={"/"}>
                  <h1 className="text-gray-500">Home / </h1>
                </Link>
                <h1 className="ml-1">{categoryName}</h1>
              </div>

              <h1 className="text-[32px] font-bold ml-5 my-3">
                {categoryName ?? "No Products"}
              </h1>
            </>)
        }

        {
          <div className="flex items-center justify-center w-full mb-10 gap-10 flex-wrap ">
            {
              products?.length === 0 ? <div className="text-red-500 font-semibold text-[32px] h-[300px]"> No Products Found </div> :
                products.map((data) => (
                  <div
                    key={data._id}
                    className="flex flex-col w-64 items-center md:w-96 p-0 border-2  overflow-hidden text-[#521c03] tracking-wider"
                  >
                    <Carousel
                      className="w-64 md:w-96  p-2"
                      showThumbs={false}
                      showArrows={false}
                      autoPlay={true}
                    >
                      <div className="w-full">
                        <img src={data.img} alt="" className="h-96" />
                      </div>

                    </Carousel>
                    <Link to={`/details/${data._id}`} className="h-40" >
                      <div className="my-2 pl-3">
                        <div className="text-[16px] font-bold mt-6">
                          {data.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {data.category[0]}
                        </div>
                        <div className="flex items-center">
                          <div className=" font-bold text-sm ">
                            Rs.
                            {data.price.mrp}
                          </div>
                          <div className="text-xs text-gray-400 line-through ml-1 ">
                            ${data.price.org}
                          </div>
                          <div className="text-xs text-orange-400 ml-1">

                            {data.price.off}
                            % OFF
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
            }
          </div>
        }


        <Banner pic={flat70BannerPic} url="/" />
        <Banner pic={crezyDealsPic} url="/" />
      </Container>
    </>
  );
};

export default ProductsPage;

