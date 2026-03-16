// /components/navigation/SlideBarLayout.tsx

import { Suspense } from "react";
import SlideBarClient from "./client";
import { commonMenu, commonQuickURLs } from "./data";
import type { MenuItem } from "./types";

export default function SlideBarLayout({
  menuItem = [],
  quickURLs = [],
}: {
  menuItem?: MenuItem[];
  quickURLs?: { url: string; label: string }[];
}) {
  const finalQuickURLs = [...quickURLs, ...commonQuickURLs].slice(0, 3);
  const mergedMenu = [...menuItem, ...commonMenu];

  return (
    <Suspense fallback={<div className="md:w-16 w-0" />}>
      <SlideBarClient mergedMenu={mergedMenu} finalQuickURLs={finalQuickURLs} />
    </Suspense>
  );
}
