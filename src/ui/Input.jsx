import React, { useId, forwardRef } from "react";
import { Link } from "react-router-dom";

// Input Component
function Input(
  {
    type = "text",
    isTextArea = false,
    className = "",
    icon = "",
    to,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="w-full relative">
      {icon && (
        <Link to={to}>
          <div className="absolute text-[#696969] text-[14px]  md:text-[18px] top-3 md:top-2 px-1 md:px-2 ">
            {icon}
          </div>
        </Link>
      )}
      {!isTextArea ? (
        <input
          id={id}
          type={type}
          className={`${
            icon ? "pl-7 md:pl-12" : "px-3"
          } py-2 outline-none ${className} `}
          ref={ref}
          {...props}
        />
      ) : (
        <textarea
          className={`${
            icon ? "pl-7 md:pl-12" : "px-3"
          } py-2 outline-none ${className}  `}
          ref={ref}
          {...props}
        ></textarea>
      )}
    </div>
  );
}

export default forwardRef(Input);
