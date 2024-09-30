import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./productSlice";
import userSlice from "./userSlice"
import categorySlice from "./categorySlice";


// Create a store

const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    product: productSlice,
  },
});
export default store;
