// lib/mongodb.ts
import { MongoClient } from "mongodb";

const NODE_ENV = process.env.NODE_ENV;

// Extend NodeJS global type to avoid TS errors in development
declare global {
  var _mongoClient: MongoClient | undefined;
}

let mongoClient: MongoClient | undefined;

export function getMongoClient(uri: string) {

  // In development, reuse global instance to prevent multiple connections on HMR
  if (NODE_ENV === "development") {
    global._mongoClient ??= new MongoClient(uri);
    return global._mongoClient;
  }

  mongoClient ??= new MongoClient(uri);

  return mongoClient;
}
