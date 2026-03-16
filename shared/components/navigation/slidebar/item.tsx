// /components/navigation/SideBarItem.tsx
"use client";

import Link from "next/link";
import { twJoin, twMerge } from "tailwind-merge";
import Hr from "../../ui/Hr";
import type { MenuItem } from "./types";
import type React from "react";

function CompWrapper({
  href,
  children,
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  if (href) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return <button {...rest}>{children}</button>;
}

export default function SideBarItem({
  item,
  showSideBar,
}: {
  item: MenuItem;
  showSideBar: boolean;
}) {
  return (
    <li
      className={`relative [&_svg]:shrink-0 ${
        showSideBar
          ? "ml-1 overflow-visible w-full"
          : "md:hover:[&>.list]:opacity-100 md:hover:[&>.list]:visible md:hover:[&_.n]:opacity-100 md:hover:[&_.n]:visible"
      }`}
    >
      {item.subMenu ? (
        <>
          <input
            className="hidden peer"
            id={`drpDwn-${item.label.replace(" ", "-")}`}
            name="drpDwn"
            type="checkbox"
          />
          <label
            className={`flex items-center gap-2 relative w-full rounded-lg cursor-pointer py-2.5 px-1 hover:bg-black/10 transition-all duration-300 peer-checked:[&>.d]:rotate-180 hover:*:text-theme-450 ${
              showSideBar ? "" : "md:max-w-10 md:rounded-2xl"
            }`}
            htmlFor={`drpDwn-${item.label.replace(" ", "-")}`}
          >
            {item.icon}
            <span
              className={`block whitespace-nowrap overflow-hidden text-ellipsis grow shrink-0 text-left ${
                showSideBar
                  ? ""
                  : "md:absolute md:left-9 md:top-1 md:mx-1 md:px-2.5 md:py-2 md:rounded-2xl md:rounded-tl-sm md:bg-theme-100 md:dark:bg-neutral-900 md:opacity-0 md:invisible md:z-10"
              }`}
            >
              {item.label}
            </span>
            <svg
              className={`line transition-all duration-300 d ${showSideBar ? "" : "hidden"}`}
              viewBox="0 0 24 24"
            >
              <g transform="translate(5.000000, 8.500000)">
                <path d="M14,0 C14,0 9.856,7 7,7 C4.145,7 0,0 0,0" />
              </g>
            </svg>
          </label>

          <div
            className={twMerge(
              "list hidden opacity-0 invisible pl-7 relative",
              showSideBar
                ? "md:h-[calc(100%-18.5px)] peer-checked:block peer-checked:relative peer-checked:opacity-100 peer-checked:visible"
                : "md:m-0 md:overflow-hidden md:block md:absolute md:left-5 md:top-1 p-0.5 pl-4 pt-2 bg-transparent md:opacity-0 md:invisible md:z-10",
            )}
          >
            {showSideBar && <span className="border-l absolute h-[calc(100%-20px)] left-3.5" />}
            <ul
              className={twJoin(
                "ml-2",
                !showSideBar &&
                  "md:px-2.5 md:py-2 md:rounded-3xl md:rounded-tl-sm md:bg-theme-100 md:dark:bg-neutral-900 md:shadow",
              )}
            >
              {item.subMenu.map((subItem, i) => (
                <li
                  key={i}
                  itemProp="name"
                  className={twMerge(
                    "relative block whitespace-nowrap overflow-hidden text-ellipsis grow shrink-0 *:text-inherit hover:*:text-theme-450",
                    showSideBar ? "overflow-visible w-full mt-2" : "rounded-none",
                  )}
                >
                  {!showSideBar && i !== 0 && <Hr className="my-1" />}
                  <CompWrapper
                    {...(subItem.url ? { href: subItem.url } : {})}
                    aria-label={subItem.label}
                    onClick={subItem.onClick}
                    className={`peer flex items-center gap-2 relative w-full rounded-lg cursor-pointer py-2 px-2 hover:bg-black/10 transition-all duration-300 *:line-clamp-1 *:flex [&>svg]:mr-1 ${
                      showSideBar
                        ? "hover:[&>svg]:fill-theme-450 hover:[&>.line]:fill-none hover:[&>.line]:stroke-theme-450 border border-dotted hover:border-theme-450"
                        : ""
                    }`}
                  >
                    {subItem.icon}
                    {subItem.label}
                  </CompWrapper>
                  {showSideBar && (
                    <span className="border-b border-dotted absolute rounded-none -left-5.25 top-1/2 -translate-y-1/2 w-5 peer-hover:border-theme-450" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <CompWrapper
          href={item.url}
          aria-label={item.label}
          className={twJoin(
            "flex items-center gap-2 relative w-full rounded-lg cursor-pointer py-2.5 px-1 hover:bg-black/10 transition-all duration-300 text-inherit",
            showSideBar ? "hover:text-theme-450" : "md:max-w-10 md:rounded-full",
          )}
          onClick={item.onClick}
        >
          {item.icon}
          <span
            className={twMerge(
              "n block whitespace-nowrap overflow-hidden text-ellipsis grow shrink-0 text-left",
              !showSideBar &&
                "md:absolute md:left-5 md:top-1 p-0.5 pl-4 pt-2 bg-transparent md:opacity-0 md:invisible md:z-10 md:hover:opacity-100 md:hover:visible",
            )}
            itemProp="name"
          >
            <span
              className={twJoin(
                !showSideBar &&
                  "md:block md:py-2 md:px-3 md:rounded-full md:rounded-tl-sm md:bg-theme-100 md:dark:bg-neutral-900 hover:text-theme-450 md:shadow",
              )}
            >
              {item.label}
            </span>
          </span>
        </CompWrapper>
      )}
      {item.hr && <Hr className="w-full my-2" />}
    </li>
  );
}
