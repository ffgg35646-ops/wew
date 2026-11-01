import { NextResponse } from "next/server"
import { Readable } from "node:stream"
import { ObjectId, GridFSBucket } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { getEconomicLicenseSettings } from "@/lib/economic-license"

export const runtime = "nodejs"

type ByteRange = {
  start: number
  end: number
}

function parseByteRange(value: string | null, size: number): ByteRange | null | "invalid" {
  if (!value || !value.startsWith("bytes=") || value.includes(",")) {
    return null
  }

  const match = /^bytes=([0-9]*)-([0-9]*)$/.exec(value.trim())
  if (!match || (!match[1] && !match[2]) || size <= 0) {
    return "invalid"
  }

  let start: number
  let end: number

  if (!match[1]) {
    const suffixLength = Number(match[2])
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) {
      return "invalid"
    }
    start = Math.max(size - suffixLength, 0)
    end = size - 1
  } else {
    start = Number(match[1])
    end = match[2] ? Number(match[2]) : size - 1

    if (
      !Number.isSafeInteger(start) ||
      !Number.isSafeInteger(end) ||
      start < 0 ||
      end < start ||
      start >= size
    ) {
      return "invalid"
    }

    end = Math.min(end, size - 1)
  }

  return { start, end }
}

function contentDisposition(type: "view" | "download", originalName?: string) {
  const name = (originalName || "economic-development-license.pdf")
    .replace(/["\r\n]/g, "_")
    .trim() || "economic-development-license.pdf"
  const asciiName = name.replace(/[^\x20-\x7E]/g, "_").replace(/[\\"]/g, "_")
  const encodedName = encodeURIComponent(name).replace(/['()*]/g, (char) =>
    \`%\${char.charCodeAt(0).toString(16).toUpperCase()}\`
  )
  const disposition = type === "view" ? "inline" : "attachment"

  return \`\${disposition}; filename="\${asciiName}"; filename*=UTF-8''\${encodedName}\`
}

async function serveLicense(request: Request, headOnly = false) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (type !== "view" && type !== "download") {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const settings = await getEconomicLicenseSettings()

    if (!settings.enabled) {
      return NextResponse.json({ error: "License is disabled" }, { status: 404 })
    }

    const fileId = type === "view" ? settings.viewFileId : settings.downloadFileId
    const fileName = type === "view" ? settings.viewFileName : settings.downloadFileName

    if (!fileId || !ObjectId.isValid(fileId)) {
      return NextResponse.json({ error: "File not available" }, { status: 404 })
    }

    if (type === "view" && !settings.viewEnabled) {
      return NextResponse.json({ error: "View is disabled" }, { status: 404 })
    }

    if (type === "download" && !settings.downloadEnabled) {
      return NextResponse.json({ error: "Download is disabled" }, { status: 404 })
    }

    const client = await clientPromise
    const db = client.db("maidora")
    const objectId = new ObjectId(fileId)
    const file = await db
      .collection("economic_license_files.files")
      .findOne({ _id: objectId }) as { length?: number } | null

    if (!file || typeof file.length !== "number") {
      return NextResponse.json({ error: "Stored file not found" }, { status: 404 })
    }

    const totalSize = file.length
    const range = parseByteRange(request.headers.get("range"), totalSize)

    const headers = new Headers({
      "Accept-Ranges": "bytes",
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition(type, fileName),
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    })

    if (range === "invalid") {
      headers.set("Content-Range", \`bytes */\${totalSize}\`)
      return new Response(null, { status: 416, headers })
    }

    const isPartial = range !== null
    const start = isPartial ? range.start : 0
    const end = isPartial ? range.end : Math.max(totalSize - 1, 0)
    const responseLength = totalSize === 0 ? 0 : end - start + 1

    headers.set("Content-Length", String(responseLength))

    if (isPartial) {
      headers.set("Content-Range", \`bytes \${start}-\${end}/\${totalSize}\`)
    }

    const status = isPartial ? 206 : 200

    if (headOnly || responseLength === 0) {
      return new Response(null, { status, headers })
    }

    const bucket = new GridFSBucket(db, {
      bucketName: "economic_license_files",
    })
    const stream = isPartial
      ? bucket.openDownloadStream(objectId, { start, end: end + 1 })
      : bucket.openDownloadStream(objectId)

    const webStream = Readable.toWeb(stream) as ReadableStream<Uint8Array>

    return new Response(webStream, {
      status,
      headers,
    })
  } catch (error) {
    console.error("ECONOMIC_LICENSE_FILE_ERROR", error)
    return NextResponse.json(
      { error: "Failed to load file" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  return serveLicense(request)
}

export async function HEAD(request: Request) {
  return serveLicense(request, true)
}
