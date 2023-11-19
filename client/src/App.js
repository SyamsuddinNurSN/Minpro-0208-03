import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { LoginUser } from "./components/Login";
import { RegisterUser } from "./components/Register";
import { MenuPage } from "./pages/MenuPage";
import { CreateProductPage } from "./pages/createProductPage";
import { AdminPage } from "./pages/adminPage";

import { Profile } from "./components/Profile/Profile";
import { RegisterCashier } from "./components/RegisterCashier";
import EditProfilePage from "./components/Profile/EditProfile";
import HomePage from "./pages/HomePage";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "./redux/userSlice";
import { ProductDetailPage } from "./pages/productDetailPage";
import axios from "axios";
import { CategoryManagePage } from "./pages/categoryManagePage";
import { StatusProductModal } from "./components/productDetail/statusProductModal";
import { EditProductModal } from "./components/productDetail/editProductModal";
import { MenuCashier } from "./pages/MenuPageCashier";
import { SalesReportPage } from "./pages/salesReportPage";


const router = createBrowserRouter([
  { path: "/home", element: <HomePage /> },
  { path: "/register", element: <RegisterUser /> },

  { path: "/product-list", element: <MenuPage /> },
  { path: "/create-product", element: <CreateProductPage /> },
  { path: "/admin", element: <AdminPage /> },
  
  { path: "/product-list", element: <MenuPage /> },
  { path: "/list-cashier", element: <Listcashier /> },
  { path: "/create-product", element: <CreateProductPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/register-cashier", element: <RegisterCashier /> },

  { path: "/menu-cashier", element: <MenuCashier /> },
  { path: "/reset-password/:email", element: <ResetPasswordForm /> },
  { path: "/resetpasswordemail", element: <ResetPasswordEmailForm /> },
  { path: "/", element: <LoginUser /> },
  { path: "/profile-setting", element: <EditProfilePage /> },
  
  { path: "/product-detail/:id", element: <ProductDetailPage /> },
  { path: "/manage-category", element: <CategoryManagePage /> },
  { path: "/sales-report", element: <SalesReportPage /> }

  { path: "/product-detail", element: <ProductDetailPage /> },
  // Testing Modal
  { path: "/modal", element: <StatusProductModal /> },
  { path: "/modal-2", element: <EditProductModal /> },
  { path: "/verify/:id", element: <Verify />},
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
  }


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
