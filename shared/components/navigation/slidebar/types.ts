// /components/navigation/types.ts
import type React from "react";

export interface MenuItemDefault {
  label: string;
  icon?: React.ReactNode;
  url?: string;
  onClick?: () => void;
  hr?: boolean;
  showOnLoggedIn?: boolean;
  showOnLoggedOut?: boolean;
}

export type MenuItem = MenuItemDefault & {
  subMenu?: MenuItem[];
};

export interface QuickURL {
  url: string;
  label: string;
}