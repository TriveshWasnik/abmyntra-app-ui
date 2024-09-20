import React from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

async function useGetProductsInfoTable() {
  const resTable = [];
  const hi = "";
  try {
    const res = await axios.get(
      "https://abmyntra-api.onrender.com/api/v1/product/all",
      { withCredentials: true }
    );
    res.data.data.map((item, index) => {
      const obj = {
        sno: index + 1,
        productImage: <img src={item.productImage1} alt="" className="w-28" />,
        productName: item.name,
        productDescription: item.description,
        productStock: item.stock,
        productPrice: item.mrpPrice,
        createdDate: new Date(item.createdAt).toDateString(),
        productStatus: item.status,

        actions: (
          <div className="flex gap-1 items-center justify-center">
            <div onClick={() => deleteProduct(item._id)}>
              <FaTrash className="text-red-500" />
            </div>
          </div>
        ),
      };

      resTable.push(obj);
    });

    return resTable;
  } catch (error) {}
}
export default useGetProductsInfoTable;

async function deleteProduct(id) {
  try {
    const result = confirm("Are You sure want to delete the product?");
    if (result === true) {
      const res = await axios.delete(
        `https://abmyntra-api.onrender.com/api/v1/product/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(`Product Deleted!`, {
          position: "top-center",
        });
        navigate("/dashboard");
      } else {
        toast.error(res.data.message, {
          position: "top-center",
        });
      }
    }
  } catch (error) {}
}
