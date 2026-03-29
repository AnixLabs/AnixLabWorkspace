import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogInForm from "@shared/auth/LogInForm";
import { Panel } from "@/components/ui/Panel";
import { Logo } from "@/components/logo";
import SocialLogin from "@shared/auth/SocialLogin";
import type { AuthSessionServer } from "@shared/auth/types";

export default async function LandingPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  // Signed in
  if (session?.user) {
    const { success } = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { dashboard: ["view"] },
      },
    });

    if (success) redirect("/dashboard");

    // Signed in but no access
    return <NoAccessView user={session.user} />;
  }

  // Not signed in
  return <SignInView />;
}

// Sign-in view
function SignInView() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
      <Logo className="w-full fixed top-0" />
      <div className="relative z-10 w-full max-w-md">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-500 mt-1.5">Sign in to access the admin panel</p>
        </div>

        <Panel className="p-6">
          <LogInForm />

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/12" />
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/12" />
          </div>

          <SocialLogin />
        </Panel>

        <p className="text-center text-xs text-zinc-700 mt-6">
          Restricted access · Admin personnel only
        </p>
      </div>
    </div>
  );
}

// No-access view
function NoAccessView({ user }: { user: AuthSessionServer["user"] }) {
  const initial = user.name?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
      <Logo className="w-full fixed top-0" />
      <div className="relative z-10 w-full max-w-md">
        <Panel className="p-6">
          {/* User identity */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/6">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full ring-1 ring-white/10"
                unoptimized
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500/20 to-violet-500/20 ring-1 ring-white/10 flex items-center justify-center text-sm font-bold text-indigo-400">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-100 truncate">{user.name}</p>
              <p className="text-xs text-zinc-500 truncate">{user.email}</p>
            </div>
            <span className="ml-auto shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 ring-1 ring-white/6">
              {user.role ?? "user"}
            </span>
          </div>

          {/* Access denied */}
          <div className="flex flex-col items-center text-center gap-3 py-2">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl">
              🔒
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-100 mb-1">Access Restricted</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Your account doesn&apos;t have permission to access the admin panel. Contact a
                superadmin to request access.
              </p>
            </div>
          </div>
        </Panel>

        {/* Sign out */}
        {
          <form
            action={async () => {
              "use server";
              await auth.api.signOut({
                headers: await headers(),
              });
            }}
            className="w-full mt-4"
          >
            <button
              type="submit"
              className="flex items-center justify-center w-full py-2.5 rounded-xl border border-white/6 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer "
            >
              Sign out
            </button>
          </form>
        }
      </div>
    </div>
  );
}
