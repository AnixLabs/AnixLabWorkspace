"use client";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import { cn } from "@shared/utils/cn";
import type { UserWithRole } from "better-auth/plugins";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

interface Props {
  initialUsers: UserWithRole[];
  total: number;
  page: number;
  limit: number;
  q: string;
}

const PER_PAGE_OPTIONS = [20, 50, 100];

export function UsersClient({ initialUsers, total, page, limit, q }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(q);

  const totalPages = Math.ceil(total / limit);

  function buildUrl(overrides: Record<string, string | number>) {
    const params = new URLSearchParams({
      ...(search ? { q: search } : {}),
      page: String(page),
      limit: String(limit),
      ...Object.fromEntries(Object.entries(overrides).map(([k, v]) => [k, String(v)])),
    });
    // Remove empty keys
    if (!overrides.q && !search) params.delete("q");
    return `${pathname}?${params.toString()}`;
  }

  function navigate(overrides: Record<string, string | number>) {
    startTransition(() => router.push(buildUrl(overrides)));
  }

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== q) navigate({ q: search, page: 1 });
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div
      className={cn(
        "@container pb-6",
        isPending && "opacity-60 pointer-events-none transition-opacity",
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-gray-500">{total} total</p>
        </div>
        <Button href="/users/create">+ Create User</Button>
      </div>

      {/* Controls */}
      <div className="w-full flex flex-col @sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email..."
          />
        </div>
        <div className="flex items-center gap-2 text-sm shrink-0">
          <span className="text-gray-500 whitespace-nowrap">Per page:</span>
          {PER_PAGE_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => navigate({ limit: n, page: 1 })}
              className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                limit === n
                  ? "bg-blue-500 text-white border-blue-500"
                  : "dark:bg-neutral-900 dark:border-neutral-700 hover:border-blue-400"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {initialUsers.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">No users found.</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
          {initialUsers.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <Panel className="m-0">
                <div className="flex items-center gap-3 mb-2">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                      width={48}
                      height={48}
                      unoptimized
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-3xl font-bold shrink-0">
                      {user.name[0]?.toUpperCase() ?? "?"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="font-semibold truncate">{user.name}</h2>
                    <p className="text-xs text-gray-500">{user.id}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <p className="truncate">Email: {user.email}</p>
                  <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-1 mt-2 flex-wrap">
                  <Pill status={user.role === "user" ? "unknown" : "default"}>{user.role}</Pill>
                  {user.banned && <Pill status="error">banned</Pill>}
                  {user.emailVerified && <Pill status="success">verified</Pill>}
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {page > 1 && <Button onClick={() => navigate({ page: page - 1 })}>← Prev</Button>}

        <div className="flex gap-1 flex-wrap justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | "...")[]>((acc, p, i, arr) => {
              const prev = arr[i - 1];
              if (i > 0 && prev !== undefined && p - prev > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                  …
                </span>
              ) : (
                <Button
                  key={p}
                  onClick={() => navigate({ page: p })}
                  disabled={p === page}
                  className={cn(
                    "px-3 py-1.5 m-0 text-sm transition disabled:opacity-100",
                    page === p && "bg-blue-500 text-white border-blue-500",
                  )}
                >
                  {p}
                </Button>
              ),
            )}
        </div>

        {page < totalPages && <Button onClick={() => navigate({ page: page + 1 })}>Next →</Button>}
      </div>
    </div>
  );
}
