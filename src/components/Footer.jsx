import React from "react";
import Container from "../ui/Container";

// Footer Component
const Footer = () => {
  return (
    <Container>
      <div className="mt-5">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-[14px]  md:text-[16px]">
            In case of any concern,
            <span className="font-bold text-blue-700">Contact Us</span>
          </p>
          <p className=" text-[14px]  md:text-[16px]">
            © 2024 www.myntra.com. All rights reserved.
          </p>
          <p className=" text-[14px]  md:text-[16px]">A Flipkart company</p>
        </div>
        <hr className="mt-5" />
      </div>
    </Container>
  );
};

export default Footer;
