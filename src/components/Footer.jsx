import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { footerlinks } from "../constants/data.jsx";

export const footerIcons = [
  { icon: <FaFacebookF size={25} />, to: "https://www.facebook.com" },
  { icon: <FiInstagram size={25} />, to: "https://www.instagram.com" },
  { icon: <FaXTwitter size={25} />, to: "https://www.twitter.com" },
  { icon: <FaLinkedinIn size={25} />, to: "https://www.linkedin.com" },
];

function Footer() {
  return (
    <section className="bg-black">
      <div className="p-4 pb-4 pt-8 md:pt-16 md:pb-4">
        <ul className="md:flex md:justify-center md:items-center md:gap-16">
          {footerlinks.map((link) => (
            <li
              key={link.label}
              className="text-white mb-8 text-center font-thin hover:font-medium"
            >
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="pb-12">
        <ul className="flex justify-center items-cente gap-6 md:gap-12">
          {footerIcons.map((icons) => (
            <li key={icons.to} className="text-white hover:animate-bounce">
              <Link to={icons.to}>{icons.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-white text-center font-thin md:pb-12">
        © 2024 ApexBuild, Inc. All rights reserved.
      </p>
    </section>
  );
}

export default Footer;
