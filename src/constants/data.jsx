import materialTransferImage from "../assets/material-transfer.jpg";
import materialTrackingImage from "../assets/material-tracking.jpg";
import monthlyInvoicesImage from "../assets/monthly-invoices.jpg";
import inspectionImage from "../assets/Inspection.jpg";
import progress1 from "../assets/progress1.jpg";

import transfer from "../svg/transfer-feature.svg";
import tracking from "../svg/tracking.svg";
import invoices from "../svg/invoices.svg";
import search from "../svg/inspect.svg";
import growth from "../svg/progress.svg";

import { TbTransfer } from "react-icons/tb";
import { LuHistory } from "react-icons/lu";
import { RiFolderReceivedLine } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { FaBalanceScaleRight } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export const navLinks = [
  { label: "Home", to: "home" },
  { label: "Features", to: "features" },
  { label: "Services", to: "services" },
  { label: "About Us", to: "about-us" },
  { label: "Get in touch", to: "contact-us" },
];

export const sidebarLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <LuLayoutDashboard size={20} />,
  },
  { label: "Transfer", to: "/transfer", icon: <TbTransfer size={20} /> },
  { label: "Balance", to: "/balance", icon: <FaBalanceScaleRight size={20} /> },
  { label: "Items Editor", to: "/items-editor", icon: <FaEdit size={20} /> },
  { label: "History", to: "/history", icon: <LuHistory /> },
  { label: "Income", to: "/income", icon: <RiFolderReceivedLine /> },
  {
    label: "Request",
    to: "/request",
    icon: <CiSquareQuestion size={20} />,
  },
  { label: "User", to: "/user", icon: <FaUserPlus size={20} /> },
];

export const features = [
  {
    src: transfer,
    title: "Material Transfer",
    description:
      "The process of moving or sharing resources between locations or entities, ensuring legal and efficient handling.",
  },
  {
    src: tracking,
    title: "Material Tracking",
    description:
      "Monitoring the movement and status of materials through the supply chain, ensuring timely delivery and inventory accuracy.",
  },
  {
    src: invoices,
    title: "Monthly Invoices",
    description:
      "Detail transactions and payments for services or goods over a month, aiding in financial management and record-keeping.",
  },
  {
    src: search,
    title: "Inspection",
    description:
      "The process of examining materials or systems to ensure they meet quality and safety standards.",
  },
  {
    src: growth,
    title: "Progress Tracking",
    description:
      "Monitoring the advancement of tasks or projects to ensure timely completion and adherence to goals.",
  },
];

export const services = [
  { src: materialTransferImage, label: "Material Transfers" },
  { src: materialTrackingImage, label: "Material Tracking" },
  { src: monthlyInvoicesImage, label: "Monthly Invoices" },
  { src: inspectionImage, label: "Inspection" },
  { src: progress1, label: "Progress Tracking" },
];

export const footerlinks = [
  { label: "Help", to: "/help" },
  { label: "About", to: "about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms And Conditions", to: "/terms" },
];

export const itemConditions = [
  { value: "good", condition: "Good" },
  { value: "maintenance", condition: "Maintenance" },
  { value: "waste", condition: "Waste" },
];
