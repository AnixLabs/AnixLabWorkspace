import { Panel, PanelHeader } from "@/components/ui/Panel";
import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateUserForm } from "./CreateUserForm";
import { getRoleWeight } from "@shared/auth/utils";
import { roleEnum } from "./_schema";

export default async function CreateUserPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/");

  const { success: hasPermission } = await auth.api.userHasPermission({
    body: { userId: session.user.id, permissions: { user: ["create"] } },
  });
  if (!hasPermission) redirect("/users");

  const isSuperadmin = session.user.role === "superadmin";
  const viewerWeight = getRoleWeight(session.user.role);

  const assignableRoles = isSuperadmin
    ? roleEnum
    : roleEnum.filter((r) => getRoleWeight(r) < viewerWeight);

  return (
    <div>
      <Panel>
        <PanelHeader>Create User</PanelHeader>
        <CreateUserForm assignableRoles={assignableRoles} />
      </Panel>
    </div>
  );
}
