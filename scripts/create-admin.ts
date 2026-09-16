import bcrypt from "bcryptjs"
import clientPromise from "../lib/mongodb"

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required")
  }

  const client = await clientPromise
  const db = client.db("maidora")

  const passwordHash = await bcrypt.hash(password, 12)

  await db.collection("admins").updateOne(
    { email },
    {
      $set: {
        email,
        passwordHash,
        active: true,
        role: "super_admin",
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  )

  console.log(`✅ Admin ready: ${email}`)
  await client.close()
}

main().catch((error) => {
  console.error("❌", error)
  process.exit(1)
})
