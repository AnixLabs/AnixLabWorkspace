import { auth } from "@shared/auth";
import { headers as nextHeaders } from "next/headers";
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
import type { Role } from "@shared/auth/types";
import { Pill } from "@/components/ui/Pill";
import { getRoleWeight } from "@shared/auth/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const headers = await nextHeaders();

  const [user, sessions, currentSession] = await Promise.all([
    auth.api.getUser({ query: { id }, headers }),
    auth.api.listUserSessions({ body: { userId: id }, headers }),
    auth.api.getSession({ headers }),
  ]);

  if (!currentSession?.user) redirect("/");

  const viewer = currentSession.user;
  const isSelf = viewer.id === id;
  const isSuperadmin = viewer.role === "superadmin";

  // Gate page access
  const canAccessPage = await auth.api.userHasPermission({
    body: { userId: viewer.id, permissions: { user: ["list"] } },
  });
  if (!canAccessPage?.success) redirect("/");

  if (!user) notFound();

  const targetRole = user.role ?? "user";
  const viewerWeight = getRoleWeight(viewer.role);
  const targetWeight = getRoleWeight(targetRole);

  // Superadmin outranks everyone; everyone else must strictly outrank the target
  const outranksTarget = isSuperadmin || viewerWeight > targetWeight;

  // Resolve all permissions in parallel
  const [permBan, permRole, permDelete, permSessions, permPassword] = await Promise.all([
    auth.api.userHasPermission({ body: { userId: viewer.id, permissions: { user: ["ban"] } } }),
    auth.api.userHasPermission({
      body: { userId: viewer.id, permissions: { user: ["set-role"] } },
    }),
    auth.api.userHasPermission({ body: { userId: viewer.id, permissions: { user: ["delete"] } } }),
    auth.api.userHasPermission({
      body: { userId: viewer.id, permissions: { session: ["revoke"] } },
    }),
    auth.api.userHasPermission({
      body: { userId: viewer.id, permissions: { user: ["set-password"] } },
    }),
  ]);

  const canBan = !isSelf && outranksTarget && !!permBan?.success;
  const canChangeRole = !isSelf && outranksTarget && !!permRole?.success;
  const canDelete = !isSelf && outranksTarget && !!permDelete?.success;
  const canRevokeAll = !isSelf && outranksTarget && !!permSessions?.success;
  const canSetPassword = (isSelf || outranksTarget) && !!permPassword?.success;

  // Produce a specific lock reason for the UI
  function getLockReason(action: string): string {
    if (isSelf) return `You cannot ${action} your own account.`;
    if (!outranksTarget) return `You cannot ${action} a ${targetRole} — equal or higher role.`;
    return `You don't have permission to ${action} this user.`;
  }

  // For the role selector: only show roles strictly below the viewer's weight (superadmin sees all)
  const assignableRoles: { label: string; value: string }[] = (
    [
      { label: "User", value: "user" },
      { label: "Moderator", value: "moderator" },
      { label: "Admin", value: "admin" },
      { label: "Superadmin", value: "superadmin" },
    ] as { label: string; value: Role }[]
  ).filter(({ value }) => (isSuperadmin ? true : getRoleWeight(value) < viewerWeight));

  return (
    <div className="space-y-6">
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
              className="shrink-0 w-16 h-16 rounded-full object-cover"
              width={64}
              height={64}
              unoptimized
            />
          ) : (
            <div className="shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-xl font-bold">
              {user.name?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold break-all">{user.name}</h1>
            <p className="text-sm text-gray-500 break-all">{user.email}</p>
            <div className="flex gap-1.5 mt-1 flex-wrap">
              {/* Self */}
              {isSelf && <Pill status="default">You</Pill>}

              {/* Role */}
              <Pill status={user.role === "user" ? "default" : "warning"}>
                {user.role ?? "user"}
              </Pill>

              {/* Verified */}
              {user.emailVerified && <Pill status="success">Verified</Pill>}

              {/* Ban Status */}
              {user.banned && <Pill status="error">Banned</Pill>}
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
      <Panel className="mt-6">
        <PanelHeader>Ban Management</PanelHeader>
        {canBan ? (
          user.banned ? (
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
              <Input
                name="reason"
                placeholder="Reason (optional)"
                defaultValue={user.banReason ?? "Violation of terms of service"}
              />
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
          )
        ) : (
          <LockedSection reason={getLockReason("ban")} />
        )}
      </Panel>

      {/* Role */}
      <Panel>
        <PanelHeader>Role</PanelHeader>
        {canChangeRole ? (
          <form
            action={async (fd: FormData) => {
              "use server";
              const role = fd.get("role") as Role | null;
              if (role) await setRole(id, role);
            }}
            className="flex gap-2 items-center"
          >
            <Select name="role" defaultValue={user.role ?? "user"} options={assignableRoles} />
            <Button>Update Role</Button>
          </form>
        ) : (
          <LockedSection reason={getLockReason("change the role of")} />
        )}
      </Panel>

      {/* Password */}
      <Panel>
        <PanelHeader>Set Password</PanelHeader>
        {canSetPassword ? (
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
        ) : (
          <LockedSection reason="You don't have permission to set passwords." />
        )}
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
          <LockedSection
            reason={
              isSelf
                ? "You cannot revoke all sessions on your own account."
                : !outranksTarget
                  ? `You cannot revoke sessions of a ${targetRole} — equal or higher role.`
                  : "You don't have permission to revoke sessions."
            }
          />
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
                  ) : canRevokeAll ? (
                    <form
                      action={async () => {
                        "use server";
                        await revokeSession(session.token, id);
                      }}
                    >
                      <button className="text-xs text-red-500 hover:underline">Revoke</button>
                    </form>
                  ) : (
                    <span className="text-xs text-gray-400 italic">locked</span>
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
      <Panel>
        <PanelHeader>Danger Zone</PanelHeader>
        {canDelete ? (
          <form
            action={async () => {
              "use server";
              await removeUser(id);
              redirect("/users");
            }}
          >
            <Button className="bg-rose-600 hover:shadow-rose-900">
              🗑️ Delete User Permanently
            </Button>
          </form>
        ) : (
          <LockedSection reason={getLockReason("delete")} />
        )}
      </Panel>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 border-b pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium break-all">{value}</span>
    </div>
  );
}

function LockedSection({ reason }: { reason: string }) {
  return <p className="text-xs text-gray-400 italic">🔒 {reason}</p>;
}
