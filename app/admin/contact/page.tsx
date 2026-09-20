"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminContactPage() {
  const [whatsapp, setWhatsapp] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/admin/contact", {
          cache: "no-store",
        })

        const data = await response.json()

        if (!response.ok) {
          setMessage(data.error ?? "تعذر تحميل البيانات")
          return
        }

        setWhatsapp(data.whatsapp ?? "")
        setPhone(data.phone ?? "")
        setLocation(data.location ?? "")
      } catch {
        setMessage("تعذر تحميل بيانات الاتصال")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  async function save() {
    setSaving(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          whatsapp,
          phone,
          location,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error ?? "تعذر الحفظ")
        return
      }

      setMessage("✅ تم حفظ بيانات الاتصال")
    } catch {
      setMessage("تعذر الاتصال بالخادم")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F7F9FC] px-5 py-10 md:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="text-sm font-bold text-[#1257D6]"
        >
          ← العودة للوحة التحكم
        </Link>

        <div className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="text-sm font-bold text-[#1257D6]">
            بيانات الاتصال
          </div>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            أرقام التواصل
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            أدخل بيانات التواصل ورابط موقعك على Google Maps.
          </p>

          {loading ? (
            <div className="py-16 text-center text-sm font-bold text-slate-400">
              جاري تحميل البيانات...
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-black">
                  رقم واتساب
                </label>

                <input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="971501234567"
                  dir="ltr"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left text-sm font-bold outline-none focus:border-[#1257D6] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black">
                  رقم الهاتف
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="971501234567"
                  dir="ltr"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left text-sm font-bold outline-none focus:border-[#1257D6] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black">
                  رابط الموقع على Google Maps
                </label>

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="https://www.google.com/maps/..."
                  dir="ltr"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left text-sm font-bold outline-none focus:border-[#1257D6] focus:bg-white"
                />

                <p className="mt-2 text-xs leading-6 text-slate-400">
                  ضع رابط Google Maps العادي فقط، وسيقوم النظام بتجهيز
                  الخريطة تلقائيًا.
                </p>
              </div>

              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="w-full rounded-2xl bg-[#1257D6] px-6 py-4 text-sm font-black text-white disabled:opacity-60"
              >
                {saving ? "جاري الحفظ..." : "حفظ بيانات الاتصال"}
              </button>

              {message && (
                <div className="rounded-2xl bg-slate-50 px-5 py-4 text-center text-sm font-bold text-slate-600">
                  {message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
