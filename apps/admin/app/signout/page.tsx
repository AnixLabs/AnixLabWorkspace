import { auth } from "@shared/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignOutPage() {
  async function handleSignOut() {
    "use server";
    await auth.api.signOut({ headers: await headers() });
    redirect("/signin");
  }

  return (
    <div className="p-6 max-w-sm mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-2">Sign Out</h1>
      <p className="text-gray-500 text-sm mb-6">Are you sure you want to sign out?</p>
      <form action={handleSignOut} className="flex gap-2 justify-center">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
          Yes, Sign Out
        </button>
        <Link href="/" className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
          Cancel
        </Link>
      </form>
    </div>
  );
}