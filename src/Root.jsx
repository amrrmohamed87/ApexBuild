import { Outlet } from "react-router-dom";
import LeftSiderbar from "./components/LeftSidebar";
function RootLayout() {
  return (
    <>
      <LeftSiderbar />
      <Outlet />
    </>
  );
}

export default RootLayout;
