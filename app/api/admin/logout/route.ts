import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()

  cookieStore.set({
    name: "maidora_admin_session",
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })

  return NextResponse.json({ ok: true })
}
