import { NextResponse } from "next/server"
import { GridFSBucket, ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "الملف غير صحيح" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("maidora")

    const fileId = new ObjectId(id)

    const files = await db
      .collection("maid_media.files")
      .find({ _id: fileId })
      .limit(1)
      .toArray()

    if (!files.length) {
      return NextResponse.json(
        { error: "الملف غير موجود" },
        { status: 404 }
      )
    }

    const file = files[0]

    const bucket = new GridFSBucket(db, {
      bucketName: "maid_media",
    })

    const stream = bucket.openDownloadStream(fileId)

    const webStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => {
          controller.enqueue(chunk)
        })

        stream.on("end", () => {
          controller.close()
        })

        stream.on("error", (error) => {
          controller.error(error)
        })
      },
    })

    return new Response(webStream, {
      headers: {
        "Content-Type":
          file.contentType || "application/octet-stream",
        "Content-Length": String(file.length),
        "Cache-Control": "public, max-age=3600",
        "Content-Disposition": `inline; filename="${String(
          file.filename || "file"
        ).replace(/"/g, "")}"`,
      },
    })
  } catch (error) {
    console.error("PUBLIC_MAID_MEDIA_ERROR", error)

    return NextResponse.json(
      { error: "تعذر تحميل الملف" },
      { status: 500 }
    )
  }
}
