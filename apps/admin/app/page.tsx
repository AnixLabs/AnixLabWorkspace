import { auth } from "@shared/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const h = await headers();

  const [allUsers, adminUsers, bannedUsers, currentSession] = await Promise.all([
    auth.api.listUsers({ query: { limit: 1 }, headers: h }),
    auth.api.listUsers({ query: { limit: 1, filterField: "role", filterOperator: "eq", filterValue: "admin" }, headers: h }),
    auth.api.listUsers({ query: { limit: 1, filterField: "banned", filterOperator: "eq", filterValue: "true" }, headers: h }),
    auth.api.getSession({ headers: h }),
  ]);

  const recentUsers = await auth.api.listUsers({
    query: { limit: 5, sortBy: "createdAt", sortDirection: "desc" },
    headers: h,
  });

  const stats = [
    { label: "Total Users", value: allUsers?.total ?? 0, icon: "👥", href: "/users" },
    { label: "Admins", value: adminUsers?.total ?? 0, icon: "🛡️", href: "/users" },
    { label: "Banned", value: bannedUsers?.total ?? 0, icon: "🚫", href: "/users" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Logged in as <span className="font-medium">{currentSession?.user?.name}</span>{" "}
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {currentSession?.user?.role ?? "admin"}
          </span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="border rounded-xl p-5 bg-white dark:bg-neutral-900 hover:shadow-md transition">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Users */}
      <div className="border rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Recent Users</h2>
          <Link href="/users" className="text-sm text-blue-500 hover:underline">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {recentUsers?.users.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <div className="flex items-center justify-between py-2 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded px-2 transition">
                <div className="flex items-center gap-3">
                  {user.image ? (
                    // 
                    <Image src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover" width={40} height={40} unoptimized />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-bold">
                      {user.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-gray-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">
                    {user.role ?? "user"}
                  </span>
                  {user.banned && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      banned
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "All Users", href: "/users", icon: "👥" },
          { label: "Create User", href: "/users/create", icon: "➕" },
          { label: "Sign Out", href: "/signout", icon: "🚪" },
        ].map((link) => (
          <Link key={link.label} href={link.href}>
            <div className="border rounded-xl p-4 bg-white dark:bg-neutral-900 hover:shadow-md transition text-center">
              <div className="text-2xl mb-1">{link.icon}</div>
              <p className="text-sm font-medium">{link.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}