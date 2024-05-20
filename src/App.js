import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Brands from "./Components/Brands";
import Cart from "./Components/Cart";
import Products from "./Components/Products";
import PageNotFound from "./Components/PageNotFound";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails";
import { ToastContainer } from "react-toastify";
import Address from "./Components/Address";
import Orders from "./Components/Orders";
import AllCategories from "./Components/AllCategories";
import ForgotPassword from "./Components/ForgotPassword";
import VerifyCode from "./Components/VerifyCode";
import ResetPassword from "./Components/ResetPassword";
import AllProducts from "./Components/AllProducts";
import WishList from "./Components/WishList";
// import SpecificCategory from "./Components/SpecificCategory";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import CartContextProvider from "./Contexts/CartContext";

function App() {
  const queryClient = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Navigate to={"home"} /> },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "allProducts",
          element: (
            <ProtectedRoute>
              <AllProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "address/:cartId",
          element: (
            <ProtectedRoute>
              {" "}
              <Address />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <AllCategories />
            </ProtectedRoute>
          ),
        },
        {
          path: "allOrders",
          element: (
            <ProtectedRoute>
              {" "}
              <Orders />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              {" "}
              <WishList />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "passwordReset", element: <ForgotPassword /> },

        { path: "verifyCode", element: <VerifyCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Login /> },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
            <AuthContextProvider>
              <RouterProvider router={routes}></RouterProvider>;
            </AuthContextProvider>
          </CartContextProvider>
          <ToastContainer />

        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
