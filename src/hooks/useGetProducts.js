import { useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "../store/productSlice.js";
async function useGetProducts() {
  const dispatch = useDispatch();
  try {
    let res = await axios.get(
      `https://abmyntra-api.onrender.com/api/v1/product/all`
    );
    dispatch(setProducts(res.data.data));
  } catch (error) {
    console.log(error);
  }
}

export default useGetProducts;
