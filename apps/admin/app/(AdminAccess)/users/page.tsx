import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UsersClient } from "./UsersClient";
import { z } from "zod";

const SearchParamsSchema = z.object({
  q: z.string().optional().default(""),
  page: z.string().optional().default("1").transform(Number),
  limit: z.enum(["20", "50", "100"]).optional().default("20").transform(Number),
});

export default async function UsersPage({ searchParams }: { searchParams: unknown }) {
  const h = await headers();

  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) redirect("/");

  const permitted = await auth.api.userHasPermission({
    body: { userId: session.user.id, permissions: { user: ["list"] } },
  });

  if (!permitted?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <span className="text-5xl">🔒</span>
        <h1 className="text-xl font-semibold">Access Denied</h1>
        <p className="text-sm text-gray-500">
          You don&apos;t have permission to view the user list.
        </p>
      </div>
    );
  }

  const parsed = SearchParamsSchema.safeParse(await searchParams);

  if (!parsed.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <span className="text-5xl">⚠️</span>
        <h1 className="text-xl font-semibold">Invalid Parameters</h1>
        <p className="text-sm text-gray-500">
          {parsed.error.issues.map((i) => i.message).join(", ")}
        </p>
        <p className="text-sm text-gray-500">{parsed.error.issues.map((i) => i.path).join(", ")}</p>
      </div>
    );
  }

  const { q, page, limit } = parsed.data;
  const offset = (page - 1) * limit;

  const data = await auth.api.listUsers({
    query: {
      limit,
      offset,
      sortBy: "createdAt",
      sortDirection: "desc",
      ...(q ? { searchValue: q, searchField: "email", searchOperator: "contains" } : {}),
    },
    headers: h,
  });

  return (
    <UsersClient initialUsers={data.users} total={data.total} page={page} limit={limit} q={q} />
  );
}
