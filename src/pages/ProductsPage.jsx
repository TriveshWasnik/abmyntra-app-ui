import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MyCarousel from "../components/Carousel.jsx"
import { useSelector } from "react-redux";
import Container from "../ui/Container";
import pic4080OffBanner from "../assets/images/banners/4080OffBanner.png";
import Banner from "../components/Banner.jsx";
import picFlat300Off from "../assets/images/banners/flat300OffBanner.png";
import Heading from "../ui/Heading.jsx";
import couponBannerPic from "../assets/images/banners/homeCouponBanner.png";
import openBannerPic from "../assets/images/banners/menOpenOfferBanner.png";
import flat70BannerPic from "../assets/images/banners/flat70OffBanner.png";
import crezyDealsPic from "../assets/images/banners/creazyDealsBanner.png";
import useGetProducts from "../hooks/useGetProducts.js";
import { menSlider } from "../data/menCarousel.js";
import { womenSlider } from "../data/womenCarousel.js";
// it shows all the product data like clothes, furniture, Electronics etc.

const ProductsPage = () => {
  // get the url location
  const location = useLocation();

  // get the product data from redux store
  (async function () {
    await useGetProducts();
  })();

  const products = useSelector((store) => store.product.products);
  const filteredProduct = products.filter(
    (data) => data?.parentCategory[0] === location?.state?.categoryId
  );

  let sliderProduct = null;

  if (location.state?.categoryName === "Mens") { sliderProduct = menSlider; }
  if (location.state?.categoryName === "Womens") { sliderProduct = womenSlider; }

  return (
    <>
      <Container>
        <Banner
          pic={picFlat300Off}
          className="px-1 md:px-20 w-full md:w-[95%] mt-2 md:mt-8 mb-3 md:mb-6"
          url="/"
        />
        <Banner pic={pic4080OffBanner} className="px-1 md:px-20" url="/" />
        <Heading
          text="COUPONS CORNER"
          className="text-[20px] md:text-[48px] text-center py-5 md:py-20"
        />
        <Banner pic={couponBannerPic} url="/" className="px-1 md:px-20" />
        <Banner pic={openBannerPic} url="/" className="mt-5" />

        {sliderProduct && <MyCarousel data={sliderProduct} className="my-10" />}

        <div className="flex items-center text-gray-500 text-sm mt-5 ml-5">
          <Link to={"/"}>
            <h1 className="text-gray-500">Home / </h1>
          </Link>
          <h1 className="ml-1">{location.state?.categoryName}</h1>
        </div>

        <h1 className="text-[32px] font-bold ml-5 my-3">
          {location.state?.categoryName ?? "No Products"}
        </h1>

        {
          <div className="flex items-center justify-center w-full mb-10 gap-10 flex-wrap ">
            {filteredProduct.map((data, idx) => (
              <div
                key={idx}
                className="flex flex-col w-64 items-center md:w-96 p-0 border-2  overflow-hidden text-[#521c03] tracking-wider"
              >
                <Carousel
                  className="w-64 md:w-96  p-2"
                  showThumbs={false}
                  showArrows={false}
                  autoPlay={true}
                >
                  <div className="w-full">
                    <img src={data.productImage1} alt="" />
                  </div>
                  <div>
                    <img src={data.productImage2} alt="" />
                  </div>
                  <div>
                    <img src={data.productImage3} alt="" />
                  </div>
                  <div>
                    <img src={data.productImage4} alt="" />
                  </div>
                </Carousel>
                <Link to={`/details/${data.url}`} state={data}>
                  <div className="my-2 pl-3">
                    <div className="text-[16px] font-bold mt-6">
                      {data.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {location.state.categoryName}
                    </div>
                    <div className="flex items-center">
                      <div className=" font-bold text-sm ">
                        Rs.
                        {data.sellingPrice}
                      </div>
                      <div className="text-xs text-gray-400 line-through ml-1 ">
                        ${data.mrpPrice}
                      </div>
                      <div className="text-xs text-orange-400 ml-1">
                        (
                        {(
                          ((data.mrpPrice - data.sellingPrice) /
                            data.mrpPrice) *
                          100
                        ).toPrecision(2)}
                        % OFF)
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        }


        <Banner pic={flat70BannerPic} url="/" />
        <Banner pic={crezyDealsPic} url="/" />
      </Container>
    </>
  );
};

export default ProductsPage;
