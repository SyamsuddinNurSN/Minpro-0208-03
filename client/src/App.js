import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { LoginUser } from "./components/Login";
import { RegisterUser } from "./components/Register";
import { MenuPage } from "./pages/MenuPage";
import { CreateProductPage } from "./pages/createProductPage";
import { AdminPage } from "./pages/adminPage";

import { Profile } from "./components/Profile/Profile";
import EditProfilePage from "./components/Profile/EditProfile";
import HomePage from "./pages/HomePage";
import { RegisterCashier } from "./components/RegisterCashier";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "./redux/userSlice";
import axios from "axios";
import { ProductDetailPage } from "./pages/productDetailPage";
import { StatusProductModal } from "./components/productDetail/statusProductModal";
import { EditProductModal } from "./components/productDetail/editProductModal";
import ResetPasswordForm from "./components/ResetPassword";
import ResetPasswordEmailForm from "./components/ResetPasswordemail";
import Listcashier from "./pages/listCashier";

const router = createBrowserRouter([
  { path: "/home", element: <HomePage /> },
  { path: "/register", element: <RegisterUser /> },
  { path: "/login", element: <LoginUser /> },
  { path: "/product-list", element: <MenuPage /> },
  { path: "/list-cashier", element: <Listcashier /> },
  { path: "/create-product", element: <CreateProductPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/register-cashier", element: <RegisterCashier /> },
  { path: "/login", element: <LoginUser /> },
  { path: "/reset-password/:email", element: <ResetPasswordForm /> },
  { path: "/resetpasswordemail", element: <ResetPasswordEmailForm /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile-setting", element: <EditProfilePage /> },
  { path: "/", element: <WelcomePage /> }, // Default route
  { path: "/product-detail", element: <ProductDetailPage /> },
  // Testing Modal
  { path: "/modal", element: <StatusProductModal /> },
  { path: "/modal-2", element: <EditProductModal /> },
]);

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const KeepLogin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/users/Keep-login`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      dispatch(setData(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    KeepLogin();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
