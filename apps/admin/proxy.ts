import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@shared/auth";

// routes that never require auth
const PUBLIC_PATHS = new Set(["/", "/favicon.ico", "/robots.txt"]);

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith("/sitemap")) return true;
  if (pathname.startsWith("/_next")) return true;
  return false;
}

export default async function proxy(req: NextRequest) {
  const { nextUrl, method } = req;

  if (isPublicPath(nextUrl.pathname)) return NextResponse.next();

  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user) {
    if (nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // redirect to / with ?next= so they land back after auth
    const signIn = new URL("/", nextUrl.origin);
    signIn.searchParams.set("next", nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(signIn);
  }

  // Permission check
  const { success: hasAccess } = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: { user: ["list"] },
    },
  });

  if (!hasAccess) {
    // API routes → 403 JSON
    if (nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    // Non-GET page mutations (form posts, etc.) → 403 JSON
    if (method !== "GET") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const url = nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("next", nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all static assets — only run on real routes
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap\\.xml|.*\\.(?:png|jpe?g|svg|webp|ico|css|js|txt|woff2?)).*)",
  ],
};
