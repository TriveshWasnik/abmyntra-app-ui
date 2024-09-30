import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import Container from "../ui/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import MenuItem from "../ui/MenuItem.jsx";

import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice.js";

// Header Component

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(store => store.user.currentUser);

  const menuName = location.search.split("=")[1];

  const [searchKeyword, setSearchKeyword] = useState("");

  const navigate = useNavigate();

  return (
    <header className=" bg-white">
      <Container>
        <div className="flex flex-col md:flex-row items-center  justify-between">
          <nav className="flex items-center gap-4 md:gap-16">
            <div className="w-10 md:max-w-16 md:w-16">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <ul className={`flex items-center`}>
              <li >
                <NavLink to={`/products?category=Mens`}
                  className={({ isActive }) => `${isActive && menuName == "Mens" ? "border-b-4 border-[#3E3F45]" : ""} text-[#3E3F45] px-1 md:px-3 py-4 text-[14px]  tracking-wide `}
                >
                  Mens
                </NavLink>
              </li>
              <li >
                <NavLink to={`/products?category=Womens`}
                  className={({ isActive }) => `${isActive && menuName == "Womens" ? "border-b-4 border-[#3E3F45]" : ""} text-[#3E3F45] px-1 md:px-3 py-4 text-[14px]  tracking-wide `}                >
                  Womens
                </NavLink>
              </li>
              <li >
                <NavLink to={`/products?category=Kids`}
                  className={({ isActive }) => `${isActive && menuName == "Kids" ? "border-b-4 border-[#3E3F45]" : ""} text-[#3E3F45] px-1 md:px-3 py-4 text-[14px]  tracking-wide `}                >
                  Kids
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex  items-center gap-2 md:gap-4">
            <SearchBar value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search for products, brands and more"
              onClick={() => navigate(`/products?keyword=${searchKeyword}`)}
            />
            <ul className={`flex items-center`}>
              {currentUser !== null ? (
                <>
                  <MenuItem
                    to="/wishlist"
                    icon={<FaRegHeart size={"18px"} />}
                    name="Wishlist"
                  />
                  <MenuItem
                    to="/cart"
                    icon={<HiOutlineShoppingBag size={"18px"} />}
                    name="Bag"
                  />
                  <li>
                    <NavLink onClick={() => {
                      dispatch(logout(null));
                      toast.success("User logout Successfully")
                    }}
                      className={`border-b-4  border-transparent flex flex-col items-center text-[#3E3F45] md:px-3 py-4 text-[11px]  tracking-widest `}
                    >
                      <div className="pb-1">
                        <FiLogOut size={"18px"} />
                      </div>
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <MenuItem
                    to="/login"
                    icon={<FaRegUser size={"18px"} />}
                    name="Login"
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
