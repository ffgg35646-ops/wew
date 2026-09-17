import clientPromise from "@/lib/mongodb"
import type { Document } from "mongodb"

export type ContactSettings = {
  whatsapp: string
  phone: string
  location: string
}

const DEFAULT_CONTACT: ContactSettings = {
  whatsapp: "",
  phone: "",
  location: "",
}

export async function getContactSettings(): Promise<ContactSettings> {
  const client = await clientPromise
  const db = client.db("maidora")

  const doc = await db.collection<Document & { _id: string }>("settings").findOne({
    _id: "contact",
  })

  if (!doc) return DEFAULT_CONTACT

  return {
    whatsapp: typeof doc.whatsapp === "string" ? doc.whatsapp : "",
    phone: typeof doc.phone === "string" ? doc.phone : "",
    location: typeof doc.location === "string" ? doc.location : "",
  }
}
