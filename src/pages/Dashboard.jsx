import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../ui/Table";

import DialogCategory from "../components/DialogCategory";
import { useDispatch, useSelector } from "react-redux";
import DialogProduct from "../components/DialogProduct";
import { setCategories } from "../store/categorySlice";
import useGetUsersInfoTable from "../hooks/useGetUsersInfoTable";
import useGetCategoryInfoTable from "../hooks/useGetCategoryInfoTable";
import useGetProductsInfoTable from "../hooks/useGetProductsInfoTable";
import { setProducts } from "../store/productSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const tabTitleData = [
    { id: 1, title: "User" },
    { id: 2, title: "Cart" },
    { id: 3, title: "Category" },
    { id: 4, title: "Order" },
    { id: 5, title: "Product" },
    { id: 6, title: "Logout" },
  ];

  const [tab, setTab] = useState(1);
  const [userInfo, setUserInfo] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [productInfo, setProductInfo] = useState([]);

  const navigate = useNavigate();

  async function getUsersInfoTable() {
    const result = await useGetUsersInfoTable();
    setUserInfo(result);
  }

  async function getCategoriesInfoTable() {
    const result = await useGetCategoryInfoTable();
    setCategoryInfo(result);
  }

  async function getProductInfoTable() {
    const result = await useGetProductsInfoTable();
    setProductInfo(result);
  }

  useEffect(() => {
    getCategoriesInfoTable();
    useGetProductsInfoTable();
  }, []);

  async function adminTab(id) {
    setTab(id);
    if (tab === 1) {
      getUsersInfoTable();
    } else if (tab === 3) {
      getCategoriesInfoTable();
    } else if (tab === 5) {
      getProductInfoTable();
    } else if (tab === 6) {
      await axios.get("https://abmyntra-api.onrender.com/api/v1/user/logout", {
        withCredentials: true,
      });
      navigate("/login");
    }
  }

  const [isDialogCategory, setIsDialogCategory] = useState(false);
  const [isDialogProduct, setIsDialogProduct] = useState(false);

  function showDialogBox(id) {
    id === 3 && setIsDialogCategory(!isDialogCategory);
    id === 5 && setIsDialogProduct(!isDialogProduct);
  }

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        "https://abmyntra-api.onrender.com/api/v1/category/list",
        {
          withCredentials: true,
        }
      );
      dispatch(setCategories(res.data.data));
    })();
  }, [categoryInfo]);

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        "https://abmyntra-api.onrender.com/api/v1/product/all",
        {
          withCredentials: true,
        }
      );
      dispatch(setProducts(res.data.data));
    })();
  }, [productInfo]);

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

  const categoriesFiltered = {
    mainCategories,
    mensCategories,
    womensCategories,
    kidsCategories,
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <aside className="bg-gray-800 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <div className="relative border-b border-white/20">
          <div className="flex items-center gap-4 py-6 px-8">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              ABMyntra Dashboard
            </h6>
          </div>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            {tabTitleData.map((item) => (
              <li key={item.id} onClick={() => adminTab(item.id)}>
                <p
                  className={`text-base font-medium ${
                    tab === item.id ? " bg-black" : "text-white"
                  } text-white py-3 px-4 `}
                >
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="p-4 xl:ml-80">
        <div className="mt-12">
          <div className="mb-4 grid grid-cols-1 gap-6 ">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
              <div className="p-6 px-0 pt-0 pb-2">
                <div className={tab === 1 ? "block" : "hidden"}>
                  <div className="flex px-5 py-3 ">
                    <div className=" text-[24px] font-bold">Users List</div>
                  </div>
                  <Table
                    tableheadings={["Id", "Name", "Email", "Mobile", "Status"]}
                    tableData={userInfo}
                  />
                </div>

                <div className={tab === 2 ? "block" : "hidden"}>2</div>

                <div className={tab === 3 ? "block" : "hidden"}>
                  <div className="flex px-5 py-3 justify-between">
                    <div className=" text-[24px] font-bold">Category List</div>
                    <div
                      onClick={() => showDialogBox(3)}
                      className="text-[15px] font-semibold shadow-md py-2 px-4 cursor-pointer"
                    >
                      + Add New
                    </div>
                  </div>
                  <Table
                    tableheadings={[
                      "S.No",
                      "Name",
                      "Type",
                      "Description",
                      "Created Date",
                      "Status",
                      "Actions",
                    ]}
                    tableData={categoryInfo}
                  />
                </div>

                {/*Order List*/}
                <div className={tab === 4 ? "block" : "hidden"}>
                  <div className="flex px-5 py-3 ">
                    <div className=" text-[24px] font-bold">Order List</div>
                  </div>
                  <Table
                    tableheadings={[
                      "S.No",
                      "Name",
                      "Order ID",
                      "Method",
                      "Mobile",
                      "Order Date",
                      "Total Amount",
                      "Order Status",
                      "Actions",
                    ]}
                    tableData={userInfo}
                  />
                </div>
                {/* Product List*/}
                <div className={tab === 5 ? "block" : "hidden"}>
                  <div className="flex px-5 py-3 justify-between">
                    <div className=" text-[24px] font-bold">Product List</div>
                    <div
                      onClick={() => showDialogBox(5)}
                      className="text-[15px] font-semibold shadow-md py-2 px-4 cursor-pointer"
                    >
                      + Add New
                    </div>
                  </div>
                  <Table
                    tableheadings={[
                      "S.No",
                      "Product Image",
                      "Product Name",
                      "Description",
                      "Stock",
                      "Price",
                      "Created Date",
                      "Status",
                      "Actions",
                    ]}
                    tableData={productInfo}
                  />
                </div>

                {isDialogCategory && (
                  <DialogCategory
                    heading="Create a New Category"
                    apiUrl="https://abmyntra-api.onrender.com/api/v1/category/create"
                  />
                )}
                {isDialogProduct && (
                  <DialogProduct
                    heading="Create a New Product"
                    method="post"
                    apiUrl="https://abmyntra-api.onrender.com/api/v1/product/create"
                    categories={categoriesFiltered}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
