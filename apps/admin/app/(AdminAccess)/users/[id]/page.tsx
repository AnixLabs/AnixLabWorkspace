import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  banUser,
  unbanUser,
  setRole,
  revokeAllSessions,
  revokeSession,
  removeUser,
  setPassword,
} from "./actions";
import Link from "next/link";
import Image from "next/image";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { Button } from "@shared/components/ui/Button";
import { Input, Select } from "@shared/components/ui/Input";

interface PageProps {
  params: Promise<{ id: string }>;
}

type Role = "user" | "admin" | "superadmin";

function getRoleWeight(role?: string | null): number {
  if (role === "superadmin") return 2;
  if (role === "admin") return 1;
  return 0;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const h = await headers();

  const [user, sessions, currentSession] = await Promise.all([
    auth.api.getUser({ query: { id }, headers: h }),
    auth.api.listUserSessions({ body: { userId: id }, headers: h }),
    auth.api.getSession({ headers: h }),
  ]);

  // Must be logged in
  if (!currentSession?.user) redirect("/login");

  const viewer = currentSession.user;
  const viewerRole = (viewer.role ?? "user") as Role;
  const viewerWeight = getRoleWeight(viewerRole);

  // Only admins and superadmins can access this page
  if (viewerWeight < 1) redirect("/");

  if (!user) notFound();

  const isSelf = viewer.id === id;
  const targetRole = (user.role ?? "user") as Role;
  const targetWeight = getRoleWeight(targetRole);

  // Superadmin = full root access over everyone.
  // Admin = full access over users (weight 0) only; cannot act on peers or above.
  // Self-targeting is blocked for all sensitive ops regardless of role.
  const isSuperadmin = viewerRole === "superadmin";
  const viewerOutranksTarget = viewerWeight > targetWeight;

  const canBan = !isSelf && (isSuperadmin || viewerOutranksTarget);
  const canChangeRole = !isSelf && (isSuperadmin || viewerOutranksTarget);
  const canDelete = !isSelf && (isSuperadmin || viewerOutranksTarget);
  const canRevokeAll = !isSelf && (isSuperadmin || viewerOutranksTarget);
  // const canSetPassword = true; // non-destructive; always allowed

  const banLockReason = isSelf
    ? "You cannot ban your own account."
    : `You cannot ban a ${targetRole}.`;
  const roleLockReason = isSelf
    ? "You cannot change your own role."
    : `You cannot change the role of a ${targetRole}.`;
  const deleteLockReason = isSelf
    ? "You cannot delete your own account."
    : `You cannot delete a ${targetRole}.`;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/users" className="text-sm text-blue-500 hover:underline">
        ← Back to Users
      </Link>

      {/* Profile */}
      <Panel className="mt-6">
        <div className="flex items-center gap-4 mb-6">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
              width={64}
              height={64}
              unoptimized
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-xl font-bold">
              {user.name?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex gap-1.5 mt-1 flex-wrap">
              {isSelf && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  You
                </span>
              )}
              {targetRole === "superadmin" && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                  Superadmin
                </span>
              )}
              {targetRole === "admin" && (
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <Row label="ID" value={user.id} />
          <Row label="Role" value={user.role ?? "user"} />
          <Row label="Email Verified" value={user.emailVerified ? "✅ Yes" : "❌ No"} />
          <Row label="Status" value={user.banned ? "🚫 Banned" : "✅ Active"} />
          {user.banned && user.banReason && <Row label="Ban Reason" value={user.banReason} />}
          {user.banExpires && (
            <Row label="Ban Expires" value={new Date(user.banExpires).toLocaleString()} />
          )}
          <Row label="Created" value={new Date(user.createdAt).toLocaleString()} />
          <Row label="Updated" value={new Date(user.updatedAt).toLocaleString()} />
        </div>
      </Panel>

      {/* Ban / Unban */}
      {canBan ? (
        <Panel className="mt-6">
          <PanelHeader>Ban Management</PanelHeader>
          {user.banned ? (
            <form
              action={async () => {
                "use server";
                await unbanUser(id);
              }}
            >
              <Button className="bg-green-500 hover:shadow-green-900">✅ Unban User</Button>
            </form>
          ) : (
            <form
              action={async (fd: FormData) => {
                "use server";
                const reason = fd.get("reason");
                const days = fd.get("days");
                const parsed = typeof days === "string" ? parseInt(days, 10) : NaN;
                const expiresIn = !isNaN(parsed) ? parsed * 86400 : undefined;
                await banUser(id, typeof reason === "string" ? reason : undefined, expiresIn);
              }}
            >
              <Input name="reason" placeholder="Reason (optional)" />
              <Select
                name="days"
                options={[
                  { label: "Permanent", value: "" },
                  { label: "1 day", value: "1" },
                  { label: "3 days", value: "3" },
                  { label: "7 days", value: "7" },
                  { label: "30 days", value: "30" },
                ]}
              />
              <Button className="bg-rose-600 hover:shadow-rose-900">🚫 Ban User</Button>
            </form>
          )}
        </Panel>
      ) : (
        <LockedSection title="Ban Management" reason={banLockReason} />
      )}

      {/* Role */}
      {canChangeRole ? (
        <Panel>
          <PanelHeader>Role</PanelHeader>
          <form
            action={async (fd: FormData) => {
              "use server";
              const role = fd.get("role");
              if (
                typeof role === "string" &&
                (role === "user" || role === "admin" || role === "superadmin")
              ) {
                await setRole(id, role as Role);
              }
            }}
            className="flex gap-2 items-center"
          >
            <Select
              name="role"
              defaultValue={user.role ?? "user"}
              options={[
                { label: "User", value: "user" },
                { label: "Admin", value: "admin" },
                // Superadmin option is conditionally rendered below
                ...(viewerRole === "superadmin"
                  ? [{ label: "Superadmin", value: "superadmin" }]
                  : []),
              ]}
            />
            <Button>Update Role</Button>
          </form>
        </Panel>
      ) : (
        <LockedSection title="Role" reason={roleLockReason} />
      )}

      {/* Password */}
      <Panel>
        <PanelHeader>Set Password</PanelHeader>
        <form
          action={async (fd: FormData) => {
            "use server";
            const password = fd.get("password");
            if (typeof password === "string" && password) await setPassword(id, password);
          }}
          className="flex gap-2 items-center"
        >
          <Input name="password" type="password" placeholder="New password" required />
          <Button>Set Password</Button>
        </form>
      </Panel>

      {/* Sessions */}
      <Panel>
        <PanelHeader>Active Sessions ({sessions?.sessions?.length ?? 0})</PanelHeader>
        {canRevokeAll ? (
          <form
            action={async () => {
              "use server";
              await revokeAllSessions(id);
            }}
          >
            <Button className="bg-yellow-500 hover:shadow-yellow-800">
              🔐 Revoke All Sessions
            </Button>
          </form>
        ) : (
          <p className="text-xs text-gray-400 mb-4 italic">
            You cannot revoke all sessions on your own account.
          </p>
        )}

        <div className="space-y-2 mt-6">
          {sessions?.sessions?.length ? (
            sessions.sessions.map((session) => {
              const isCurrentSession = session.token === currentSession?.session?.token;
              return (
                <div
                  key={session.id}
                  className="flex justify-between items-center text-sm border-b pb-2"
                >
                  <div>
                    <p className="font-mono text-xs text-gray-400">{session.id}</p>
                    <p className="text-xs text-gray-500">
                      Expires: {new Date(session.expiresAt).toLocaleString()}
                    </p>
                  </div>
                  {isCurrentSession ? (
                    <span className="text-xs text-gray-400 italic">current</span>
                  ) : (
                    <form
                      action={async () => {
                        "use server";
                        await revokeSession(session.token, id);
                      }}
                    >
                      <button className="text-xs text-red-500 hover:underline">Revoke</button>
                    </form>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-400">No active sessions.</p>
          )}
        </div>
      </Panel>

      {/* Danger Zone */}
      {canDelete ? (
        <Panel>
          <PanelHeader>Danger Zone</PanelHeader>
          <form
            action={async () => {
              "use server";
              await removeUser(id);
              redirect("/users");
            }}
          >
            <Button className="bg-rose-600 hover:shadow-rose-900 ">
              🗑️ Delete User Permanently
            </Button>
          </form>
        </Panel>
      ) : (
        <LockedSection title="Danger Zone" reason={deleteLockReason} />
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

function LockedSection({ title, reason }: { title: string; reason: string }) {
  return (
    <div className="border rounded-xl p-6 bg-gray-50 dark:bg-neutral-800 shadow-sm space-y-2 opacity-60">
      <h2 className="font-semibold text-lg text-gray-400">{title}</h2>
      <p className="text-xs text-gray-400 flex items-center gap-1.5">
        <span>🔒</span>
        <span>{reason}</span>
      </p>
    </div>
  );
}
