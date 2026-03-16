// /components/navigation/SlideBarClient.tsx
"use client";

import Link from "next/link";
import { IconButton } from "../../ui/Button";
import { startTransition, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { RiHomeHeartLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";
import { PiTelegramLogo, PiYoutubeLogo } from "react-icons/pi";
import { signOut, useSession } from "@shared/auth/client";
import type { MenuItem, QuickURL } from "./types";
import SideBarItem from "./item";

export default function SlideBarClient({
  mergedMenu,
  finalQuickURLs,
}: {
  mergedMenu: MenuItem[];
  finalQuickURLs: QuickURL[];
}) {
  const { data: session } = useSession();
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const [showSideBar, setShowSideBar] = useState(false);

  const updatedMenu: MenuItem[] =
    pathname !== "/"
      ? [{ label: "Home", icon: <RiHomeHeartLine />, url: "/", hr: true }, ...mergedMenu]
      : mergedMenu;

  const filteredMenu = updatedMenu
    .filter((item) => (session != null ? !item.showOnLoggedOut : !item.showOnLoggedIn))
    .map((item) =>
      item.label === "Logout"
        ? {
            ...item,
            onClick: () =>
              void signOut({
                fetchOptions: { onSuccess: () => window.location.reload() },
              }),
          }
        : item,
    );

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    if (checkboxRef.current) checkboxRef.current.checked = false;
    startTransition(() => setShowSideBar(false));
  }, [pathname]);

  return (
    <>
      <style>
        {showSideBar ? `.tNav .h2 {opacity: 1 !important;}` : `.tNav .h1 {opacity: 1 !important;}`}
      </style>
      <input
        type="checkbox"
        ref={checkboxRef}
        id="SideBarInput"
        onChange={(e) => setShowSideBar(e.target.checked)}
        className="hidden"
      />
      <div
        className={`w-full fixed left-0 top-0 bottom-0 md:relative transition-all duration-300 z-20 md:z-10 md:shrink-0 h-full md:h-auto flex justify-start md:block ${
          showSideBar ? "ml-0 md:w-56" : "md:w-16 -ml-[100%] md:ml-0"
        }`}
      >
        <div className="mnBr w-11/12 max-w-md md:w-auto relative md:sticky md:top-14.5 lg:top-15.25 xl:top-16 max-[767.98px]:h-full max-[767.98px]:rounded-r-xl max-[767.98px]:z-3 max-[767.98px]:overflow-hidden">
          <div className="mnBrs md:h-[calc(100vh-58px)] lg:h-[calc(100vh-61px)] xl:h-[calc(100vh-64px)] bg-theme-50 dark:bg-neutral-900 md:*:w-full md:flex md:relative md:shadow-[0_0_15px] md:shadow-black/5 pt-14 md:pt-0 max-[767.98px]:pt-14 max-[767.98px]:overflow-y-scroll max-[767.98px]:overflow-x-hidden max-[767.98px]:w-full max-[767.98px]:h-full">
            {/* Close button */}
            <div className="absolute z-10 top-0 left-0 bg-inherit flex items-center pl-4 md:hidden w-full h-16 shadow-2xs">
              <label
                aria-label="Close"
                className="flex md:hidden items-center gap-1 text-md opacity-80 font-bold cursor-pointer"
                htmlFor="SideBarInput"
              >
                <span className="text-2xl -mt-0.5">&times;</span> Close
              </label>
            </div>

            {/* Bottom bar */}
            <div
              className={`transition-all duration-300 self-end border-t bottom-0 left-0 right-0 absolute text-center bg-inherit shadow-[-5px_-5px_15px] shadow-black/5 z-1 pt-4 ${
                showSideBar ? "md:w-56" : "md:w-16 md:pb-4"
              }`}
            >
              {showSideBar ? (
                <div className="whitespace-nowrap overflow-hidden">
                  <ul className="space-x-2 *:inline">
                    {finalQuickURLs.map((val) => (
                      <li key={val.url}>
                        <Link href={val.url} className="text-inherit hover:underline">
                          {val.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <IconButton htmlFor="SideBarInput" className="m-0">
                    <svg viewBox="0 0 512 512">
                      <path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256 c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32 C448,238.3,434.3,224,417.4,224z" />
                    </svg>
                  </IconButton>
                </div>
              )}

              <ul
                className={
                  showSideBar
                    ? "flex justify-center -left-2 -right-2 mt-1 relative w-full *:relative"
                    : "hidden"
                }
              >
                {[
                  {
                    href: "https://www.youtube.com/Anix7Anime",
                    label: "Youtube",
                    icon: <PiYoutubeLogo />,
                  },
                  {
                    href: "https://Instagram.com/anix7_anime",
                    label: "Instagram",
                    icon: <IoLogoInstagram />,
                  },
                  {
                    href: "https://Anix7Official.t.me/",
                    label: "Telegram",
                    icon: <PiTelegramLogo />,
                  },
                ].map(({ href, label, icon }) => (
                  <li key={label}>
                    <IconButton
                      aria-label={label}
                      href={href}
                      rel="noopener"
                      role="button"
                      target="_blank"
                    >
                      {icon}
                    </IconButton>
                  </li>
                ))}
              </ul>
            </div>

            {/* Menu */}
            <div
              className={`px-4 pt-5 pb-28 ${
                showSideBar
                  ? "md:overflow-x-hidden md:overflow-y-hidden md:hover:overflow-y-scroll md:px-5"
                  : "md:overflow-y-visible md:overflow-x-visible"
              }`}
            >
              <ul
                className="[&_svg]:opacity-80"
                itemScope
                itemType="https://schema.org/SiteNavigationElement"
              >
                {filteredMenu.map((item, index) => (
                  <SideBarItem key={index} item={item} showSideBar={showSideBar} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <label
          className={`block md:hidden fixed -top-1/2 -left-1/2 -right-1/2 -bottom-1/2 z-1 transition-all duration-300 bg-black/20 backdrop-blur-md cursor-pointer ${
            showSideBar ? "visible opacity-100" : "invisible opacity-0"
          }`}
          htmlFor="SideBarInput"
        />
      </div>
    </>
  );
}
