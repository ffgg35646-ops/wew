import clientPromise from "@/lib/mongodb"
import type { Document } from "mongodb"

export type ContactSettings = {
  whatsapp: string
  phone: string
}

const DEFAULT_CONTACT: ContactSettings = {
  whatsapp: "",
  phone: "",
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
  }
}
