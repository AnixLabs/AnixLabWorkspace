import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  banUser, unbanUser, setRole,
  revokeAllSessions, revokeSession, removeUser, setPassword,
} from "./actions";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const h = await headers();

  const [user, sessions, currentSession] = await Promise.all([
    auth.api.getUser({ query: { id }, headers: h }),
    auth.api.listUserSessions({ body: { userId: id }, headers: h }),
    auth.api.getSession({ headers: h }),
  ]);

  if (!user) notFound();

  const isSelf = currentSession?.user?.id === id;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">

      {/* Back */}
      <Link href="/users" className="text-sm text-blue-500 hover:underline">← Back to Users</Link>

      {/* Profile */}
      <div className="border rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          {user.image ? (
            <Image src={user.image} alt={user.name} className="w-16 h-16 rounded-full object-cover" width={40} height={40} unoptimized/>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-xl font-bold">
              {user.name?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            {isSelf && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">You</span>}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <Row label="ID" value={user.id} />
          <Row label="Role" value={user.role ?? "user"} />
          <Row label="Email Verified" value={user.emailVerified ? "✅ Yes" : "❌ No"} />
          <Row label="Status" value={user.banned ? "🚫 Banned" : "✅ Active"} />
          {user.banned && user.banReason && <Row label="Ban Reason" value={user.banReason} />}
          {user.banExpires && <Row label="Ban Expires" value={new Date(user.banExpires).toLocaleString()} />}
          <Row label="Created" value={new Date(user.createdAt).toLocaleString()} />
          <Row label="Updated" value={new Date(user.updatedAt).toLocaleString()} />
        </div>
      </div>

      {/* Ban / Unban */}
      <Section title="Ban Management">
        {user.banned ? (
          <form action={async () => { "use server"; await unbanUser(id); }}>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
              ✅ Unban User
            </button>
          </form>
        ) : (
          <form action={async (fd: FormData) => {
            "use server";
            const reason = fd.get("reason")?.toString();
            const days = fd.get("days")?.toString();
            const expiresIn = days ? parseInt(days) * 86400 : undefined;
            await banUser(id, reason, expiresIn);
          }} className="flex flex-wrap gap-2 items-center">
            <input name="reason" placeholder="Reason (optional)"
              className="border rounded px-3 py-2 text-sm flex-1 min-w-40" />
            <select name="days" className="border rounded px-3 py-2 text-sm bg-white dark:bg-neutral-900">
              <option value="">Permanent</option>
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
            </select>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
              🚫 Ban User
            </button>
          </form>
        )}
      </Section>

      {/* Role */}
      <Section title="Role">
        <form action={async (fd: FormData) => {
          "use server";
          const role = fd.get("role")?.toString() as "user" | "admin" | undefined;
          if (role) await setRole(id, role);
        }} className="flex gap-2 items-center">
          <select name="role" defaultValue={user.role ?? "user"}
            className="border rounded px-3 py-2 text-sm bg-white dark:bg-neutral-900">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
            Update Role
          </button>
        </form>
      </Section>

      {/* Password */}
      <Section title="Set Password">
        <form action={async (fd: FormData) => {
          "use server";
          const password = fd.get("password")?.toString();
          if (password) await setPassword(id, password);
        }} className="flex gap-2 items-center">
          <input name="password" type="password" placeholder="New password" required
            className="border rounded px-3 py-2 text-sm flex-1" />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
            Set Password
          </button>
        </form>
      </Section>

      {/* Sessions */}
      <Section title={`Active Sessions (${sessions?.sessions?.length ?? 0})`}>
        <form action={async () => {
          "use server";
          await revokeAllSessions(id);
        }}>
          <button
            disabled={isSelf}
            className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔐 Revoke All Sessions
          </button>
        </form>

        <div className="space-y-2">
          {sessions?.sessions?.length ? sessions.sessions.map((session) => (
            <div key={session.id} className="flex justify-between items-center text-sm border-b pb-2">
              <div>
                <p className="font-mono text-xs text-gray-400">{session.id}</p>
                <p className="text-xs text-gray-500">
                  Expires: {new Date(session.expiresAt).toLocaleString()}
                </p>
              </div>
              {session.token === currentSession?.session?.token ? (
                <span className="text-xs text-gray-400 italic">current</span>
              ) : (
                <form action={async () => {
                  "use server";
                  await revokeSession(session.token, id);
                }}>
                  <button className="text-xs text-red-500 hover:underline">Revoke</button>
                </form>
              )}
            </div>
          )) : (
            <p className="text-sm text-gray-400">No active sessions.</p>
          )}
        </div>
      </Section>

      {/* Danger Zone */}
      {!isSelf && (
        <Section title="Danger Zone">
          <form action={async () => {
            "use server";
            await removeUser(id);
            redirect("/users");
          }}>
            <button className="px-4 py-2 bg-red-700 text-white rounded-lg text-sm hover:bg-red-800">
              🗑️ Delete User Permanently
            </button>
          </form>
        </Section>
      )}

    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-sm space-y-3">
      <h2 className="font-semibold text-lg">{title}</h2>
      {children}
    </div>
  );
}