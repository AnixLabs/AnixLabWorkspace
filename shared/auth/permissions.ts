import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

// Extend default permissions
export const statement = {
  ...defaultStatements,

  // Custom resources
  project: ["create", "update", "delete", "view"],
  dashboard: ["view"],
  system: ["manage", "billing"], // optional (future use)
} as const;

export const ac = createAccessControl(statement);

// 👤 USER → basic access
export const user = ac.newRole({
  project: ["view"],
  dashboard: ["view"],
});

// 👑 OWNER → owns content (NO user management)
export const owner = ac.newRole({
  project: ["create", "update", "delete", "view"],
  dashboard: ["view"],
});

// 🛡️ ADMIN → manages users/system (NO business ownership)
export const admin = ac.newRole({
  ...adminAc.statements, // 🔥 gives full admin API access

  dashboard: ["view"],
});

// 🧹 MODERATOR → limited control
export const moderator = ac.newRole({
  user: ["ban"], // can ban users
  project: ["view"],
});

// 🚀 SUPERADMIN → EVERYTHING (optional but recommended)
export const superadmin = ac.newRole({
  ...adminAc.statements,
  project: ["create", "update", "delete", "view"],
  dashboard: ["view"],
  system: ["manage", "billing"],
});