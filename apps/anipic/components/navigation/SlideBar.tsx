import SlideBarLayout from "@shared/components/navigation/slidebar/layout";
import type { MenuItem } from "@shared/components/navigation/slidebar/types";
// import { PiResize } from "react-icons/pi";

const menuItem: MenuItem[] = [
  // {
  //   label: "Anix7 Tools",
  //   icon: <IoSettingsOutline />,
  //   subMenu: [
  //     {
  //       label: "Tools Home",
  //       icon: <RiHomeHeartLine />,
  //       url: "https://tools.anix7.in",
  //     },
  //     {
  //       label: "Bulk Image Resizer",
  //       icon: <PiResize />,
  //       url: "https://tools.anix7.in/bulk-image-resizer",
  //     },
  //   ],
  // },
];

export default function SlideBar() {
  return <SlideBarLayout menuItem={menuItem} />;
}
