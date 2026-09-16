import { NextResponse } from "next/server"
import { ObjectId, GridFSBucket } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { getEconomicLicenseSettings } from "@/lib/economic-license"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (type !== "view" && type !== "download") {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      )
    }

    const settings = await getEconomicLicenseSettings()

    if (!settings.enabled) {
      return NextResponse.json(
        { error: "License is disabled" },
        { status: 404 }
      )
    }

    const fileId =
      type === "view"
        ? settings.viewFileId
        : settings.downloadFileId

    const fileName =
      type === "view"
        ? settings.viewFileName
        : settings.downloadFileName

    if (!fileId) {
      return NextResponse.json(
        { error: "File not available" },
        { status: 404 }
      )
    }

    if (type === "view" && !settings.viewEnabled) {
      return NextResponse.json(
        { error: "View is disabled" },
        { status: 404 }
      )
    }

    if (type === "download" && !settings.downloadEnabled) {
      return NextResponse.json(
        { error: "Download is disabled" },
        { status: 404 }
      )
    }

    const client = await clientPromise
    const db = client.db("maidora")
    const bucket = new GridFSBucket(db, {
      bucketName: "economic_license_files",
    })

    const objectId = new ObjectId(fileId)

    const files = await db
      .collection("economic_license_files.files")
      .find({ _id: objectId })
      .limit(1)
      .toArray()

    if (!files.length) {
      return NextResponse.json(
        { error: "Stored file not found" },
        { status: 404 }
      )
    }

    const stream = bucket.openDownloadStream(objectId)

    const webStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk))
        stream.on("end", () => controller.close())
        stream.on("error", (error) => controller.error(error))
      },
    })

    const safeName = (fileName || "economic-development-license.pdf")
      .replace(/"/g, "")

    const disposition =
      type === "view"
        ? `inline; filename="${safeName}"`
        : `attachment; filename="${safeName}"`

    return new Response(webStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": disposition,
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    })
  } catch (error) {
    console.error("ECONOMIC_LICENSE_FILE_ERROR", error)

    return NextResponse.json(
      { error: "Failed to load file" },
      { status: 500 }
    )
  }
}
