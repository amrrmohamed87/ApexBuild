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

import logo from "../assets/ourService.png";
import { IoIosArrowDropleft } from "react-icons/io";

function LeftSiderbar() {
  const [open, setIsOpen] = useState(false);
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
        } fixed top-0 md:flex px-6 py-5 flex-col justify-between h-screen ${
          open ? "w-72" : "w-20"
        } bg-[#18202e]
         transition-all duration-300 z-50`}
      >
        <IoIosArrowDropleft
          size={30}
          className={`absolute cursor-pointer -right-3 top-9 text-white text-opacity-35 hover:text-opacity-100 transition-all bg-[#18202e] rounded-full ${
            !open && "rotate-180 transition-all duration-300"
          }`}
          onClick={() => {
            setIsOpen(!open);
          }}
        />
        <div className="flex flex-col gap-3">
          <Link to="/dashboard">
            {/* <p className="text-white text-[10px] font-yourFont">
              ConstructMeta
            </p> */}
            <img src={logo} alt="logo" width={250} />
          </Link>

          <Link className="flex items-center gap-3">
            <img
              src={avatar}
              alt="profile-pic"
              className={`${
                open ? "h-10" : "h-8"
              } w-10 rounded-full duration-300`}
            />

            <div className="flex flex-col">
              <p className={`text-white origin-left ${!open && "scale-0"}`}>
                {name}
              </p>
              <p
                className={`text-white text-opacity-30 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap origin-left ${
                  !open && "scale-0"
                }`}
              >
                {company}
              </p>
            </div>
          </Link>

          <ul className="flex flex-col gap-3 m-1">
            {sidebarLinks.map((link) => (
              <li key={link.label} className="text-white text-opacity-35">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#414142] flex items-center gap-2 p-1 rounded text-white"
                      : "bg-transparent flex items-center gap-2 p-1 rounded transition-all duration-300 hover:text-white"
                  }
                >
                  {link.icon} {open ? link.label : ""}
                </NavLink>
              </li>
            ))}
          </ul>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="bg-transparent flex items-center gap-2 p-1 rounded transition-all duration-300 text-white text-opacity-35 hover:text-white">
                <BiLogOut size={20} />{" "}
                <p className={`origin-left ${!open && "scale-0"}`}>Logout</p>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-black border border-blue-900">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-300 tracking-wider">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white tracking-wide">
                  This action will permanently Log you out from your account and
                  you are no longer available to use this services until you
                  login again.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex items-center gap-3">
                <AlertDialogCancel className="bg-gray-700 px-3 py-2 rounded-lg text-white hover:bg-gray-800 transition-all duration-300">
                  Cancel
                </AlertDialogCancel>
                <Form action="/logout" method="post">
                  <button
                    onClick={logoutHandler}
                    className="bg-white px-3 py-2 rounded-lg text-md text-black hover:bg-red-500 hover:text-white transition-all duration-300"
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
