import mongoose from "mongoose";

const uri = process.env.MONGODB_URI_SHORTURLS;

const cached = global._shortUrlDb ?? { conn: null, promise: null };

export default async function connectToShortUrlDb() {
  if (!uri) throw new Error("❌ MONGODB_URI_SHORTURLS not found");
  
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.info("🔄 Connecting to ShortUrl DB...");
    cached.promise = mongoose
      .createConnection(uri, {
        dbName: "ShortUrlsDB",
        bufferCommands: false,
      })
      .asPromise()
      .then((conn) => {
        console.info("✅ Connected to ShortUrl DB");
        return conn;
      });
  }

  cached.conn = await cached.promise;
  global._shortUrlDb = cached;
  return cached.conn;
}
