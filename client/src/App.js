import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { LoginUser } from "./components/Login";
import { RegisterUser } from "./components/Register";
import { Profile } from "./components/Profile/Profile";
import EditProfilePage from "./components/Profile/EditProfile";
import HomePage from "./pages/HomePage";
import { RegisterCashier } from "./components/RegisterCashier";

const router = createBrowserRouter([
  { path: "/home", element: <HomePage />},
  { path: "/register", element: <RegisterUser /> },
  { path: "/register-cashier", element: <RegisterCashier />},
  { path: "/login", element: <LoginUser/> },
  { path: "/profile", element: <Profile/>},
  { path: "/profile-setting", element: <EditProfilePage />},
  { path: "/", element: <WelcomePage /> }, // Default route
]);

function App () {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


export default App;