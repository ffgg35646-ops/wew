import { NextResponse } from "next/server"
import { getEconomicLicenseSettings } from "@/lib/economic-license"

export async function GET() {
  try {
    const settings = await getEconomicLicenseSettings()

    return NextResponse.json({
      enabled: settings.enabled,
      viewEnabled: settings.viewEnabled,
      downloadEnabled: settings.downloadEnabled,
      viewFileId: settings.viewFileId ?? null,
      downloadFileId: settings.downloadFileId ?? null,
    })
  } catch (error) {
    console.error("PUBLIC_ECONOMIC_LICENSE_SETTINGS_ERROR", error)

    return NextResponse.json(
      {
        enabled: false,
        viewEnabled: false,
        downloadEnabled: false,
        viewFileId: null,
        downloadFileId: null,
      },
      { status: 200 }
    )
  }
}
