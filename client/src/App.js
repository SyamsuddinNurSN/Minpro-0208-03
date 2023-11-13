import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { LoginUser } from "./components/Login";
import { RegisterUser } from "./components/Register";
import { MenuPage } from "./pages/MenuPage";
import { CreateProductPage } from "./pages/createProductPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  { path: "/register", element: <RegisterUser /> },
  { path: "/login", element: <LoginUser /> },
  { path: "/menu", element: <MenuPage /> },
  { path: "/create-product", element: <CreateProductPage /> }
])
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


export default App;