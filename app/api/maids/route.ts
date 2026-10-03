import { NextResponse } from "next/server"
import { getActiveMaids } from "@/lib/maids"

export const runtime = "nodejs"

export async function GET() {
  try {
    const maids = await getActiveMaids()

    return NextResponse.json(maids, {
      headers: {
        "Cache-Control":
          "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error("PUBLIC_MAIDS_ERROR", error)

    return NextResponse.json(
      { error: "تعذر تحميل العاملات" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  }
}
