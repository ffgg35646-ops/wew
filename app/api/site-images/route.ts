import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const page = url.searchParams.get("page")

  if (!page) {
    return NextResponse.json(
      { error: "Missing page" },
      {
        status: 400,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    )
  }

  try {
    const client = await clientPromise
    const db = client.db("maidora")

    const items = await db
      .collection("site_images")
      .find({ page })
      .sort({ slot: 1 })
      .toArray()

    return NextResponse.json(
      {
        items: items.map((item) => ({
          slot: item.slot,
          url: `/api/maids/media?id=${encodeURIComponent(
            String(item.fileId)
          )}&v=${encodeURIComponent(
            String(
              item.updatedAt ??
                item.createdAt ??
                item._id ??
                Date.now()
            )
          )}`,
        })),
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    )
  } catch (error) {
    console.error("SITE_IMAGES_GET_ERROR", error)

    return NextResponse.json(
      { error: "Failed to load site images" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  }
}
