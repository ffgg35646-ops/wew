import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignJWT, jwtVerify } from "jose"

const COOKIE_NAME = "maidora_admin_session"

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is missing from .env.local")
  }

  return new TextEncoder().encode(secret)
}

export async function createAdminSession(admin: {
  id: string
  email: string
  role: string
}) {
  const token = await new SignJWT({
    email: admin.email,
    role: admin.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret())

  const cookieStore = await cookies()

  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecret())

    return {
      id: payload.sub ?? "",
      email: typeof payload.email === "string" ? payload.email : "",
      role: typeof payload.role === "string" ? payload.role : "",
    }
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return session
}
