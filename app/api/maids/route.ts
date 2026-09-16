import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("maidora")

    const maids = await db
      .collection("maids")
      .find({ active: true })
      .sort({ createdAt: -1 })
      .toArray()

    const result = maids.map((maid: any) => ({
      id: String(maid._id),
      name: maid.name ?? "",
      age: maid.age ?? "",
      nationality: maid.nationality ?? "",
      country: maid.country ?? "",
      experience: maid.experience ?? "",
      languages: Array.isArray(maid.languages)
        ? maid.languages
        : [],
      skills: Array.isArray(maid.skills)
        ? maid.skills
        : [],
      workType: maid.workType ?? "",
      description: maid.description ?? "",
      imageIds: Array.isArray(maid.imageIds)
        ? maid.imageIds.map((id: unknown) => String(id))
        : [],
      videoId: maid.videoId
        ? String(maid.videoId)
        : null,
    }))

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("PUBLIC_MAIDS_ERROR", error)

    return NextResponse.json(
      { error: "تعذر تحميل العاملات" },
      { status: 500 }
    )
  }
}
