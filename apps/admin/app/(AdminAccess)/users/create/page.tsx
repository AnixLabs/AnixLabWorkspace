import { Panel } from "@/components/ui/Panel";
import { auth } from "@shared/auth";
import { Button } from "@shared/components/ui/Button";
import { Input, Select } from "@shared/components/ui/Input";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function createUser(formData: FormData) {
  "use server";
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  if (
    typeof name !== "string" ||
    !name ||
    typeof email !== "string" ||
    !email ||
    typeof password !== "string" ||
    !password ||
    (role !== "user" && role !== "admin")
  )
    return;

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
      <Panel>
        <form action={createUser}>
          <Input label="Full Name" name="name" type="text" placeholder="John Doe" />
          <Input label="Email" name="email" type="email" placeholder="john@example.com" />
          <Input label="Password" name="password" type="password" placeholder="••••••••" />
          <div className="flex flex-col gap-1">
            <Select
              name="role"
              label="Role"
              options={[
                { label: "User", value: "user" },
                { label: "Admin", value: "admin" },
              ]}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit">Create User</Button>
            <Button href="/users" className="bg-transparent border border-theme-500">
              Cancel
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}
