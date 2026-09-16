import { NextResponse } from "next/server"
import { ObjectId, GridFSBucket } from "mongodb"
import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "معرف الملف غير صحيح" },
      { status: 400 }
    )
  }

  const client = await clientPromise
  const db = client.db("maidora")

  const file = await db.collection("maid_media.files").findOne({
    _id: new ObjectId(id),
  })

  if (!file) {
    return NextResponse.json(
      { error: "الملف غير موجود" },
      { status: 404 }
    )
  }

  const metadata =
    file.metadata && typeof file.metadata === "object"
      ? file.metadata as {
          contentType?: string
          type?: string
        }
      : {}

  const contentType =
    metadata.contentType ||
    (metadata.type === "video"
      ? "video/mp4"
      : file.contentType || "application/octet-stream")

  const total = Number(file.length)

  const bucket = new GridFSBucket(db, {
    bucketName: "maid_media",
  })

  const range = request.headers.get("range")

  let start = 0
  let end = total - 1

  if (range) {
    const match = range.match(/^bytes=(\d*)-(\d*)$/)

    if (!match) {
      return new Response(null, {
        status: 416,
        headers: {
          "Content-Range": `bytes */${total}`,
        },
      })
    }

    const rangeStart = match[1]
    const rangeEnd = match[2]

    if (!rangeStart && rangeEnd) {
      const suffixLength = Number(rangeEnd)

      if (!Number.isFinite(suffixLength) || suffixLength <= 0) {
        return new Response(null, {
          status: 416,
          headers: {
            "Content-Range": `bytes */${total}`,
          },
        })
      }

      start = Math.max(0, total - suffixLength)
      end = total - 1
    } else {
      start = Number(rangeStart)

      if (!Number.isFinite(start) || start < 0 || start >= total) {
        return new Response(null, {
          status: 416,
          headers: {
            "Content-Range": `bytes */${total}`,
          },
        })
      }

      end = rangeEnd
        ? Math.min(Number(rangeEnd), total - 1)
        : total - 1
    }

    if (end < start) {
      return new Response(null, {
        status: 416,
        headers: {
          "Content-Range": `bytes */${total}`,
        },
      })
    }
  }

  const length = end - start + 1

  const stream = bucket.openDownloadStream(
    new ObjectId(id),
    {
      start,
      end: end + 1,
    }
  )

  const webStream = new ReadableStream<Uint8Array>({
    start(controller) {
      stream.on("data", (chunk) => {
        controller.enqueue(
          chunk instanceof Uint8Array
            ? chunk
            : new Uint8Array(chunk)
        )
      })

      stream.on("end", () => controller.close())
      stream.on("error", (error) => controller.error(error))
    },

    cancel() {
      stream.destroy()
    },
  })

  return new Response(webStream, {
    status: range ? 206 : 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(length),
      "Accept-Ranges": "bytes",
      ...(range
        ? {
            "Content-Range":
              `bytes ${start}-${end}/${total}`,
          }
        : {}),
      "Cache-Control": "private, no-cache",
      "Content-Disposition":
        `inline; filename="${String(
          file.filename || "video.mp4"
        ).replace(/"/g, "")}"`,
    },
  })
}
