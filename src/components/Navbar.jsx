import { useEffect, useState } from "react";
import { Link, Events } from "react-scroll";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { navLinks } from "../constants/data.jsx";

function Navbar() {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  function handleScroll() {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  function handleSidebar() {
    setIsSidebar(!isSidebar);
  }
  return (
    <header className="z-10 absolute">
      <style>
        {`
          .text-gradient {
            background: linear-gradient(to right, #6366F1, #A855F7, #EC4899);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
          }
        `}
      </style>
      <nav
        className={`fixed w-full h-16 max-w-[1536px] mx-auto transition-all duration-300 ${
          isScrolled
            ? "md:bg-[rgba(12,12,12,0.9)] md:shadow-lg"
            : "bg-transparent shadow-none"
        }`}
      >
        <ul className="hidden md:flex justify-center items-center">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className={`text-white p-4 px-20 md:px-10 hover:cursor-pointer hover:animate-pulse ${
                !isScrolled && "font-bold"
              }`}
            >
              <Link
                to={item.to}
                spy={true}
                duration={500}
                offset={-70}
                onSetActive={() => setActiveLink(item.label)}
                className={
                  activeLink === item.label ? "text-gradient" : "text-white"
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          onClick={handleSidebar}
          className="flex justify-end cursor-pointer p-6 text-white md:hidden"
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
          <div className="flex justify-start">
            <button onClick={handleSidebar} className="text-white m-2">
              {isSidebar && <AiOutlineClose size={20} />}
            </button>
          </div>
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="text-white m-2 pt-2 mb-6 hover:animate-pulse"
            >
              <Link
                to={item.to}
                duration={10}
                className={({ isActive }) =>
                  isActive ? "font-extrabold" : "font-normal"
                }
                end
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
