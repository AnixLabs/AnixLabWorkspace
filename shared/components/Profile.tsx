"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IconButton } from "./ui/Button";
import ThemePicker from "./theme/ThemePicker";
import { twMerge } from "tailwind-merge";
import { IoColorPaletteOutline, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useSession } from "@shared/auth/client";
import type { SessionUser } from "@shared/auth/types";

function ProfilePopups({ user }: { user: SessionUser }) {
  const [profilePop, setProfilePop] = useState(false);
  const [themePop, setThemePop] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setProfilePop(!profilePop)}
        aria-label="Profile"
        svg={<CgProfile />}
      />
      {profilePop && (
        <div
          className="fixed top-16 right-2 bg-theme-100 dark:bg-neutral-800 z-20 shadow dark:shadow-neutral-600 p-4 rounded-md w-56 sm:w-xs max-w-screen"
          style={{ position: "fixed" }}
        >
          <ul className="flex flex-col gap-2 *:flex *:items-center *:gap-2">
            <li>
              <Image
                src={user.image ?? "https://i.ibb.co/1JGDTytY/default-Profile-Pic.webp"}
                width={30}
                height={30}
                className="rounded-full"
                alt={user.name ?? "Profile Pic"}
                unoptimized
              />
              <div className="flex flex-col">
                <span className="font-bold">
                  {user.name}
                  {user?.role && user.role !== "user"
                    ? ` (${user.role.charAt(0).toUpperCase() + user.role.slice(1)})`
                    : ""}
                </span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </li>
            <li className="border-b"></li>
            <li>
              <Link href="/setting" className="text-inherit hover:text-theme-450 flex gap-2">
                <IoSettingsOutline /> Setting
              </Link>
            </li>
            <li
              onClick={() => setThemePop(!themePop)}
              className="hover:text-theme-450 cursor-pointer"
            >
              <IoColorPaletteOutline /> Change Theme
            </li>
            <li
              className={twMerge(
                "flex-col space-y-2 text-center max-h-0 overflow-hidden transition-all",
                themePop && "max-h-screen",
              )}
            >
              <ThemePicker />
            </li>
          </ul>
          <label
            className="fixed -z-10 top-0 left-0 right-0 bottom-0"
            onClick={() => {
              setProfilePop(false);
              setThemePop(false);
            }}
          />
        </div>
      )}
    </>
  );
}

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  if (!user) return null;

  return <ProfilePopups key={pathname} user={user} />;
}
