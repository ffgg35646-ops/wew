"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "فشل تسجيل الدخول")
        return
      }

      router.replace("/admin")
      router.refresh()
    } catch {
      setError("تعذر الاتصال بالخادم")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-5"
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1257D6] text-2xl font-black text-white">
            M
          </div>

          <h1 className="text-2xl font-black text-slate-900">
            تسجيل دخول الإدارة
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            ادخل بيانات حساب المدير للوصول إلى لوحة التحكم
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@maidora.local"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#1257D6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              كلمة المرور
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#1257D6]"
            />
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#1257D6] px-5 py-3.5 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </main>
  )
}
