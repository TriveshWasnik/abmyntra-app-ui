import React, { useEffect, useState } from "react";
import pic4080OffBanner from "/assets/images/banners/4080OffBanner.png";
import { useDispatch } from "react-redux";
import { setSlidesPerRow } from "../store/productSlice.js";
import Banner from "../components/Banner.jsx";
import picFlat300Off from "/assets/images/banners/flat300OffBanner.png";
import Heading from "../ui/Heading.jsx";
import couponBannerPic from "/assets/images/banners/homeCouponBanner.png";
import openBannerPic from "/assets/images/banners/menOpenOfferBanner.png";
import flat70BannerPic from "/assets/images/banners/flat70OffBanner.png";
import crezyDealsPic from "/assets/images/banners/creazyDealsBanner.png";
import appBannerPic from "/assets/images/banners/homeAppBanner.png";
import CartCategory from "../ui/CartCategory.jsx";


import Carousel from "../components/Carousel.jsx";
import { homeSlider } from "../data/HomeCarousel.js";
import axios from "axios";
import Cart from "../ui/Cart.jsx";
import { categoriesData } from "../data/categoriesData.js";


// Home Page
function HomePage() {
  const dispatch = useDispatch();
  // set the numbers of image per slides
  useEffect(() => {
    dispatch(setSlidesPerRow(5));
  }, []);



  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/product`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let myproducts = res.data.products;
      const shirt = myproducts.filter((prod) => prod.category.includes("Shirts"))[0];
      const tshirt = myproducts.filter((prod) => prod.category.includes("T-Shirts"))[0];
      const casualWear = myproducts.filter((prod) => prod.category.includes("Casual Wear"))[0];
      const jeans = myproducts.filter((prod) => prod.category.includes("Jeans"))[0]
      setProducts([shirt, tshirt, casualWear, jeans]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])



  return (
    <>
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
      <Banner pic={flat70BannerPic} url="/" />
      <Banner pic={crezyDealsPic} url="/" />

      <Carousel data={homeSlider} />

      <Heading
        text="CATEGORIES TO CART"
        className="text-[20px] md:text-[48px] text-center py-3 md:py-20"
      />
      <div className="flex items-center justify-center w-full gap-10 flex-wrap ">
        {
          categoriesData?.map((category, idx) =>
            < CartCategory key={idx} category={category} />
          )
        }



      </div>


      <Heading
        text="Our Bestseller"
        className="text-[20px] md:text-[48px] text-center py-3 md:py-20"
      />
      <div className="flex items-center justify-center w-full gap-10 flex-wrap ">
        {

          products?.map((item) =>
            <Cart data={item} />
          )
        }

      </div>
      <Banner
        pic={appBannerPic}
        url="https://apps.apple.com/in/app/myntra-fashion-shopping-app/id907394059?mt=8"
        className="px-1 md:px-20 my-5 md:my-12"
      />
    </>
  );
}

export default HomePage;
