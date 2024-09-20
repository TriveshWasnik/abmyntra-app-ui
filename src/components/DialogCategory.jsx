import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";
function DialogCategory({ heading, apiUrl }) {
  const [category, setCategory] = useState({
    name: "",
    url: "",
    desc: "",
    parentCategory: "",
    categoryPic: "",
  });

  async function submitHandlerCategory(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("url", category.url);
    formData.append("desc", category.desc);
    formData.append("parentCategory", category.parentCategory);
    formData.append("categoryPic", category.categoryPic);

    try {
      const res = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(`Category Created Successfully`, {
          position: "top-center",
        });

        //   dispatch(loginUser(res.data.data));
        setCategory({
          name: "",
          url: "",
          desc: "",
          parentCategory: "",
          categoryPic: "",
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [isShowDialog, setIsShowDialog] = useState(false);
  function closeDialog() {
    setIsShowDialog(true);
  }
  return (
    !isShowDialog && (
      <div className="fixed top-6  min-w-80 w-2/5 my-4 ml-4 bg-white border  border-gray-300   rounded-xl  ">
        <div className="flex items-center justify-between gap-4 border-b bg-gray-700 py-6 px-8">
          <h6 className="block antialiased tracking-normal  text-[18px] font-semibold  text-white">
            {heading}
          </h6>
          <div className="" onClick={closeDialog}>
            <FaRegWindowClose className="text-[#ff3f6c] bg-transparent w-8 h-8" />
          </div>
        </div>

        <form
          onSubmit={submitHandlerCategory}
          className="my-2 mx-2 bg-white  flex flex-col flex-wrap gap-2"
        >
          <Input
            type="text"
            name="name"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            placeholder="Category Name "
            className="w-full  bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            required
          />
          <Input
            type="text"
            name="url"
            value={category.url}
            onChange={(e) => setCategory({ ...category, url: e.target.value })}
            placeholder="Category Slug "
            className="w-full  bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            required
          />
          <Input
            type="text"
            name="desc"
            value={category.desc}
            onChange={(e) => setCategory({ ...category, desc: e.target.value })}
            placeholder="Category Description"
            className="w-full  bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            required
          />
          <Input
            type="text"
            name="parentCategory"
            value={category.parentCategory}
            onChange={(e) =>
              setCategory({
                ...category,
                parentCategory: e.target.value,
              })
            }
            placeholder="Category Parent ID"
            className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
          />
          <Input
            type="file"
            name="categoryPic"
            accept="image/"
            onChange={(e) =>
              setCategory({
                ...category,
                categoryPic: e.target.files[0],
              })
            }
            className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            required
          />
          <Button
            label="Create Category"
            type="submit"
            className="w-[180px] text-[14px]"
          />
        </form>
      </div>
    )
  );
}

export default DialogCategory;
