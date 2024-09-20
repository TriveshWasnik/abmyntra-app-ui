import axios from "axios";
import { useDispatch } from "react-redux";
import { setCategories } from "../store/categorySlice.js";

async function useGetCategories() {
  const dispatch = useDispatch();
  try {
    const res = await axios.get(
      "https://abmyntra-api.onrender.com/api/v1/category/list",
      {
        withCredentials: true,
      }
    );
    dispatch(setCategories(res.data.data));
  } catch (error) {}
}

export default useGetCategories;
