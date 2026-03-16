import { type Connection } from "mongoose";

interface CachedConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Extend the NodeJS global object to include
declare global {
  var _imageUploadDb: CachedConnection | undefined;
  var _shortUrlDb: CachedConnection | undefined;
}
