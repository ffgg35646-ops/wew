import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { requireAdmin } from "@/lib/admin-auth"

export const runtime = "nodejs"

const COLLECTION = "site_images"

export async function GET() {
  await requireAdmin()

  const client = await clientPromise
  const db = client.db("maidora")

  const items = await db
    .collection(COLLECTION)
    .find({})
    .sort({ page: 1, slot: 1 })
    .toArray()

  return NextResponse.json(
    items.map((item) => ({
      page: item.page,
      slot: item.slot,
      fileId: item.fileId,
      originalName: item.originalName ?? "",
    }))
  )
}

export async function POST(request: Request) {
  await requireAdmin()

  const body = await request.json()

  const page = String(body.page ?? "")
  const slot = Number(body.slot ?? 0)
  const fileId = String(body.fileId ?? "")
  const originalName = String(body.originalName ?? "")

  if (!page || !Number.isInteger(slot) || slot < 1 || !fileId) {
    return NextResponse.json(
      { error: "بيانات الصورة غير صحيحة" },
      { status: 400 }
    )
  }

  const client = await clientPromise
  const db = client.db("maidora")
  const collection = db.collection(COLLECTION)

  await collection.createIndex(
    { page: 1, slot: 1 },
    { unique: true }
  )

  await collection.updateOne(
    { page, slot },
    {
      $set: {
        page,
        slot,
        fileId,
        originalName,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  )

  return NextResponse.json({ ok: true })
}
