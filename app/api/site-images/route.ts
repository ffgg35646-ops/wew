import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const page = url.searchParams.get("page")

  if (!page) {
    return NextResponse.json(
      { error: "Missing page" },
      { status: 400 }
    )
  }

  const client = await clientPromise
  const db = client.db("maidora")

  const items = await db
    .collection("site_images")
    .find({ page })
    .sort({ slot: 1 })
    .toArray()

  return NextResponse.json({
    items: items.map((item) => ({
      slot: item.slot,
      url: `/api/maids/media?id=${encodeURIComponent(String(item.fileId))}`,
    })),
  })
}
