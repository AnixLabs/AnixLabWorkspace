"use client";

import SlideBarLayout from "@shared/components/navigation/slidebar/layout";
import type { MenuItem } from "@shared/components/navigation/slidebar/types";
import { RxImage } from "react-icons/rx";
import { PiResize } from "react-icons/pi";
import { IoQrCodeOutline, IoSettingsOutline } from "react-icons/io5";
import { RiHomeHeartLine, RiQuestionAnswerLine } from "react-icons/ri";
import { HiOutlineLink } from "react-icons/hi2";

const menuItem: MenuItem[] = [
  {
    label: "Anix Lab Tools",
    icon: <IoSettingsOutline />,
    subMenu: [
      {
        label: "Tools Home",
        icon: <RiHomeHeartLine />,
        url: "https://tools.anixlab.in",
      },
      {
        label: "Url Shortener",
        icon: <HiOutlineLink />,
        url: "https://tools.anixlab.in/url-shortener",
      },
      {
        label: "QR Code Generator",
        icon: <IoQrCodeOutline />,
        url: "https://tools.anixlab.in/qr-code-generator",
      },
      {
        label: "Bulk Image Resizer",
        icon: <PiResize />,
        url: "https://tools.anixlab.in/bulk-image-resizer",
      },
      {
        label: "Image Upload Tools",
        icon: <RxImage />,
        url: "https://tools.anixlab.in/image-uploading",
      },
    ],
  },
  {
    label: "AniPic",
    icon: <RxImage />,
    url: "https://anipic.anixlab.in",
    hr: true,
  },
  {
    label: "FAQs",
    icon: <RiQuestionAnswerLine />,
    url: "/page/faqs",
  },
];

export default function SlideBar() {
  return <SlideBarLayout menuItem={menuItem} />;
}
