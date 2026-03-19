// /components/navigation/slidebarData.tsx
import { RiGroupLine } from "react-icons/ri";
import { TiWarningOutline } from "react-icons/ti";
import { MdAlternateEmail, MdOutlineSecurity } from "react-icons/md";
import { IoPower } from "react-icons/io5";
import type { MenuItem, QuickURL } from "./types";

export const commonMenu: MenuItem[] = [
  {
    label: "About Us",
    icon: <RiGroupLine />,
    url: "https://www.anixlab.in/page/about-us",
  },
  {
    label: "Contact Us",
    icon: <MdAlternateEmail />,
    url: "https://www.anixlab.in/page/contact-us",
    hr: true,
  },
  {
    label: "Disclaimer",
    icon: <TiWarningOutline />,
    url: "https://www.anixlab.in/page/disclaimer",
  },
  {
    label: "Terms of Use",
    icon: <MdOutlineSecurity />,
    url: "https://www.anixlab.in/page/terms",
    hr: true,
  },
  {
    label: "Logout",
    icon: <IoPower />,
    hr: true,
    showOnLoggedIn: true,
  },
];

export const commonQuickURLs: QuickURL[] = [
  { url: "/sitemap.xml", label: "Sitemap" },
  { url: "https://www.anixlab.in/page/dmca", label: "DMCA" },
  { url: "https://www.anixlab.in/page/privacy-policy", label: "Privacy Policy" },
];
