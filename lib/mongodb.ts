import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("MONGODB_URI is missing from .env.local")
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const client = new MongoClient(uri)

const clientPromise =
  global._mongoClientPromise ?? client.connect()

if (process.env.NODE_ENV !== "production") {
  global._mongoClientPromise = clientPromise
}

export default clientPromise
