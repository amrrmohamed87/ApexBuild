import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { navLinks } from "../constants/data.js";

function Navbar() {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  function handleScroll() {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleSidebar() {
    setIsSidebar(!isSidebar);
  }
  return (
    <header className="z-10 absolute">
      <nav
        className={`fixed w-full h-24 max-w-[1536px] mx-auto transition-all duration-300 ${
          isScrolled ? "bg-[#2a2a2c] shadow-lg" : "bg-transparent shadow-none"
        }`}
      >
        <ul className="hidden md:flex justify-center items-center">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className={`text-white p-8 hover:animate-pulse ${
                !isScrolled && "font-bold"
              }`}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "font-extrabold" : "font-normal"
                }
                end
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div
          onClick={handleSidebar}
          className="flex justify-end items-end cursor-pointer p-6 text-white md:hidden"
        >
          {!isSidebar && <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={
            isSidebar
              ? "fixed md:hidden right-0 top-0 w-1/2 h-full bg-[#2a2a2c] bg-opacity-80 ease-in-out duration-500"
              : "fixed top-0 bottom-0 right-[-100%] ease-in-out w-[60%] duration-500"
          }
        >
          <div>
            <button onClick={handleSidebar} className="text-white m-2">
              {isSidebar && <AiOutlineClose size={20} />}
            </button>
          </div>
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="text-white m-2 pt-2 mb-6 hover:animate-pulse"
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "font-extrabold" : "font-normal"
                }
                end
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
