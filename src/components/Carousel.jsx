import React from "react";
import Slider from "react-slick";
import Container from "../ui/Container";
import { useSelector } from "react-redux";

/* Carousel Slider Component: it show 2 or more images at a time  */

function Carousel({ data, className = "" }) {
  // slidesPerRow value get from the redux store
  const { slidesPerRow } = useSelector((store) => store.product);

  // Carousel Settings
  const settings = {
    dots: data.length > slidesPerRow ? true : false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesPerRow,
    slidesToScroll: slidesPerRow,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: data.length > slidesPerRow ? true : false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,

          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
    ],
  };
  return (
    <Container className={`${className}`}>
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item.id} className="text-center text-[#4f2009]">
            <img src={item.image} alt="image" className="w-full max-h-fit" />
            {item.title && (
              <p className="mt-3 text-[20px] font-medium">{item.title}</p>
            )}
            {item.discountRange && (
              <p className="text-[28px] font-bold -mt-1">
                {item.discountRange}% OFF
              </p>
            )}
          </div>
        ))}
      </Slider>
    </Container>
  );
}

export default Carousel;
