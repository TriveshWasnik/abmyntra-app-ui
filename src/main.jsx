import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";

import CartPage from "./pages/CartPage.jsx";

// create a navigation route
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "details/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);
// Wrap the redux store
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
