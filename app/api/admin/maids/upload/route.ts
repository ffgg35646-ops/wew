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
export const maxDuration = 300

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

      tempInput = path.join(
        tempDir,
        `input-${Date.now()}`
      )

      tempOutput = path.join(
        tempDir,
        `output-${Date.now()}.mp4`
      )

      await fs.writeFile(tempInput, originalBuffer)

      let ffmpegExists = false
      let ffmpegMode: number | null = null

      try {
        if (ffmpegPath) {
          const stat = await fs.stat(ffmpegPath)
          ffmpegExists = stat.isFile()
          ffmpegMode = stat.mode
        }
      } catch {}

      console.log("========== FFMPEG START ==========")
      console.log("ffmpegPath:", ffmpegPath)
      console.log("ffmpegExists:", ffmpegExists)
      console.log("ffmpegMode:", ffmpegMode)
      console.log("input:", tempInput)
      console.log("output:", tempOutput)
      console.log("originalFileName:", fileName)
      console.log("originalSize:", originalBuffer.length)
      console.log("contentType:", file.type)
      console.log("===================================")

      if (!ffmpegPath || !ffmpegExists) {
        console.error("FFMPEG_BINARY_NOT_FOUND")

        return NextResponse.json(
          {
            error: "FFmpeg binary not found",
            code: "FFMPEG_BINARY_NOT_FOUND",
            ffmpegPath: ffmpegPath ?? null,
            ffmpegExists,
            ffmpegMode,
          },
          { status: 500 }
        )
      }

      try {
        const result = await execFileAsync(ffmpegPath, [
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

        console.log("========== FFMPEG SUCCESS ==========")
        console.log("stdout:", result.stdout)
        console.log("stderr:", result.stderr)
        console.log("====================================")
      } catch (error) {
        const err = error as {
          code?: string | number
          signal?: string
          killed?: boolean
          message?: string
          stdout?: string
          stderr?: string
        }

        console.error("========== FFMPEG ERROR ==========")
        console.error("ffmpegPath:", ffmpegPath)
        console.error("ffmpegExists:", ffmpegExists)
        console.error("ffmpegMode:", ffmpegMode)
        console.error("errorCode:", err.code)
        console.error("signal:", err.signal)
        console.error("killed:", err.killed)
        console.error("errorMessage:", err.message)
        console.error("stdout:", err.stdout)
        console.error("stderr:", err.stderr)
        console.error("===================================")

        return NextResponse.json(
          {
            error: "FFmpeg conversion failed",
            code: err.code ?? null,
            signal: err.signal ?? null,
            killed: err.killed ?? null,
            message: err.message ?? null,
            stderr: err.stderr ?? null,
            stdout: err.stdout ?? null,
            ffmpegExists,
            ffmpegPath,
            ffmpegMode,
          },
          { status: 400 }
        )
      }

      try {
        await fs.access(tempOutput)
      } catch {
        console.error(
          "FFMPEG_OUTPUT_NOT_CREATED",
          tempOutput
        )

        return NextResponse.json(
          {
            error: "FFmpeg finished but output file was not created",
            code: "FFMPEG_OUTPUT_NOT_CREATED",
          },
          { status: 400 }
        )
      }

      uploadBuffer = await fs.readFile(tempOutput)

      uploadName = `${path.parse(fileName).name}.mp4`
      contentType = "video/mp4"

      console.log(
        "Converted video size:",
        uploadBuffer.length
      )
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
    const filesToDelete = [
      tempInput,
      tempOutput,
    ].filter(
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
```
