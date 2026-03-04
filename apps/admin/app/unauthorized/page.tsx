import { auth } from "@shared/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function UnauthorizedPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl shadow-lg p-8 text-center space-y-4 border bg-white dark:bg-neutral-900">
        <h1 className="text-3xl font-bold text-red-500">Unauthorized</h1>

        {session?.user ? (
          <>
            <p className="text-gray-500">
              <strong>Hey {session.user.name}</strong>, you do not have permission to access the
              admin panel.
            </p>
            <Link
              href="/"
              className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
            >
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <p className="text-gray-500">You must be signed in as an admin to view this page.</p>
            <Link
              href="/signin"
              className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
