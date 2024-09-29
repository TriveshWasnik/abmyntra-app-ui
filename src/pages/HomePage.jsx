import React, { useEffect, useState } from "react";
import pic4080OffBanner from "../assets/images/banners/4080OffBanner.png";
import { useDispatch, useSelector } from "react-redux";
import { setSlidesPerRow } from "../store/productSlice.js";
import Banner from "../components/Banner.jsx";
import picFlat300Off from "../assets/images/banners/flat300OffBanner.png";
import Heading from "../ui/Heading.jsx";
import couponBannerPic from "../assets/images/banners/homeCouponBanner.png";
import openBannerPic from "../assets/images/banners/menOpenOfferBanner.png";
import flat70BannerPic from "../assets/images/banners/flat70OffBanner.png";
import crezyDealsPic from "../assets/images/banners/creazyDealsBanner.png";
import appBannerPic from "../assets/images/banners/homeAppBanner.png";
import CartCategory from "../ui/CartCategory.jsx";

import useGetCategories from "../hooks/useGetCategories.js";
import Carousel from "../components/Carousel.jsx";
import { homeSlider } from "../data/HomeCarousel.js";

// Home Page
function HomePage() {
  const dispatch = useDispatch();
  // set the numbers of image per slides
  useEffect(() => {
    dispatch(setSlidesPerRow(5));
  }, []);

  (async function () {
    await useGetCategories();
  })();

  const categories = useSelector((store) => store.category.categories);

  /* const mainCategories = categories
    .filter((par) => par.parentCategory.length == 0)
    .reverse(); // Main Category Mens Womans Kids */

  const womensCategories = categories
    .filter((par) => par.parentCategory == "66e09fb61e9f1f7c9225c0af")
    .reverse(); // womens sub categories
  const mensCategories = categories
    .filter((par) => par.parentCategory == "66e09a0b1e9f1f7c9225c08a")
    .reverse(); // Mens sub categories

  const kidsCategories = categories
    .filter((par) => par.parentCategory == "66e0a48b1e9f1f7c9225c0d4")
    .reverse(); // Kids Sub Categories

  const filteredCategories = [
    ...mensCategories,
    ...womensCategories,
    ...kidsCategories,
  ];

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
        {filteredCategories?.map((item) => (
          <CartCategory
            key={item._id}
            pic={item.categoryPic}
            name={item.name}
            discount={`40-70% OFF`}
            state={{ categoryName: item.name, categoryId: item._id }}
          />
        ))}
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
