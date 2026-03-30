import type { Socket } from "socket.io";
import { auth } from "@shared/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { AuthSessionServer } from "@shared/auth/types";

interface SocketData {
  userId: string;
  user: AuthSessionServer["user"];
}

export async function socketAuthMiddleware(
  socket: Socket<never, never, never, SocketData>,
  next: (err?: Error) => void,
) {
  try {
    const cookie = socket.handshake.headers.cookie;
    const authHeader = socket.handshake.auth.token
      ? `Bearer ${socket.handshake.auth.token}`
      : undefined;

    const result = await auth.api.getSession({
      headers: fromNodeHeaders({
        cookie: cookie ?? "",
        ...(authHeader ? { authorization: authHeader } : {}),
      }),
    });

    if (!result?.user) {
      return next(new Error("UNAUTHORIZED"));
    }

    socket.data.userId = result.user.id;
    socket.data.user = result.user;
    next();
  } catch {
    next(new Error("AUTH_ERROR"));
  }
}
