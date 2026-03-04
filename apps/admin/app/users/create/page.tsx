import { auth } from "@shared/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function createUser(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const role = formData.get("role")?.toString() as "user" | "admin" | undefined;

  if (!name || !email || !password || !role) return;

  const result = await auth.api.createUser({
    body: { name, email, password, role },
    headers: await headers(),
  });

  redirect(`/users/${result.user.id}`);
}

export default function CreateUserPage() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create User</h1>
        <p className="text-sm text-gray-500">Manually create a new user account</p>
      </div>

      <form
        action={createUser}
        className="border rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-sm space-y-4"
      >
        <Field label="Full Name" name="name" type="text" placeholder="John Doe" />
        <Field label="Email" name="email" type="email" placeholder="john@example.com" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Role</label>
          <select
            name="role"
            className="border rounded px-3 py-2 text-sm bg-white dark:bg-neutral-900"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
          >
            Create User
          </button>
          <Link
            href="/users"
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="border rounded px-3 py-2 text-sm bg-white dark:bg-neutral-900"
      />
    </div>
  );
}
