import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@shared/auth";

const PUBLIC_FILE = /\.(.*)$/;

function hasRole(userRole: string | undefined | null, allowed: string[]) {
  if (!userRole) return false;

  const roles = userRole.split(",").map((r) => r.trim());
  return roles.some((r) => allowed.includes(r));
}

export async function proxy(req: NextRequest) {
  const { nextUrl, method } = req;

  // Skip static files & internals
  if (
    PUBLIC_FILE.test(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname === "/favicon.ico" ||
    nextUrl.pathname === "/robots.txt" ||
    nextUrl.pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user?.role;

  // Define allowed roles for admin panel
  const isAdmin = hasRole(role, ["admin", "owner", "superadmin"]);

  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isPage = !isApiRoute;

  // Unauthorized logic
  if (!isAdmin) {
    // API or non-GET page → block
    if (isApiRoute || (isPage && method !== "GET")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Page request → redirect to unauthorized page
    if (nextUrl.pathname !== "/unauthorized") {
      const unauthorizedUrl = new URL("/unauthorized", nextUrl.origin);
      unauthorizedUrl.searchParams.set("next", nextUrl.pathname + nextUrl.search);

      return NextResponse.rewrite(unauthorizedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|txt|woff2?)|api/auth).*)",
  ],
};
