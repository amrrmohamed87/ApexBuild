import { Outlet } from "react-router-dom";
import LeftSiderbar from "./components/LeftSidebar";
function RootLayout() {
  return (
    <>
      <div className="flex flex-col">
        <LeftSiderbar />
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
