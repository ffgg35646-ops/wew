import { NextResponse } from "next/server"
import { getContactSettings } from "@/lib/contact"

export async function GET() {
  try {
    const settings = await getContactSettings()

    return NextResponse.json(settings, {\n      headers: {\n        "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300",\n      },\n    })
  } catch (error) {
    console.error("PUBLIC_CONTACT_SETTINGS_ERROR", error)

    return NextResponse.json(
      {
        whatsapp: "",
        phone: "",
        location: "",
        locationEmbed: "",
      },
      { status: 200 }
    )
  }
}
