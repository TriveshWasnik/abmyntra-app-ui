import React, { forwardRef, useId } from "react";

function Select({ label, className, options, ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        id={id}
        className={`px-3 py-2 outline-none ${className}`}
        ref={ref}
        {...props}
      >
        {options?.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
