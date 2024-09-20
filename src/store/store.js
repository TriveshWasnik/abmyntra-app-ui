import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import categorySlice from "./categorySlice";
import orderSlice from "./orderSlice";

// Create a store

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    product: productSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
export default store;
