import React from "react";
import Banner from "../components/Banner";
import picFlat300Off from "../assets/images/banners/flat300OffBanner.png";
import Heading from "../ui/Heading";
import couponBannerPic from "../assets/images/banners/homeCouponBanner.png";
import openBannerPic from "../assets/images/banners/menOpenOfferBanner.png";
import flat70BannerPic from "../assets/images/banners/flat70OffBanner.png";
import crezyDealsPic from "../assets/images/banners/creazyDealsBanner.png";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories.jsx";

import appBannerPic from "../assets/images/banners/homeAppBanner.png";

function MainPageContent({
  bannerDiscount = "",
  sliderData = [],
  categoriesData = [],
}) {
  return (
    <>
      <Banner pic={picFlat300Off} className="px-20 w-[95%] mt-8 mb-6" url="/" />
      <Banner pic={bannerDiscount} className="px-20" url="/" />
      <Heading
        text="COUPONS CORNER"
        className="text-[48px] text-center py-20"
      />
      <Banner pic={couponBannerPic} url="/" className="px-20" />
      <Banner pic={openBannerPic} url="/" className="mt-5" />
      <Banner pic={flat70BannerPic} url="/" />
      <Banner pic={crezyDealsPic} url="/" />
      <Carousel data={sliderData} className="pt-5 pb-10" />
      <Heading
        text="CATEGORIES TO CART"
        className="text-[48px] text-center py-20"
      />
      <Categories data={categoriesData} />
      <Banner
        pic={appBannerPic}
        url="https://apps.apple.com/in/app/myntra-fashion-shopping-app/id907394059?mt=8"
        className="px-20 my-12"
      />
    </>
  );
}

export default MainPageContent;
