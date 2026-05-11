"use client";

import type { SortOption } from "@/features/images/schemas";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" },
  { label: "Most Viewed", value: "views" },
  { label: "Most Downloaded", value: "downloads" },
];

export default function FilterBar({
  currentSort = "latest",
  currentQ,
}: {
  currentSort?: SortOption;
  currentQ?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentQ ?? "");

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, val] of Object.entries(updates)) {
        if (val) params.set(key, val);
        else params.delete(key);
      }
      void router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const handleSearchSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    updateParams({ q: search || undefined });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Sort tabs */}
      <div className="flex gap-1 p-1 rounded-2xl bg-neutral-900 border shrink-0">
        {SORT_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => updateParams({ sort: value === "latest" ? undefined : value })}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentSort === value
                ? "bg-white text-neutral-950 shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2 items-center min-w-1/2">
        <div className="flex-1 relative">
          <IoSearchOutline className="absolute left-2 top-3.5 text-neutral-500 text-base pointer-events-none" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tags..."
            className="w-full pl-8 pr-8 py-2.5"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                updateParams({ q: undefined });
              }}
              className="absolute right-1.5 top-3 text-neutral-500 cursor-pointer hover:text-neutral-700 transition-colors"
            >
              <IoClose className="text-sm" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
