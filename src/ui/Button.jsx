import React from "react";

// Button Component

const Button = ({
  label,
  icon = "",
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-3 my-5 flex gap-3 items-center justify-center rounded-sm bg-[#ff3f6c]  cursor-pointer ${className}`}
    >
      {icon && icon} {label}
    </button>
  );
};

export default Button;
