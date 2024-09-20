import React from "react";
import { Link } from "react-router-dom";

/* Full width Banner Component Banner Component */

function Banner({ pic, url = "", name = "", className = "" }) {
  return (
    <div className={`w-full max-w-full mx-auto ${className} `}>
      <Link to={url}>
        <img src={pic} alt={name} className="w-[100%]" />
      </Link>
    </div>
  );
}

export default Banner;
