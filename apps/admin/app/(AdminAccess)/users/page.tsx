import { auth } from "@shared/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function UsersPage() {
  const data = await auth.api.listUsers({
    query: { limit: 100, sortBy: "createdAt", sortDirection: "desc" },
    headers: await headers(),
  });

  const users = data?.users ?? [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-gray-500">{data?.total ?? 0} total</p>
        </div>
        <Link
          href="/users/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
        >
          + Create User
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer bg-white dark:bg-neutral-900">
              <div className="flex items-center gap-3 mb-2">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                    width={40}
                    height={40}
                    unoptimized
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-bold">
                    {user.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role ?? "user"}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
              <p className="text-xs text-gray-300 mt-1">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-1 mt-2 flex-wrap">
                {user.banned && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    banned
                  </span>
                )}
                {user.emailVerified && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                    verified
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
