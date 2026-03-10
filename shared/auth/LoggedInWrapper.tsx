// components/LoggedInWrapper.js
"use client";

import { useSession } from "@shared/auth/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function IfLoggedIn({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) return null; // optional: show nothing during loading
  if (!session) return null;

  return <>{children}</>;
}

export function IfLoggedOut({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) return null;
  if (session) return null;

  return <>{children}</>;
}

export function RedirectIfLoggedOut({
  children,
  url = "/",
}: React.PropsWithChildren<{ url?: string }>) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      void router.push(url);
    }
  }, [isPending, session, router, url]);

  if (isPending || !session) return null;

  return <>{children}</>;
}
