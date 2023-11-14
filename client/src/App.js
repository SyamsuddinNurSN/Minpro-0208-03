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

const router = createBrowserRouter([
  { path: "/home", element: <HomePage /> },
  { path: "/register", element: <RegisterUser /> },
  { path: "/login", element: <LoginUser /> },
  { path: "/menu", element: <MenuPage /> },
  { path: "/create-product", element: <CreateProductPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/register-cashier", element: <RegisterCashier /> },
  { path: "/login", element: <LoginUser /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile-setting", element: <EditProfilePage /> },
  { path: "/", element: <WelcomePage /> }, // Default route
])

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const KeepLogin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/users/keep-login`,
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
    
    useEffect(() => {
    KeepLogin();
  }, []);
}
    return (
    <>
      <RouterProvider router={router} />
    </>
  );
    
  ;

  

  
}

export default App;
