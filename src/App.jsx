import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Root.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Transfer from "./pages/Transfer.jsx";
import Income from "./pages/Income.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/transfer", element: <Transfer /> },
      { path: "/income", element: <Income /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
