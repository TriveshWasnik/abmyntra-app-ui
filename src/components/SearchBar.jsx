import React from "react";
import Input from "../ui/Input";
import { FiSearch } from "react-icons/fi";

// Search bar component
function SearchBar({ placeholder = "", value, onChange, to }) {
  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      to={to}
      className="max-w-96 md:max-w-[640px] md:w-[640px] bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
      icon={<FiSearch />}
    />
  );
}

export default SearchBar;
