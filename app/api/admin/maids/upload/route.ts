import { NextResponse } from "next/server"
import { GridFSBucket } from "mongodb"
import { promises as fs } from "fs"
import os from "os"
import path from "path"
import { execFile } from "child_process"
import ffmpegPath from "ffmpeg-static"
import { promisify } from "util"
import clientPromise from "@/lib/mongodb"
import { requireAdmin } from "@/lib/admin-auth"

export const runtime = "nodejs"

const execFileAsync = promisify(execFile)

export async function POST(request: Request) {
  await requireAdmin()

  const formData = await request.formData()
  const file = formData.get("file")
  const type = String(formData.get("type") ?? "")

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "الملف مطلوب" },
      { status: 400 }
    )
  }

  if (type !== "image" && type !== "video") {
    return NextResponse.json(
      { error: "نوع الملف غير صحيح" },
      { status: 400 }
    )
  }

  const fileName = file.name || "file"
  const lower = fileName.toLowerCase()

  if (type === "image") {
    const valid =
      lower.endsWith(".jpg") ||
      lower.endsWith(".jpeg") ||
      lower.endsWith(".png") ||
      lower.endsWith(".webp")

    if (!valid) {
      return NextResponse.json(
        { error: "الصور المسموحة JPG PNG WEBP" },
        { status: 400 }
      )
    }
  }

  const client = await clientPromise
  const db = client.db("maidora")

  const bucket = new GridFSBucket(db, {
    bucketName: "maid_media",
  })

  let uploadBuffer: Buffer
  let uploadName = fileName
  let contentType = file.type || "application/octet-stream"
  let tempInput: string | null = null
  let tempOutput: string | null = null

  try {
    const originalBuffer = Buffer.from(await file.arrayBuffer())

    if (type === "video") {
      const tempDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "maidora-video-")
      )

      tempInput = path.join(tempDir, `input-${Date.now()}`)
      tempOutput = path.join(tempDir, `output-${Date.now()}.mp4`)

      await fs.writeFile(tempInput, originalBuffer)

      try {
        await execFileAsync(ffmpegPath || "ffmpeg", [
          "-y",
          "-i",
          tempInput,
          "-map",
          "0:v:0",
          "-map",
          "0:a:0?",
          "-c:v",
          "libx264",
          "-preset",
          "veryfast",
          "-crf",
          "23",
          "-pix_fmt",
          "yuv420p",
          "-c:a",
          "aac",
          "-b:a",
          "128k",
          "-movflags",
          "+faststart",
          tempOutput,
        ])
      } catch (error) {
        console.error("FFMPEG_VIDEO_CONVERSION_ERROR", error)

        return NextResponse.json(
          {
            error:
              "تعذر تحويل الفيديو إلى صيغة متوافقة مع المتصفح."
          },
          { status: 400 }
        )
      }

      uploadBuffer = await fs.readFile(tempOutput)
      uploadName = `${path.parse(fileName).name}.mp4`
      contentType = "video/mp4"
    } else {
      uploadBuffer = originalBuffer
    }

    const upload = bucket.openUploadStream(uploadName, {
      metadata: {
        type,
        uploadedAt: new Date(),
        contentType,
        originalName: fileName,
      },
    })

    const fileId = await new Promise<string>(
      (resolve, reject) => {
        upload.on("finish", () => {
          resolve(String(upload.id))
        })

        upload.on("error", reject)
        upload.end(uploadBuffer)
      }
    )

    return NextResponse.json({
      ok: true,
      fileId,
      fileName: uploadName,
      originalFileName: fileName,
      type,
      contentType,
    })
  } finally {
    const filesToDelete = [tempInput, tempOutput].filter(
      (value): value is string => Boolean(value)
    )

    for (const filePath of filesToDelete) {
      try {
        await fs.unlink(filePath)
      } catch {}
    }

    if (tempInput) {
      try {
        await fs.rm(path.dirname(tempInput), {
          recursive: true,
          force: true,
        })
      } catch {}
    }
  }
}
