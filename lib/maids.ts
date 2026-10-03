import { unstable_cache } from "next/cache"
import clientPromise from "@/lib/mongodb"

export type PublicMaid = {
  id: string
  name: string
  age: string
  nationality: string
  country: string
  experience: string
  languages: Array<{
    name: string
    level: string
  }>
  skills: string[]
  workType: string
  description: string
  imageIds: string[]
  videoId: string | null
  active?: boolean
}

export const getActiveMaids = unstable_cache(
  async (): Promise<PublicMaid[]> => {
    const client = await clientPromise
    const db = client.db("maidora")

    const maids = await db
      .collection("maids")
      .find({ active: true })
      .sort({ createdAt: -1 })
      .toArray()

    return maids.map((maid: any) => ({
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
      active: maid.active !== false,
    }))
  },
  ["maidora-active-maids"],
  {
    revalidate: 60,
    tags: ["maids"],
  }
)
