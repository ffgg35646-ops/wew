import { NextResponse } from "next/server"
import type { Document } from "mongodb"
import { GridFSBucket, ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  try {
    await requireAdmin()

    const client = await clientPromise
    const db = client.db("maidora")

    const doc = await db
      .collection<Document & { _id: string }>("settings")
      .findOne({
        _id: "economic_license",
      })

    return NextResponse.json({
      enabled: doc?.enabled ?? true,
      viewEnabled: doc?.viewEnabled ?? true,
      downloadEnabled: doc?.downloadEnabled ?? true,
      viewFileId: doc?.viewFileId
        ? String(doc.viewFileId)
        : null,
      viewFileName: doc?.viewFileName ?? null,
      downloadFileId: doc?.downloadFileId
        ? String(doc.downloadFileId)
        : null,
      downloadFileName: doc?.downloadFileName ?? null,
    })
  } catch (error) {
    console.error("ECONOMIC_LICENSE_GET_ERROR", error)

    if (
      error instanceof Error &&
      error.message.includes("redirect")
    ) {
      throw error
    }

    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin()

    const body = await request.json()

    const allowed = [
      "enabled",
      "viewEnabled",
      "downloadEnabled",
    ] as const

    const update: Record<string, boolean> = {}

    for (const key of allowed) {
      if (typeof body[key] === "boolean") {
        update[key] = body[key]
      }
    }

    if (!Object.keys(update).length) {
      return NextResponse.json(
        { error: "No valid settings" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("maidora")

    await db
      .collection<Document & { _id: string }>("settings")
      .updateOne(
        { _id: "economic_license" },
        {
          $set: {
            ...update,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            enabled: true,
            viewEnabled: true,
            downloadEnabled: true,
            createdAt: new Date(),
          },
        },
        { upsert: true }
      )

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("ECONOMIC_LICENSE_PATCH_ERROR", error)

    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  // مهم:
  // نخلي requireAdmin خارج try
  // حتى لا يتم ابتلاع redirect وتحويله إلى خطأ رفع PDF.
  await requireAdmin()

  try {
    const formData = await request.formData()

    const type = formData.get("type")
    const file = formData.get("file")

    if (type !== "view" && type !== "download") {
      return NextResponse.json(
        { error: "Invalid upload type" },
        { status: 400 }
      )
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "PDF file is required" },
        { status: 400 }
      )
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "File is empty" },
        { status: 400 }
      )
    }

    const fileName = file.name || "license.pdf"
    const lowerName = fileName.toLowerCase()

    if (
      file.type !== "application/pdf" &&
      !lowerName.endsWith(".pdf")
    ) {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("maidora")

    const settingsCollection = db.collection<
      Document & { _id: string }
    >("settings")

    const current = await settingsCollection.findOne({
      _id: "economic_license",
    })

    const oldFileId =
      type === "view"
        ? current?.viewFileId
        : current?.downloadFileId

    const bucket = new GridFSBucket(db, {
      bucketName: "economic_license_files",
    })

    // حذف الملف القديم لنفس النوع
    if (oldFileId) {
      try {
        await bucket.delete(
          new ObjectId(String(oldFileId))
        )
      } catch (deleteError) {
        // لو الملف القديم غير موجود أصلًا،
        // نكمل رفع الملف الجديد عادي.
        console.error(
          "ECONOMIC_LICENSE_OLD_FILE_DELETE_ERROR",
          deleteError
        )
      }
    }

    const bytes = Buffer.from(
      await file.arrayBuffer()
    )

    const uploadStream = bucket.openUploadStream(
      fileName,
      {
        metadata: {
          type,
          uploadedAt: new Date(),
        },
      }
    )

    const fileId = await new Promise<ObjectId>(
      (resolve, reject) => {
        uploadStream.on(
          "finish",
          () => {
            resolve(uploadStream.id as ObjectId)
          }
        )

        uploadStream.on(
          "error",
          (error) => {
            reject(error)
          }
        )

        uploadStream.end(bytes)
      }
    )

    const update =
      type === "view"
        ? {
            viewFileId: fileId,
            viewFileName: fileName,
            viewEnabled: true,
          }
        : {
            downloadFileId: fileId,
            downloadFileName: fileName,
            downloadEnabled: true,
          }

    await settingsCollection.updateOne(
      { _id: "economic_license" },
      {
        $set: {
          ...update,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          enabled: true,
          viewEnabled: true,
          downloadEnabled: true,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    )

    return NextResponse.json({
      ok: true,
      type,
      fileName,
    })
  } catch (error) {
    console.error(
      "ECONOMIC_LICENSE_UPLOAD_ERROR",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to upload PDF",
      },
      { status: 500 }
    )
  }
}
