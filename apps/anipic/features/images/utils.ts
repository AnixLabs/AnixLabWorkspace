import type { CursorPayload } from "./types";

export function encodeCursor(data: CursorPayload) {
  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

export function decodeCursor(cursor?: string | null) {
  if (!cursor) return null;

  try {
    return JSON.parse(Buffer.from(cursor, "base64url").toString()) as CursorPayload;
  } catch {
    return null;
  }
}