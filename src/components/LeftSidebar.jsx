import { useState, useEffect } from "react";
import { Link, NavLink, useSubmit, Form } from "react-router-dom";
import { sidebarLinks } from "../constants/data.jsx";

import { BiLogOut } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import logo from "../assets/icon.png";

function LeftSiderbar() {
  const [isSidebar, setIsSidebar] = useState(false);
  const submit = useSubmit();

  function logoutHandler() {
    submit(null, { action: "/logout", method: "post" });
  }

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const company = localStorage.getItem("company");
  const avatar = localStorage.getItem("avatar");
  return (
    <>
      <div className={`md:hidden fixed top-0 right-0 p-6 z-50`}>
        {isSidebar ? (
          <AiOutlineClose
            size={24}
            onClick={() => setIsSidebar(false)}
            className="cursor-pointer text-[#40E0D0]"
          />
        ) : (
          <AiOutlineMenu
            size={24}
            onClick={() => setIsSidebar(true)}
            className="cursor-pointer text-[#40E0D0]"
          />
        )}
      </div>

      <nav
        className={`${
          isSidebar ? "flex" : "hidden"
        } fixed top-0 md:flex px-2 py-4 flex-col justify-between h-screen min-w-[210px] max-w-[250px] bg-[#18202e]
         transition-all duration-300 z-50`}
      >
        <div className="flex flex-col gap-3">
          <Link to="/dashboard" className="flex gap-1 items-center">
            <p className="text-white text-[10px] font-yourFont">
              ConstructMeta
            </p>
            <img src={logo} alt="logo" width={30} height={20} />
          </Link>

          <Link className="flex items-center gap-3">
            <img
              src={avatar}
              alt="profile-pic"
              className="h-10 w-10 rounded-full"
            />

            <div className="flex flex-col">
              <p className="text-white">{name}</p>
              <p className="text-white text-opacity-30 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                {company}
              </p>
            </div>
          </Link>

          <ul className="flex flex-col gap-6 m-1">
            {sidebarLinks.map((link) => (
              <li key={link.label} className="text-white text-opacity-35">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#414142] flex items-center gap-2 p-2 rounded text-white"
                      : "bg-transparent flex items-center gap-2 p-2 rounded transition-all duration-300 hover:text-white"
                  }
                >
                  {link.icon} {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-white text-opacity-35 hover:bg-[#40E0D0] hover:text-black transition-all duration-300 flex items-center justify-start gap-1 px-2 py-2 rounded">
                <BiLogOut /> <p>Logout</p>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-black">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#40E0D0]">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white">
                  This action will permanently Log you out from your account and
                  you are no longer available to use this services until you
                  login again.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex items-center gap-3">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Form action="/logout" method="post">
                  <button
                    onClick={logoutHandler}
                    className="bg-white px-3 py-2 rounded-lg text-md text-black"
                  >
                    Logout
                  </button>
                </Form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {/* Ensure the menu icon is always visible for debugging */}
      </nav>
    </>
  );
}

export default LeftSiderbar;
