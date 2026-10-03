import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"
import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"

const getSiteImages = unstable_cache(
  async (page: string) => {
    const client = await clientPromise
    const db = client.db("maidora")

    return db
      .collection("site_images")
      .find({ page })
      .sort({ slot: 1 })
      .toArray()
  },
  ["site-images"],
  {
    revalidate: 60,
    tags: ["site-images"],
  }
)

export async function GET(request: Request) {
  const url = new URL(request.url)
  const page = url.searchParams.get("page")

  if (!page) {
    return NextResponse.json(
      { error: "Missing page" },
      { status: 400 }
    )
  }

  try {
    const items = await getSiteImages(page)

    return NextResponse.json(
      {
        items: items.map((item: any) => ({
          slot: item.slot,
          url: `/api/maids/media?id=${encodeURIComponent(
            String(item.fileId)
          )}&v=${encodeURIComponent(
            String(
              item.updatedAt ??
                item.createdAt ??
                item._id
            )
          )}`,
        })),
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=30, s-maxage=60, stale-while-revalidate=300",
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
