import { Outlet } from "react-router-dom";
import LeftSiderbar from "./components/LeftSidebar";
function RootLayout() {
  return (
    <>
      <main className="w-full h-screen flex flex-row relative">
        <LeftSiderbar />
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
