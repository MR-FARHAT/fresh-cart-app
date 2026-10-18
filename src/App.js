import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { store } from "./Redux/store";
import AuthContextProvider from "./Contexts/AuthContext";
import CartContextProvider from "./Contexts/CartContext";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Components/Home";
import Brands from "./Components/Brands";
import Cart from "./Components/Cart";
import AllProducts from "./Components/AllProducts";
import AllCategories from "./Components/AllCategories";
import ProductDetails from "./Components/ProductDetails";
import Address from "./Components/Address";
import Orders from "./Components/Orders";
import WishList from "./Components/WishList";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ForgotPassword from "./Components/ForgotPassword";
import VerifyCode from "./Components/VerifyCode";
import ResetPassword from "./Components/ResetPassword";
import PageNotFound from "./Components/PageNotFound";

const queryClient = new QueryClient();

const protect = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

const router = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="home" replace /> },
        { path: "home", element: protect(<Home />) },
        { path: "allProducts", element: protect(<AllProducts />) },
        { path: "categories", element: protect(<AllCategories />) },
        { path: "brands", element: protect(<Brands />) },
        { path: "productDetails/:id", element: protect(<ProductDetails />) },
        { path: "cart", element: protect(<Cart />) },
        { path: "address/:cartId", element: protect(<Address />) },
        { path: "allOrders", element: protect(<Orders />) },
        { path: "wishlist", element: protect(<WishList />) },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "passwordReset", element: <ForgotPassword /> },
        { path: "verifyCode", element: <VerifyCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL },
);

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
          </CartContextProvider>
        </AuthContextProvider>
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}
