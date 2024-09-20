import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import Container from "../ui/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import MenuItem from "../ui/MenuItem.jsx";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice.js";
import { toast } from "react-hot-toast";
import axios from "axios";

// Header Component

const Header = () => {
  // check user login or not
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  // Navigate the React Route
  const navigate = useNavigate();
  // defined and set the value of search
  const [search, setSearch] = useState("");
  // logout the current user

  async function logoutHandler() {
    try {
      const res = await axios.get(
        "https://abmyntra-api.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("User LoggedOut Successfully");
        dispatch(logoutUser(null));
        navigate("/login");
      } else {
        toast.error("res.data.message");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const categories = useSelector((store) => store.category.categories);
  const mainCategories = categories
    .filter((par) => par.parentCategory.length == 0)
    .reverse(); // Main Category Mens Womans Kids

  const womensCategories = categories
    .filter((par) => par.parentCategory == "66e09fb61e9f1f7c9225c0af")
    .reverse(); // womens sub categories
  const mensCategories = categories
    .filter((par) => par.parentCategory == "66e09a0b1e9f1f7c9225c08a")
    .reverse(); // Mens sub categories

  const kidsCategories = categories
    .filter((par) => par.parentCategory == "66e0a48b1e9f1f7c9225c0d4")
    .reverse(); // Kids Sub Categories

  const [isShowSubmenu, setIsShowSubmenu] = useState(false);

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
              {mainCategories?.map((item, idx) => (
                <li key={idx} onClick={() => setIsShowSubmenu(!isShowSubmenu)}>
                  <NavLink
                    to={"/products"}
                    state={{ categoryName: item.name, categoryId: item._id }}
                    className={`border-b-4 relative  border-transparent flex flex-col items-center text-[#3E3F45] px-1 md:px-3 py-4 text-[14px]  tracking-wide `}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {user && user.isAdmin ? (
                <li>
                  <NavLink
                    to={"/dashboard"}
                    className={`border-b-4  border-transparent flex flex-col items-center text-[#3E3F45] px-1 md:px-3 py-4 text-[14px]  tracking-wide `}
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </nav>
          <div className="flex  items-center gap-2 md:gap-4">
            <SearchBar
              value={search}
              placeholder="Search for products, brands and more"
              onChange={(e) => setSearch(e.target.value)}
              to={`/search/${search}`}
            />
            <ul className={`flex items-center`}>
              {user !== null ? (
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
                  <li onClick={logoutHandler}>
                    <NavLink
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
