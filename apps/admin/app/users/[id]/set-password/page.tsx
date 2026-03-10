import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SetPasswordPage({ params }: PageProps) {
  const { id } = await params;

  async function handleSetPassword(formData: FormData) {
    "use server";
    const password = formData.get("password");
    if (typeof password !== "string" || !password) return;
    await auth.api.setUserPassword({
      body: { userId: id, newPassword: password },
      headers: await headers(),
    });
    redirect(`/users/${id}`);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Set Password</h1>
      <form
        action={handleSetPassword}
        className="border rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-sm space-y-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">New Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="border rounded px-3 py-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
          >
            Set Password
          </button>
          <a href={`/users/${id}`} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
