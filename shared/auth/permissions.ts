import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  dashboard: ["view", "refetch"],
} as const;

export const ac = createAccessControl(statement);

const user = ac.newRole({
  dashboard: [],
});

const moderator = ac.newRole({
  user: ["ban"],
  dashboard: ["view"],
});

const admin = ac.newRole({
  ...adminAc.statements,
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update",
  ],
  dashboard: ["view", "refetch"],
});

const superadmin = ac.newRole({
  ...adminAc.statements,
  dashboard: ["view", "refetch"],
});

export const roles = {
  user,
  admin,
  moderator,
  superadmin,
} as const;
