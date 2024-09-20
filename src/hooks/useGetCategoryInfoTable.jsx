import axios from "axios";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
// this hook Get all the users
async function useGetCategoryInfoTable() {
  const resTable = [];
  try {
    const res = await axios.get(
      "https://abmyntra-api.onrender.com/api/v1/category/list",
      { withCredentials: true }
    );

    res.data.data.map((item, index) => {
      const obj = {
        sno: index + 1,
        name: item.name,
        type: item.parentCategory.length > 0 ? "Sub Category" : "Main Category",
        desc: item.desc,
        createdDate: new Date(item.createdAt).toDateString(),
        status: item.status,
        actions: (
          <div className="flex gap-1 items-center justify-center">
            <FaTrash
              className="text-red-500"
              onClick={() => deleteCategory(item._id)}
            />
          </div>
        ),
      };
      return resTable.push(obj);
    });
    return resTable;
  } catch (error) {
    console.log(error);
  }
}

export default useGetCategoryInfoTable;

async function deleteCategory(id) {
  try {
    const res = await axios.delete(
      `https://abmyntra-api.onrender.com/api/v1/category/${id}`,
      { withCredentials: true }
    );
    if (res.data.success) {
      toast.success(`Category Deleted!`, {
        position: "top-center",
      });
      navigate("/dashboard");
    } else {
      toast.error(res.data.message, {
        position: "top-center",
      });
    }
  } catch (error) {}
}
