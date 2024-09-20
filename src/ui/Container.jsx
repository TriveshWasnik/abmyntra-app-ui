import React from "react";

// Container Component
function Container({ children, className = "" }) {
  return (
    <div className={`w-full max-w-full mx-auto px-2 md:px-20 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
