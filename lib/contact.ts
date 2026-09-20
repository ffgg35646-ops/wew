import clientPromise from "@/lib/mongodb"
import type { Document } from "mongodb"

export type ContactSettings = {
  whatsapp: string
  phone: string
  location: string
  locationEmbed: string
}

const DEFAULT_CONTACT: ContactSettings = {
  whatsapp: "",
  phone: "",
  location: "",
  locationEmbed: "",
}

export function buildMapEmbedUrl(location: string): string {
  const value = location.trim()

  if (!value) return ""

  try {
    const url = new URL(value)

    // إذا كان بالفعل رابط Embed، نستخدمه كما هو.
    if (
      url.hostname.includes("google.com") &&
      url.pathname.includes("/maps/embed")
    ) {
      return value
    }

    // Google Maps: ?ll=LAT,LNG
    const ll = url.searchParams.get("ll")

    if (ll) {
      const match = ll.match(
        /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/
      )

      if (match) {
        const lat = match[1]
        const lng = match[2]
        const zoom = url.searchParams.get("z") || "15"

        return (
          `https://www.google.com/maps?q=${encodeURIComponent(
            `${lat},${lng}`
          )}&z=${encodeURIComponent(zoom)}&output=embed`
        )
      }
    }

    // Google Maps: /@LAT,LNG,ZOOMz
    const atMatch = url.pathname.match(
      /\/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+(?:\.\d+)?)z/
    )

    if (atMatch) {
      const lat = atMatch[1]
      const lng = atMatch[2]
      const zoom = atMatch[3]

      return (
        `https://www.google.com/maps?q=${encodeURIComponent(
          `${lat},${lng}`
        )}&z=${encodeURIComponent(zoom)}&output=embed`
      )
    }

    // Google Maps: ?q=LAT,LNG
    const q = url.searchParams.get("q")

    if (q) {
      const match = q.match(
        /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/
      )

      if (match) {
        const lat = match[1]
        const lng = match[2]
        const zoom = url.searchParams.get("z") || "15"

        return (
          `https://www.google.com/maps?q=${encodeURIComponent(
            `${lat},${lng}`
          )}&z=${encodeURIComponent(zoom)}&output=embed`
        )
      }
    }
  } catch {}

  return ""
}

export async function getContactSettings(): Promise<ContactSettings> {
  const client = await clientPromise
  const db = client.db("maidora")

  const doc = await db
    .collection<Document & { _id: string }>("settings")
    .findOne({
      _id: "contact",
    })

  if (!doc) return DEFAULT_CONTACT

  const location =
    typeof doc.location === "string"
      ? doc.location
      : ""

  const savedEmbed =
    typeof doc.locationEmbed === "string"
      ? doc.locationEmbed
      : ""

  return {
    whatsapp:
      typeof doc.whatsapp === "string"
        ? doc.whatsapp
        : "",

    phone:
      typeof doc.phone === "string"
        ? doc.phone
        : "",

    location,

    locationEmbed:
      savedEmbed || buildMapEmbedUrl(location),
  }
}
