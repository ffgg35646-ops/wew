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

function extractCoordinates(urlString: string) {
  try {
    const url = new URL(urlString)
    const zoom = url.searchParams.get("z") || "15"

    // ?ll=LAT,LNG
    const ll = url.searchParams.get("ll")

    if (ll) {
      const match = ll.match(
        /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/
      )

      if (match) {
        return {
          lat: match[1],
          lng: match[2],
          zoom,
        }
      }
    }

    // ?q=LAT,LNG
    for (const key of [
      "q",
      "query",
      "destination",
      "center",
    ]) {
      const value = url.searchParams.get(key)

      if (!value) continue

      const match = value.match(
        /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/
      )

      if (match) {
        return {
          lat: match[1],
          lng: match[2],
          zoom,
        }
      }
    }

    // /@LAT,LNG,ZOOMz
    const atMatch = urlString.match(
      /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+(?:\.\d+)?)z/i
    )

    if (atMatch) {
      return {
        lat: atMatch[1],
        lng: atMatch[2],
        zoom: atMatch[3],
      }
    }

    // !3dLAT!4dLNG
    const placeMatch = urlString.match(
      /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/i
    )

    if (placeMatch) {
      return {
        lat: placeMatch[1],
        lng: placeMatch[2],
        zoom,
      }
    }
  } catch {}

  return null
}

export async function buildMapEmbedUrl(
  location: string
): Promise<string> {
  const value = location.trim()

  if (!value) return ""

  try {
    const direct = new URL(value)

    // Embed جاهز
    if (
      direct.hostname.includes("google.com") &&
      direct.pathname.includes("/maps/embed")
    ) {
      return value
    }

    // Google Maps short link
    if (
      direct.hostname === "maps.app.goo.gl" ||
      direct.hostname.endsWith(".goo.gl")
    ) {
      const response = await fetch(value, {
        method: "GET",
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        cache: "no-store",
      })

      if (response.url) {
        const coordinates = extractCoordinates(response.url)

        if (coordinates) {
          return (
            `https://www.google.com/maps?q=${encodeURIComponent(
              `${coordinates.lat},${coordinates.lng}`
            )}` +
            `&z=${encodeURIComponent(coordinates.zoom)}` +
            `&output=embed`
          )
        }
      }

      return ""
    }

    const coordinates = extractCoordinates(value)

    if (!coordinates) {
      return ""
    }

    return (
      `https://www.google.com/maps?q=${encodeURIComponent(
        `${coordinates.lat},${coordinates.lng}`
      )}` +
      `&z=${encodeURIComponent(coordinates.zoom)}` +
      `&output=embed`
    )
  } catch {
    return ""
  }
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
      savedEmbed ||
      (await buildMapEmbedUrl(location)),
  }
}
