"use client"

import { useEffect, useMemo, useState } from "react"

type Section = {
  key: string
  title: string
  count: number
}

type ImageRecord = {
  page: string
  slot: number
  fileId: string
  originalName: string
}

const sections: Section[] = [
  {
    key: "home",
    title: "الرئيسية",
    count: 6,
  },
  {
    key: "about",
    title: "من نحن",
    count: 1,
  },
  {
    key: "nationalities",
    title: "الجنسيات",
    count: 6,
  },
  {
    key: "full-time-maid-service",
    title: "الخدمة بدوام كامل",
    count: 4,
  },
  {
    key: "maid-visa",
    title: "تأشيرة العاملة المنزلية",
    count: 6,
  },
  {
    key: "shared",
    title: "الشعار المشترك",
    count: 1,
  },
]

export default function SiteImagesAdminClient() {
  const [records, setRecords] = useState<ImageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  async function load() {
    try {
      setLoading(true)

      const response = await fetch(
        "/api/admin/site-images",
        { cache: "no-store" }
      )

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()
      setRecords(Array.isArray(data) ? data : [])
    } catch {
      setMessage("تعذر تحميل صور الموقع")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const recordMap = useMemo(() => {
    const map = new Map<string, ImageRecord>()

    for (const item of records) {
      map.set(
        `${item.page}:${item.slot}`,
        item
      )
    }

    return map
  }, [records])

  async function uploadImage(
    section: Section,
    slot: number,
    file: File
  ) {
    const key = `${section.key}:${slot}`

    try {
      setUploading(key)
      setMessage("")

      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", "image")

      const uploadResponse = await fetch(
        "/api/admin/maids/upload",
        {
          method: "POST",
          body: formData,
        }
      )

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok || !uploadData.fileId) {
        throw new Error(
          uploadData.error || "فشل رفع الصورة"
        )
      }

      const saveResponse = await fetch(
        "/api/admin/site-images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: section.key,
            slot,
            fileId: uploadData.fileId,
            originalName: file.name,
          }),
        }
      )

      const saveData = await saveResponse.json()

      if (!saveResponse.ok) {
        throw new Error(
          saveData.error || "فشل حفظ الصورة"
        )
      }

      setMessage(
        `✅ تم تحديث صورة ${section.title} رقم ${slot}`
      )

      await load()
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء رفع الصورة"
      )
    } finally {
      setUploading(null)
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F7F9FC] px-5 py-10 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#1257D6]">
            Maidora Admin
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-900">
            صور الموقع
          </h1>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            ارفع أو استبدل صور الموقع من مكان واحد.
            كل خانة مرتبطة بصورة واحدة في الموقع.
          </p>

          {message && (
            <div className="mt-5 rounded-2xl bg-[#F3F8FD] px-4 py-3 text-sm font-bold text-[#397EA9]">
              {message}
            </div>
          )}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center font-bold text-slate-400">
            جاري تحميل الصور...
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <section
                key={section.key}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      {section.title}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-400">
                      {section.count} صور
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from(
                    { length: section.count },
                    (_, index) => {
                      const slot = index + 1
                      const record = recordMap.get(
                        `${section.key}:${slot}`
                      )
                      const key = `${section.key}:${slot}`

                      return (
                        <div
                          key={key}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                        >
                          <div className="aspect-[4/3] bg-slate-100">
                            {record ? (
                              <img
                                src={`/api/maids/media?id=${encodeURIComponent(record.fileId)}`}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-4xl text-slate-300">
                                🖼️
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <div className="mb-3 text-sm font-black text-slate-700">
                              صورة {slot}
                            </div>

                            {record && (
                              <p className="mb-3 truncate text-xs font-semibold text-slate-400">
                                {record.originalName}
                              </p>
                            )}

                            <label className="flex cursor-pointer items-center justify-center rounded-xl bg-[#1257D6] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0F4DBF]">
                              {uploading === key
                                ? "جاري الرفع..."
                                : record
                                  ? "استبدال الصورة"
                                  : "رفع صورة"}

                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                disabled={uploading !== null}
                                onChange={(event) => {
                                  const file =
                                    event.target.files?.[0]

                                  if (file) {
                                    uploadImage(
                                      section,
                                      slot,
                                      file
                                    )
                                  }

                                  event.currentTarget.value = ""
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
