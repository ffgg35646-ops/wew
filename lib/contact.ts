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

type Coordinates = {
  lat: string
  lng: string
  zoom: string
}

function toNumberString(value: string) {
  return value.trim()
}

function extractCoordinatesFromString(
  value: string,
  fallbackZoom = "15"
): Coordinates | null {
  if (!value) return null

  // /@LAT,LNG,ZOOMz
  const atMatch = value.match(
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
  const placeMatch = value.match(
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/i
  )

  if (placeMatch) {
    return {
      lat: placeMatch[1],
      lng: placeMatch[2],
      zoom: fallbackZoom,
    }
  }

  // q=LAT,LNG / ll=LAT,LNG / query=LAT,LNG
  for (const key of [
    "q",
    "ll",
    "query",
    "destination",
    "center",
  ]) {
    const pattern = new RegExp(
      "[?&]" +
        key +
        "=(-?\\d+(?:\\.\\d+)?),(-?\\d+(?:\\.\\d+)?)",
      "i"
    )

    const match = value.match(pattern)

    if (match) {
      return {
        lat: match[1],
        lng: match[2],
        zoom: fallbackZoom,
      }
    }
  }

  return null
}

function extractCoordinatesFromUrl(
  urlString: string
): Coordinates | null {
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

    return extractCoordinatesFromString(urlString, zoom)
  } catch {
    return null
  }
}

function normalizeTextUrl(value: string) {
  return value
    .replace(/\\u0026/gi, "&")
    .replace(/\\u003d/gi, "=")
    .replace(/\\\//g, "/")
    .replace(/&amp;/gi, "&")
    .replace(/&#x26;/gi, "&")
}

async function resolveShortGoogleMapsUrl(
  value: string
): Promise<Coordinates | null> {
  try {
    const parsed = new URL(value)

    if (
      parsed.hostname !== "maps.app.goo.gl" &&
      parsed.hostname !== "goo.gl"
    ) {
      return null
    }

    const response = await fetch(value, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
    })

    // First try the final redirected URL.
    if (response.url) {
      const direct = extractCoordinatesFromUrl(response.url)

      if (direct) {
        return direct
      }
    }

    // Google Maps may return an HTML page whose canonical/OG URL
    // contains the final coordinates even when fetch() does not expose
    // the full location as response.url.
    const html = await response.text()

    const normalized = normalizeTextUrl(html)

    const candidates = new Set<string>()

    const attributeRegex =
      /(?:href|content)=["'](https?:\/\/[^"'<>\s]+)["']/gi

    let match: RegExpExecArray | null

    while ((match = attributeRegex.exec(normalized)) !== null) {
      const candidate = normalizeTextUrl(match[1])

      if (
        candidate.includes("google.com/maps") ||
        candidate.includes("maps.google.com")
      ) {
        candidates.add(candidate)
      }
    }

    const rawGoogleUrls = normalized.match(
      /https?:\/\/(?:www\.)?google\.[^"'<>\s\\]+/gi
    )

    for (const raw of rawGoogleUrls ?? []) {
      const candidate = normalizeTextUrl(raw)

      if (
        candidate.includes("/maps") ||
        candidate.includes("maps.google.com")
      ) {
        candidates.add(candidate)
      }
    }

    for (const candidate of candidates) {
      const coordinates =
        extractCoordinatesFromUrl(candidate)

      if (coordinates) {
        return coordinates
      }
    }

    // Last fallback: extract coordinate patterns directly from
    // the Google Maps HTML/JSON payload.
    return (
      extractCoordinatesFromString(normalized) ||
      null
    )
  } catch {
    return null
  }
}

export async function buildMapEmbedUrl(
  location: string
): Promise<string> {
  const value = location.trim()

  if (!value) return ""

  try {
    const direct = new URL(value)

    // رابط Embed جاهز
    if (
      direct.hostname.includes("google.com") &&
      direct.pathname.includes("/maps/embed")
    ) {
      return value
    }

    // روابط Google Maps المختصرة
    if (
      direct.hostname === "maps.app.goo.gl" ||
      direct.hostname === "goo.gl"
    ) {
      const coordinates =
        await resolveShortGoogleMapsUrl(value)

      if (!coordinates) {
        return ""
      }

      return (
        "https://www.google.com/maps?q=" +
        encodeURIComponent(
          `${toNumberString(coordinates.lat)},${toNumberString(
            coordinates.lng
          )}`
        ) +
        "&z=" +
        encodeURIComponent(coordinates.zoom) +
        "&output=embed"
      )
    }

    const coordinates =
      extractCoordinatesFromUrl(value)

    if (!coordinates) {
      return ""
    }

    return (
      "https://www.google.com/maps?q=" +
      encodeURIComponent(
        `${toNumberString(coordinates.lat)},${toNumberString(
          coordinates.lng
        )}`
      ) +
      "&z=" +
      encodeURIComponent(coordinates.zoom) +
      "&output=embed"
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
