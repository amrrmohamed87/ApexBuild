import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import RootLayout from "./Root.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import Income from "./pages/Income.jsx";
import Login from "./pages/Login.jsx";
import Transfer from "./pages/Transfer.jsx";
import { action as logoutAction } from "./pages/Logout.js";
import Dashboard from "./pages/Dashboard.jsx";
import NewUser from "./pages/NewUser.jsx";
import Balance from "./pages/Balance.jsx";
import ItemsEditor from "./pages/ItemsEditor.jsx";
import Request from "./pages/Request.jsx";

//import { action as confirmAction } from "./pages/NewTransfer.jsx";
function PrivateRoutes({ children }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function PublicRoutes({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "transfer",
        element: (
          <PrivateRoutes>
            <Transfer />
          </PrivateRoutes>
        ),
      },
      {
        path: "items-editor",
        element: (
          <PrivateRoutes>
            <ItemsEditor />
          </PrivateRoutes>
        ),
      },
      {
        path: "balance",
        element: (
          <PrivateRoutes>
            <Balance />
          </PrivateRoutes>
        ),
      },
      {
        path: "history",
        element: (
          <PrivateRoutes>
            <History />
          </PrivateRoutes>
        ),
      },
      {
        path: "income",
        element: (
          <PrivateRoutes>
            <Income />
          </PrivateRoutes>
        ),
      },
      {
        path: "request",
        element: (
          <PrivateRoutes>
            <Request />
          </PrivateRoutes>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoutes>
            <NewUser />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    index: true,
    element: (
      <PublicRoutes>
        <Home />
      </PublicRoutes>
    ),
  },
  {
    path: "login",
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  { path: "logout", action: logoutAction },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
