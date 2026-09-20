import { NextResponse } from "next/server"
import type { Document } from "mongodb"
import { getAdminSession } from "@/lib/admin-auth"
import clientPromise from "@/lib/mongodb"
import { buildMapEmbedUrl } from "@/lib/contact"

export async function GET() {
  const admin = await getAdminSession()

  if (!admin) {
    return NextResponse.json(
      { error: "غير مصرح" },
      { status: 401 }
    )
  }

  try {
    const client = await clientPromise
    const db = client.db("maidora")

    const doc = await db
      .collection<Document & { _id: string }>("settings")
      .findOne({
        _id: "contact",
      })

    const location = doc?.location ?? ""

    return NextResponse.json({
      whatsapp: doc?.whatsapp ?? "",
      phone: doc?.phone ?? "",
      location,
      locationEmbed:
        doc?.locationEmbed ||
        buildMapEmbedUrl(location),
    })
  } catch (error) {
    console.error("ADMIN_CONTACT_GET_ERROR", error)

    return NextResponse.json(
      { error: "تعذر تحميل بيانات الاتصال" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const admin = await getAdminSession()

  if (!admin) {
    return NextResponse.json(
      { error: "غير مصرح" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    const whatsapp =
      typeof body.whatsapp === "string"
        ? body.whatsapp.trim()
        : ""

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : ""

    const location =
      typeof body.location === "string"
        ? body.location.trim()
        : ""

    const locationEmbed =
      buildMapEmbedUrl(location)

    // لو الرابط غير قابل للتحويل، نرفض الحفظ
    if (location && !locationEmbed) {
      return NextResponse.json(
        {
          error:
            "رابط Google Maps غير صالح أو لا يحتوي على موقع يمكن استخراج إحداثياته.",
        },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("maidora")

    await db
      .collection<Document & { _id: string }>("settings")
      .updateOne(
        { _id: "contact" },
        {
          $set: {
            whatsapp,
            phone,
            location,
            locationEmbed,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            _id: "contact",
          },
        },
        { upsert: true }
      )

    return NextResponse.json({
      ok: true,
      whatsapp,
      phone,
      location,
      locationEmbed,
    })
  } catch (error) {
    console.error("ADMIN_CONTACT_SAVE_ERROR", error)

    return NextResponse.json(
      { error: "تعذر حفظ بيانات الاتصال" },
      { status: 500 }
    )
  }
}
