import clientPromise from "@/lib/mongodb"
import type { Document } from "mongodb"

export type EconomicLicenseSettings = {
  enabled: boolean
  viewEnabled: boolean
  downloadEnabled: boolean
  viewFileId?: string
  viewFileName?: string
  downloadFileId?: string
  downloadFileName?: string
}

const DEFAULT_SETTINGS: EconomicLicenseSettings = {
  enabled: true,
  viewEnabled: true,
  downloadEnabled: true,
}

export async function getEconomicLicenseSettings(): Promise<EconomicLicenseSettings> {
  const client = await clientPromise
  const db = client.db("maidora")

  const doc = await db.collection<Document & { _id: string }>("settings").findOne({
    _id: "economic_license",
  })

  if (!doc) return DEFAULT_SETTINGS

  return {
    enabled: doc.enabled ?? true,
    viewEnabled: doc.viewEnabled ?? true,
    downloadEnabled: doc.downloadEnabled ?? true,
    viewFileId: doc.viewFileId ? String(doc.viewFileId) : undefined,
    viewFileName: doc.viewFileName ?? undefined,
    downloadFileId: doc.downloadFileId
      ? String(doc.downloadFileId)
      : undefined,
    downloadFileName: doc.downloadFileName ?? undefined,
  }
}
