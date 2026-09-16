import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"
import { createAdminSession } from "@/lib/admin-auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const email = String(body.email ?? "").trim().toLowerCase()
    const password = String(body.password ?? "")

    if (!email || !password) {
      return NextResponse.json(
        { error: "البريد الإلكتروني وكلمة المرور مطلوبان" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("maidora")

    const admin = await db.collection("admins").findOne({
      email,
      active: true,
    })

    if (!admin?.passwordHash) {
      return NextResponse.json(
        { error: "بيانات الدخول غير صحيحة" },
        { status: 401 }
      )
    }

    const valid = await bcrypt.compare(password, admin.passwordHash)

    if (!valid) {
      return NextResponse.json(
        { error: "بيانات الدخول غير صحيحة" },
        { status: 401 }
      )
    }

    await createAdminSession({
      id: String(admin._id),
      email: admin.email,
      role: admin.role ?? "admin",
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("ADMIN_LOGIN_ERROR", error)

    return NextResponse.json(
      { error: "حدث خطأ أثناء تسجيل الدخول" },
      { status: 500 }
    )
  }
}
