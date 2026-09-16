"use client"

import { ChangeEvent, useEffect, useState } from "react"

type Settings = {
  enabled: boolean
  viewEnabled: boolean
  downloadEnabled: boolean
  viewFileName: string | null
  downloadFileName: string | null
}

export default function LicenseAdminClient() {
  const [settings, setSettings] = useState<Settings>({
    enabled: true,
    viewEnabled: true,
    downloadEnabled: true,
    viewFileName: null,
    downloadFileName: null,
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState("")
  const [message, setMessage] = useState("")

  async function loadSettings() {
    try {
      const response = await fetch("/api/admin/economic-license", {
        cache: "no-store",
      })

      if (!response.ok) throw new Error()

      const data = await response.json()
      setSettings({
        enabled: data.enabled ?? true,
        viewEnabled: data.viewEnabled ?? true,
        downloadEnabled: data.downloadEnabled ?? true,
        viewFileName: data.viewFileName ?? null,
        downloadFileName: data.downloadFileName ?? null,
      })
    } catch {
      setMessage("تعذر تحميل إعدادات الترخيص")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  async function toggle(
    key: "enabled" | "viewEnabled" | "downloadEnabled"
  ) {
    const value = !settings[key]
    setSaving(key)
    setMessage("")

    try {
      const response = await fetch("/api/admin/economic-license", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [key]: value,
        }),
      })

      if (!response.ok) throw new Error()

      setSettings((current) => ({
        ...current,
        [key]: value,
      }))

      setMessage("تم حفظ التغيير")
    } catch {
      setMessage("فشل حفظ التغيير")
    } finally {
      setSaving("")
    }
  }

  async function upload(
    type: "view" | "download",
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    if (!file) return

    setSaving(type)
    setMessage("")

    try {
      const formData = new FormData()
      formData.append("type", type)
      formData.append("file", file)

      const response = await fetch(
        "/api/admin/economic-license",
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      if (type === "view") {
        setSettings((current) => ({
          ...current,
          viewFileName: data.fileName,
        }))
      } else {
        setSettings((current) => ({
          ...current,
          downloadFileName: data.fileName,
        }))
      }

      setMessage("تم رفع الملف بنجاح")
      event.target.value = ""
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "فشل رفع الملف"
      )
    } finally {
      setSaving("")
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <p className="font-bold text-slate-600">
          جاري تحميل إعدادات الترخيص...
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-5">
      {message && (
        <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-[#1257D6]">
          {message}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-extrabold text-slate-900">
              ظهور عنصر الترخيص
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              عند الإيقاف يختفي عنصر الترخيص بالكامل من الـNavbar.
            </p>
          </div>

          <button
            type="button"
            disabled={saving === "enabled"}
            onClick={() => toggle("enabled")}
            className={`rounded-xl px-5 py-3 text-sm font-bold text-white ${
              settings.enabled
                ? "bg-[#1257D6]"
                : "bg-slate-400"
            }`}
          >
            {settings.enabled ? "مفعّل" : "متوقف"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <h2 className="font-extrabold text-slate-900">
          ملف العرض
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          هذا هو الملف الذي سيفتح عند الضغط على «عرض».
        </p>

        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          {settings.viewFileName
            ? `الملف الحالي: ${settings.viewFileName}`
            : "لا يوجد ملف عرض مرفوع حاليًا."}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="cursor-pointer rounded-xl bg-[#1257D6] px-5 py-3 text-sm font-bold text-white">
            {saving === "view"
              ? "جاري الرفع..."
              : "رفع / استبدال ملف العرض"}

            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(event) => upload("view", event)}
              disabled={saving === "view"}
            />
          </label>

          <button
            type="button"
            disabled={saving === "viewEnabled"}
            onClick={() => toggle("viewEnabled")}
            className={`rounded-xl px-5 py-3 text-sm font-bold ${
              settings.viewEnabled
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {settings.viewEnabled
              ? "العرض مفعّل"
              : "العرض متوقف"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <h2 className="font-extrabold text-slate-900">
          ملف التحميل
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          هذا هو الملف الذي سيتم تنزيله عند الضغط على «تحميل الآن».
        </p>

        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          {settings.downloadFileName
            ? `الملف الحالي: ${settings.downloadFileName}`
            : "لا يوجد ملف تحميل مرفوع حاليًا."}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="cursor-pointer rounded-xl bg-[#1257D6] px-5 py-3 text-sm font-bold text-white">
            {saving === "download"
              ? "جاري الرفع..."
              : "رفع / استبدال ملف التحميل"}

            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(event) =>
                upload("download", event)
              }
              disabled={saving === "download"}
            />
          </label>

          <button
            type="button"
            disabled={saving === "downloadEnabled"}
            onClick={() => toggle("downloadEnabled")}
            className={`rounded-xl px-5 py-3 text-sm font-bold ${
              settings.downloadEnabled
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {settings.downloadEnabled
              ? "التحميل مفعّل"
              : "التحميل متوقف"}
          </button>
        </div>
      </div>
    </div>
  )
}
