import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { LoginUser } from "./components/Login";
import { RegisterUser } from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  { path: "/register", element: <RegisterUser /> },
  { path: "/login", element: <LoginUser/> },
])
function App () {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


export default App;