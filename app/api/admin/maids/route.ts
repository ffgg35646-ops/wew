import { NextResponse } from "next/server"
import { ObjectId, GridFSBucket } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { requireAdmin } from "@/lib/admin-auth"

function serializeMaid(doc: any) {
  return {
    id: String(doc._id),
    name: doc.name ?? "",
    age: doc.age ?? "",
    nationality: doc.nationality ?? "",
    country: doc.country ?? "",
    experience: doc.experience ?? "",
    languages: Array.isArray(doc.languages) ? doc.languages : [],
    skills: Array.isArray(doc.skills) ? doc.skills : [],
    workType: doc.workType ?? "",
    description: doc.description ?? "",
    imageIds: Array.isArray(doc.imageIds)
      ? doc.imageIds.map((id: any) => String(id))
      : [],
    imageNames: Array.isArray(doc.imageNames) ? doc.imageNames : [],
    videoId: doc.videoId ? String(doc.videoId) : null,
    videoName: doc.videoName ?? null,
    active: doc.active !== false,
    createdAt: doc.createdAt ?? null,
    updatedAt: doc.updatedAt ?? null,
  }
}

export async function GET() {
  await requireAdmin()

  const client = await clientPromise
  const db = client.db("maidora")

  const maids = await db
    .collection("maids")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json(
    maids.map(serializeMaid)
  )
}

export async function POST(request: Request) {
  await requireAdmin()

  const body = await request.json()

  if (!String(body.name ?? "").trim()) {
    return NextResponse.json(
      { error: "اسم العاملة مطلوب" },
      { status: 400 }
    )
  }

  const client = await clientPromise
  const db = client.db("maidora")

  const maid = {
    name: String(body.name ?? "").trim(),
    age: String(body.age ?? "").trim(),
    nationality: String(body.nationality ?? "").trim(),
    country: String(body.country ?? "").trim(),
    experience: String(body.experience ?? "").trim(),
    languages: Array.isArray(body.languages)
      ? body.languages
      : [],
    skills: Array.isArray(body.skills)
      ? body.skills
      : [],
    workType: String(body.workType ?? "").trim(),
    description: String(body.description ?? "").trim(),
    imageIds: Array.isArray(body.imageIds)
      ? body.imageIds
      : [],
    imageNames: Array.isArray(body.imageNames)
      ? body.imageNames
      : [],
    videoId: body.videoId || null,
    videoName: body.videoName || null,
    active: body.active !== false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await db
    .collection("maids")
    .insertOne(maid)

  return NextResponse.json(
    {
      ok: true,
      maid: serializeMaid({
        ...maid,
        _id: result.insertedId,
      }),
    },
    { status: 201 }
  )
}

export async function PATCH(request: Request) {
  await requireAdmin()

  const body = await request.json()
  const id = String(body.id ?? "")

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "معرف العاملة غير صحيح" },
      { status: 400 }
    )
  }

  const client = await clientPromise
  const db = client.db("maidora")

  const update = {
    name: String(body.name ?? "").trim(),
    age: String(body.age ?? "").trim(),
    nationality: String(body.nationality ?? "").trim(),
    country: String(body.country ?? "").trim(),
    experience: String(body.experience ?? "").trim(),
    languages: Array.isArray(body.languages)
      ? body.languages
      : [],
    skills: Array.isArray(body.skills)
      ? body.skills
      : [],
    workType: String(body.workType ?? "").trim(),
    description: String(body.description ?? "").trim(),
    imageIds: Array.isArray(body.imageIds)
      ? body.imageIds
      : [],
    imageNames: Array.isArray(body.imageNames)
      ? body.imageNames
      : [],
    videoId: body.videoId || null,
    videoName: body.videoName || null,
    active: body.active !== false,
    updatedAt: new Date(),
  }

  const result = await db.collection("maids").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update },
    { returnDocument: "after" }
  )

  if (!result) {
    return NextResponse.json(
      { error: "العاملة غير موجودة" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    ok: true,
    maid: serializeMaid(result),
  })
}

export async function DELETE(request: Request) {
  await requireAdmin()

  const body = await request.json()
  const id = String(body.id ?? "")

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "معرف العاملة غير صحيح" },
      { status: 400 }
    )
  }

  const client = await clientPromise
  const db = client.db("maidora")

  const maid = await db.collection("maids").findOne({
    _id: new ObjectId(id),
  })

  if (!maid) {
    return NextResponse.json(
      { error: "العاملة غير موجودة" },
      { status: 404 }
    )
  }

  const bucket = new GridFSBucket(db, {
    bucketName: "maid_media",
  })

  const imageIds = Array.isArray(maid.imageIds)
    ? maid.imageIds
    : []

  for (const fileId of imageIds) {
    try {
      await bucket.delete(
        new ObjectId(String(fileId))
      )
    } catch {}
  }

  if (maid.videoId) {
    try {
      await bucket.delete(
        new ObjectId(String(maid.videoId))
      )
    } catch {}
  }

  await db.collection("maids").deleteOne({
    _id: new ObjectId(id),
  })

  return NextResponse.json({ ok: true })
}
