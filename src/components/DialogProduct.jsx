import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import axios from "axios";
import Select from "../ui/Select";
import { FaRegWindowClose, FaEdit } from "react-icons/fa";

function DialogProduct({ heading, apiUrl, apiType = "post", categories }) {
  categories = [
    ...categories.mainCategories,
    ...categories.mensCategories,
    ...categories.womensCategories,
    ...categories.kidsCategories,
  ];

  const categoriesKeyValue = [];

  categories.map((item) => {
    categoriesKeyValue.push({ key: item._id, value: item.name });
  });

  const [product, setProduct] = useState({
    name: "",
    url: "",
    parentCategory: "",
    brand: "",
    sku: "",
    size: "",
    color: "",
    description: "",
    shortDescription: "",
    mrpPrice: "",
    sellingPrice: "",
    stock: "",
    weight: "",
    weightType: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
  });
  const [isShowDialog, setIsShowDialog] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("url", product.url);
    formData.append("parentCategory", product.parentCategory);
    formData.append("brand", product.brand);
    formData.append("productImage1", product.productImage1);
    formData.append("productImage2", product.productImage2);
    formData.append("productImage3", product.productImage3);
    formData.append("productImage4", product.productImage4);
    formData.append("sku", product.sku);
    formData.append("size", product.size);
    formData.append("color", product.color);
    formData.append("description", product.description);
    formData.append("shortDescription", product.shortDescription);
    formData.append("metaTitle", product.metaTitle);
    formData.append("metaDescription", product.metaDescription);
    formData.append("metaKeywords", product.metaKeywords);

    formData.append("weight", product.weight);
    formData.append("weightType", product.weightType);
    formData.append("mrpPrice", product.mrpPrice);
    formData.append("sellingPrice", product.sellingPrice);
    formData.append("stock", product.stock);

    try {
      const res = await axios.apiType(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(`Product Created Successfully`, {
          position: "top-center",
        });

        setProduct({
          name: "",
          url: "",
          parentCategory: "",
          brand: "",
          sku: "",
          size: "",
          color: "",
          description: "",
          shortDescription: "",
          mrpPrice: "",
          sellingPrice: "",
          stock: "",
          weight: "",
          weightType: "",
          metaTitle: "",
          metaKeywords: "",
          metaDescription: "",
        });
        setIsShowDialog(true);
      } else {
        toast.error(res.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          onSubmit={submitHandler}
          className="my-2 mx-2 bg-white  flex flex-col flex-wrap gap-2"
        >
          <div className="flex  gap-1">
            <Input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="Product Name "
              className="w-full  bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
            <Input
              type="text"
              name="url"
              value={product.url}
              onChange={(e) => setProduct({ ...product, url: e.target.value })}
              placeholder="Product Slug "
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
          </div>
          <div className="flex gap-1">
            <Select
              options={[
                { key: "", value: "Choose Product Category" },
                ...categoriesKeyValue,
              ]}
              value={product.parentCategory}
              onChange={(e) =>
                setProduct({
                  ...product,
                  parentCategory: e.target.value,
                })
              }
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
            <Input
              type="text"
              name="brand"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              placeholder="Product Brand "
              className="w-full  bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
          </div>
          <div className="flex gap-1">
            <Input
              type="file"
              name="productImage1"
              accept="image/"
              onChange={(e) =>
                setProduct({
                  ...product,
                  productImage1: e.target.files[0],
                })
              }
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
            <Input
              type="file"
              name="productImage2"
              accept="image/"
              onChange={(e) =>
                setProduct({
                  ...product,
                  productImage2: e.target.files[0],
                })
              }
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
            <Input
              type="file"
              name="productImage3"
              accept="image/"
              onChange={(e) =>
                setProduct({
                  ...product,
                  productImage3: e.target.files[0],
                })
              }
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
            <Input
              type="file"
              name="productImage4"
              accept="image/"
              onChange={(e) =>
                setProduct({
                  ...product,
                  productImage4: e.target.files[0],
                })
              }
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
          </div>
          <div className="flex  gap-1">
            <Input
              type="text"
              name="sku"
              value={product.sku}
              onChange={(e) =>
                setProduct({
                  ...product,
                  sku: e.target.value,
                })
              }
              placeholder="Product SKU"
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />

            <Input
              type="text"
              name="size"
              value={product.size}
              onChange={(e) => setProduct({ ...product, size: e.target.value })}
              placeholder="Product Size "
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            />
            <Input
              type="text"
              name="color"
              value={product.color}
              onChange={(e) =>
                setProduct({ ...product, color: e.target.value })
              }
              placeholder="Product Color "
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
          </div>
          <div className="flex gap-1">
            <Input
              type="text"
              name="desc"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder="Product Description"
              className="w-full  bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white h-[100px]"
              isTextArea={true}
              required
            />
            <Input
              type="text"
              name="desc"
              value={product.shortDescription}
              onChange={(e) =>
                setProduct({ ...product, shortDescription: e.target.value })
              }
              placeholder="Product Short Description"
              className="w-full  bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white h-[80px]"
              isTextArea={true}
              required
            />
          </div>
          <div className="flex gap-1">
            <Input
              type="text"
              name="mrpPrice"
              value={product.mrpPrice}
              onChange={(e) =>
                setProduct({ ...product, mrpPrice: e.target.value })
              }
              placeholder="MRP Price"
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
            <Input
              type="text"
              name="sellingPrice"
              value={product.sellingPrice}
              onChange={(e) =>
                setProduct({ ...product, sellingPrice: e.target.value })
              }
              placeholder="Selling Price"
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
            <Input
              type="text"
              name="stock"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
              placeholder="Stock"
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              required
            />
            <Input
              type="text"
              name="weight"
              value={product.weight}
              onChange={(e) =>
                setProduct({ ...product, weight: e.target.value })
              }
              placeholder="Product Weight "
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            />
            <Input
              type="text"
              name="weightType"
              value={product.weightType}
              onChange={(e) =>
                setProduct({ ...product, weightType: e.target.value })
              }
              placeholder="Weight Type"
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            />
          </div>
          <div className="flex gap-1">
            <Input
              type="text"
              name="metaTitle"
              value={product.metaTitle}
              onChange={(e) =>
                setProduct({
                  ...product,
                  metaTitle: e.target.value,
                })
              }
              placeholder="Meta Title"
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            />
            <Input
              type="text"
              name="metaKeywords"
              value={product.metaKeywords}
              onChange={(e) =>
                setProduct({
                  ...product,
                  metaKeywords: e.target.value,
                })
              }
              placeholder="Meta Keywords"
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
            />
            <Input
              type="text"
              name="metaDescription"
              value={product.metaDescription}
              onChange={(e) =>
                setProduct({
                  ...product,
                  metaDescription: e.target.value,
                })
              }
              placeholder="Meta Description"
              className="w-full bg-[#f5f5f6] border-[1px] rounded-sm focus:bg-white"
              isTextArea={true}
            />
          </div>

          <Button
            label="Create Product"
            type="submit"
            className="w-[180px] text-[14px]"
          />
        </form>
      </div>
    )
  );
}

export default DialogProduct;
