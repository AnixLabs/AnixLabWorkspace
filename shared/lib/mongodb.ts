// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Add MONGODB_URI to your .env.local file.");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend NodeJS global type to avoid TS errors
declare global {
   
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Use cached connection in dev mode (so hot reloads don't create new clients)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Always create new client in production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export { client };
export default clientPromise;
