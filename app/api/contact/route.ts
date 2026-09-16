import { NextResponse } from "next/server"
import { getContactSettings } from "@/lib/contact"

export async function GET() {
  try {
    const settings = await getContactSettings()

    return NextResponse.json(settings)
  } catch (error) {
    console.error("PUBLIC_CONTACT_SETTINGS_ERROR", error)

    return NextResponse.json(
      {
        whatsapp: "",
        phone: "",
      },
      { status: 200 }
    )
  }
}
