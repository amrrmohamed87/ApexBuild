import materialTransferImage from "../assets/material-transfer.jpg";
import materialTrackingImage from "../assets/material-tracking.jpg";
import monthlyInvoicesImage from "../assets/monthly-invoices.jpg";
import inspectionImage from "../assets/Inspection.jpg";
import progress1 from "../assets/progress1.jpg";

import transfer from "../assets/transfer (2).png";
import tracking from "../assets/tracking.png";
import search from "../assets/search.png";
import invoices from "../assets/monthly-bill.png";
import growth from "../assets/growth.png";

import { TbTransfer } from "react-icons/tb";
import { LuHistory } from "react-icons/lu";
import { RiFolderReceivedLine } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";

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
  { label: "History", to: "/history", icon: <LuHistory /> },
  { label: "Income", to: "/income", icon: <RiFolderReceivedLine /> },
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
  { value: "", condition: "Choose Condition..." },
  { value: "good", condition: "Good" },
  { value: "maintenance", condition: "Maintenance" },
  { value: "waste", condition: "Waste" },
];
