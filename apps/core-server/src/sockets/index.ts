import type { Server } from "socket.io";

// when registering a namespace, remove the _ prefix from _io parameter and use io instead
export function registerSockets(_io: Server) {
  // Register namespaces here
  // registerGameNamespace(io);
}
