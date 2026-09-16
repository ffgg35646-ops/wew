"use client"

import { ChangeEvent, useEffect, useState } from "react"

type Language = {
  name: string
  level: string
}

type Maid = {
  id: string
  name: string
  age: string
  nationality: string
  country: string
  experience: string
  languages: Language[]
  skills: string[]
  workType: string
  description: string
  imageIds: string[]
  imageNames: string[]
  videoId: string | null
  videoName: string | null
  active: boolean
}

const emptyForm = {
  name: "",
  age: "",
  nationality: "",
  country: "",
  experience: "",
  languagesText: "",
  skillsText: "",
  workType: "",
  description: "",
  imageIds: [] as string[],
  imageNames: [] as string[],
  videoId: null as string | null,
  videoName: null as string | null,
  active: true,
}

export default function MaidsAdminClient() {
  const [maids, setMaids] = useState<Maid[]>([])
  const [selected, setSelected] = useState<Maid | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  async function loadMaids() {
    setLoading(true)

    try {
      const response = await fetch(
        "/api/admin/maids",
        { cache: "no-store" }
      )

      if (!response.ok) throw new Error()

      const data = await response.json()
      setMaids(data)
    } catch {
      setMessage("تعذر تحميل العاملات")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMaids()
  }, [])

  function startCreate() {
    setEditingId(null)
    setSelected(null)
    setForm({ ...emptyForm })
    setMessage("")
    setFormOpen(true)
  }

  function startEdit(maid: Maid) {
    setEditingId(maid.id)
    setSelected(maid)

    setForm({
      name: maid.name,
      age: maid.age ?? "",
      nationality: maid.nationality,
      country: maid.country,
      experience: maid.experience,
      languagesText: maid.languages
        .map(
          (language) =>
            `${language.name} — ${language.level}`
        )
        .join("\n"),
      skillsText: maid.skills.join("\n"),
      workType: maid.workType,
      description: maid.description,
      imageIds: maid.imageIds,
      imageNames: maid.imageNames,
      videoId: maid.videoId,
      videoName: maid.videoName,
      active: maid.active,
    })

    setMessage("")
    setFormOpen(true)
  }

  function showDetails(maid: Maid) {
    setSelected(maid)
  }

  async function uploadFile(
    file: File,
    type: "image" | "video"
  ) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)

    const response = await fetch(
      "/api/admin/maids/upload",
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.error || "فشل رفع الملف"
      )
    }

    return data
  }

  async function handleImages(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files || []
    )

    if (!files.length) return

    setMessage("جاري رفع الصور...")

    try {
      const uploadedIds: string[] = []
      const uploadedNames: string[] = []

      for (const file of files) {
        const result = await uploadFile(file, "image")
        uploadedIds.push(result.fileId)
        uploadedNames.push(result.fileName)
      }

      setForm((current) => ({
        ...current,
        imageIds: [
          ...current.imageIds,
          ...uploadedIds,
        ],
        imageNames: [
          ...current.imageNames,
          ...uploadedNames,
        ],
      }))

      setMessage("تم رفع الصور")
      event.target.value = ""
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "فشل رفع الصور"
      )
    }
  }

  async function handleVideo(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    if (!file) return

    setMessage("جاري رفع الفيديو...")

    try {
      const result = await uploadFile(file, "video")

      setForm((current) => ({
        ...current,
        videoId: result.fileId,
        videoName: result.fileName,
      }))

      setMessage("تم رفع الفيديو")
      event.target.value = ""
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "فشل رفع الفيديو"
      )
    }
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setMessage("اكتب اسم العاملة أولًا")
      return
    }

    setSaving(true)
    setMessage("")

    try {
      const languages: Language[] = form.languagesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const parts = line.split("—")
          return {
            name: parts[0]?.trim() || "",
            level: parts.slice(1).join("—").trim(),
          }
        })

      const skills = form.skillsText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)

      const payload = {
        ...(editingId ? { id: editingId } : {}),
        name: form.name,
        age: form.age,
        nationality: form.nationality,
        country: form.country,
        experience: form.experience,
        languages,
        skills,
        workType: form.workType,
        description: form.description,
        imageIds: form.imageIds,
        imageNames: form.imageNames,
        videoId: form.videoId,
        videoName: form.videoName,
        active: form.active,
      }

      const response = await fetch(
        "/api/admin/maids",
        {
          method: editingId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || "فشل حفظ العاملة"
        )
      }

      setMessage(
        editingId
          ? "تم تعديل بيانات العاملة"
          : "تمت إضافة العاملة"
      )

      await loadMaids()

      const newMaid = data.maid

      if (newMaid) {
        setSelected(newMaid)
      }

      setFormOpen(false)
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء الحفظ"
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(maid: Maid) {
    if (
      !window.confirm(
        `هل تريد حذف العاملة "${maid.name}"؟`
      )
    ) {
      return
    }

    try {
      const response = await fetch(
        "/api/admin/maids",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: maid.id,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || "فشل الحذف"
        )
      }

      setSelected(null)
      setEditingId(null)
      setForm({ ...emptyForm })
      setFormOpen(false)
      setMessage("تم حذف العاملة")
      await loadMaids()
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "فشل حذف العاملة"
      )
    }
  }

  return (
    <div className="mt-8">
      {message && (
        <div className="mb-5 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-[#1257D6]">
          {message}
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            قائمة العاملات
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            اضغط على أي عاملة لعرض التفاصيل الكاملة.
          </p>
        </div>

        <button
          type="button"
          onClick={startCreate}
          className="rounded-xl bg-[#1257D6] px-5 py-3 text-sm font-black text-white"
        >
          + إضافة عاملة
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          {loading ? (
            <div className="p-6 text-center text-sm font-bold text-slate-500">
              جاري تحميل العاملات...
            </div>
          ) : maids.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-lg font-black text-slate-800">
                لا توجد عاملات حاليًا
              </div>

              <p className="mt-2 text-sm text-slate-500">
                اضغط على «إضافة عاملة» لإضافة أول عاملة.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {maids.map((maid) => (
                <button
                  key={maid.id}
                  type="button"
                  onClick={() => showDetails(maid)}
                  className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 p-3 text-right transition hover:border-[#1257D6]/30 hover:bg-[#1257D6]/[0.03]"
                >
                  {maid.imageIds[0] ? (
                    <img
                      src={`/api/admin/maids/media?id=${maid.imageIds[0]}`}
                      alt={maid.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 text-xl">
                      👩
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="truncate font-black text-slate-900">
                      {maid.name}
                    </div>

                    <div className="mt-1 text-xs font-semibold text-slate-500">
                      {maid.nationality || "بدون جنسية"}
                      {maid.experience
                        ? ` • ${maid.experience}`
                        : ""}
                    </div>

                    <div className="mt-1 text-xs font-bold">
                      {maid.active ? (
                        <span className="text-emerald-600">
                          مفعلة
                        </span>
                      ) : (
                        <span className="text-red-500">
                          مخفية
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-lg text-[#1257D6]">
                    ←
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          {!formOpen && !selected ? (
            <div className="py-14 text-center">
              <div className="text-xl font-black text-slate-800">
                إضافة عاملة جديدة
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                أضف الاسم والجنسية والخبرة واللغات والصور والفيديو
                وباقي التفاصيل.
              </p>

              <button
                type="button"
                onClick={startCreate}
                className="mt-6 rounded-xl bg-[#1257D6] px-6 py-3 text-sm font-black text-white"
              >
                بدء الإضافة
              </button>
            </div>
          ) : selected && !formOpen ? (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#1257D6]">
                    تفاصيل العاملة
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    {selected.name}
                  </h2>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(selected)}
                    className="rounded-xl bg-[#1257D6] px-4 py-2 text-sm font-bold text-white"
                  >
                    تعديل
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(selected)}
                    className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600"
                  >
                    حذف
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Info label="الاسم" value={selected.name} />
                <Info label="العمر" value={selected.age || "غير محدد"} />
                <Info label="الجنسية" value={selected.nationality} />
                <Info label="البلد" value={selected.country} />
                <Info label="الخبرة" value={selected.experience} />
                <Info label="نوع العمل" value={selected.workType} />
                <Info
                  label="الحالة"
                  value={selected.active ? "مفعلة" : "مخفية"}
                />
              </div>

              <div className="mt-6">
                <h3 className="font-black text-slate-900">
                  اللغات
                </h3>

                <div className="mt-3 space-y-2">
                  {selected.languages.length ? (
                    selected.languages.map(
                      (language, index) => (
                        <div
                          key={`${language.name}-${index}`}
                          className="rounded-xl bg-slate-50 p-3 text-sm"
                        >
                          <strong>{language.name}</strong>
                          {language.level
                            ? ` — ${language.level}`
                            : ""}
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-sm text-slate-500">
                      لا توجد لغات مضافة.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-black text-slate-900">
                  المهارات
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.skills.length ? (
                    selected.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#1257D6]/10 px-3 py-2 text-xs font-bold text-[#1257D6]"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <div className="text-sm text-slate-500">
                      لا توجد مهارات مضافة.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-black text-slate-900">
                  الوصف
                </h3>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-8 text-slate-500">
                  {selected.description ||
                    "لا يوجد وصف."}
                </p>
              </div>

              {selected.imageIds.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-black text-slate-900">
                    الصور
                  </h3>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {selected.imageIds.map(
                      (imageId) => (
                        <img
                          key={imageId}
                          src={`/api/admin/maids/media?id=${imageId}`}
                          alt={selected.name}
                          className="h-36 w-full rounded-2xl object-cover"
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {selected.videoId && (
                <div className="mt-6">
                  <h3 className="font-black text-slate-900">
                    الفيديو
                  </h3>

                  <video
                    controls
                    preload="metadata"
                    playsInline
                    className="mt-3 w-full max-h-[500px] rounded-2xl bg-black"
                  >
                    <source
                      src={`/api/admin/maids/media?id=${selected.videoId}`}
                      type="video/mp4"
                    />
                    المتصفح لا يدعم تشغيل الفيديو.
                  </video>
                </div>
              )}
            </div>
          ) : (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
              <div
                className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl sm:p-8"
                dir="rtl"
              >
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false)
                    setEditingId(null)
                    setForm({ ...emptyForm })
                  }}
                  className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl font-black text-slate-600 hover:bg-slate-200"
                  aria-label="إغلاق"
                >
                  ×
                </button>

                <div className="mb-6 pl-12">
                <p className="text-sm font-bold text-[#1257D6]">
                  {editingId
                    ? "تعديل بيانات العاملة"
                    : "إضافة عاملة جديدة"}
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  بيانات العاملة
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="اسم العاملة"
                  value={form.name}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      name: value,
                    })
                  }
                />

                <Field
                  label="العمر"
                  placeholder="مثال: 28 سنة"
                  value={form.age}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      age: value,
                    })
                  }
                />

                <Field
                  label="الجنسية"
                  value={form.nationality}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      nationality: value,
                    })
                }
                />

                <Field
                  label="البلد"
                  value={form.country}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      country: value,
                    })
                  }
                />

                <Field
                  label="الخبرة"
                  placeholder="مثال: 5 سنوات"
                  value={form.experience}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      experience: value,
                    })
                  }
                />

                <Field
                  label="نوع العمل"
                  placeholder="مثال: مقيمة / غير مقيمة"
                  value={form.workType}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      workType: value,
                    })
                  }
                />

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        active: event.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-[#1257D6]"
                  />

                  <div>
                    <div className="text-sm font-black">
                      ظهور العاملة للمستخدم
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      عند إلغاء التفعيل لن تظهر للمستخدم.
                    </div>
                  </div>
                </div>
              </div>

              <TextArea
                label="اللغات"
                placeholder={"العربي — مبتدئ\nEnglish — جيد جدًا"}
                value={form.languagesText}
                onChange={(value) =>
                  setForm({
                    ...form,
                    languagesText: value,
                  })
                }
              />

              <TextArea
                label="المهارات"
                placeholder={"تنظيف\nطبخ\nرعاية أطفال"}
                value={form.skillsText}
                onChange={(value) =>
                  setForm({
                    ...form,
                    skillsText: value,
                  })
                }
              />

              <TextArea
                label="الوصف"
                placeholder="اكتب تفاصيل العاملة وخبرتها..."
                value={form.description}
                onChange={(value) =>
                  setForm({
                    ...form,
                    description: value,
                  })
                }
              />

              <div className="mt-5">
                <label className="mb-2 block text-sm font-black">
                  صور العاملة
                </label>

                <label className="relative inline-flex cursor-pointer items-center rounded-xl bg-[#1257D6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f4dbd]">
                  <span>رفع الصور</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleImages}
                  />
                </label>

                {form.imageNames.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {form.imageIds.map(
                      (id, index) => (
                        <div key={id}>
                          <img
                            src={`/api/admin/maids/media?id=${id}`}
                            alt=""
                            className="h-28 w-full rounded-xl object-cover"
                          />

                          <div className="mt-1 truncate text-[10px] text-slate-500">
                            {form.imageNames[index]}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-black">
                  فيديو العاملة
                </label>

                <label className="relative inline-flex cursor-pointer items-center rounded-xl bg-[#1257D6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f4dbd]">
                  <span>رفع الفيديو</span>
                  <input
                    type="file"
                    accept="*/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleVideo}
                  />
                </label>

                {form.videoName && (
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-600">
                    {form.videoName}
                  </div>
                )}

                {form.videoId && (
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    className="mt-3 w-full max-h-80 rounded-2xl bg-black"
                  >
                    <source
                      src={`/api/admin/maids/media?id=${form.videoId}`}
                      type="video/mp4"
                    />
                    المتصفح لا يدعم تشغيل الفيديو.
                  </video>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSave}
                  className="rounded-xl bg-[#1257D6] px-7 py-3.5 text-sm font-black text-white disabled:opacity-50"
                >
                  {saving
                    ? "جاري الحفظ..."
                    : editingId
                    ? "حفظ التعديلات"
                    : "إضافة العاملة"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false)
                    setEditingId(null)
                    setSelected(null)
                    setForm({ ...emptyForm })
                  }}
                  className="rounded-xl border border-slate-200 px-7 py-3.5 text-sm font-black text-slate-600"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-800">
        {label}
      </label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1257D6]"
      />
    </div>
  )
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="mt-5">
      <label className="mb-2 block text-sm font-black text-slate-800">
        {label}
      </label>

      <textarea
        rows={5}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none focus:border-[#1257D6]"
      />
    </div>
  )
}

function Info({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs font-bold text-slate-400">
        {label}
      </div>

      <div className="mt-1 font-black text-slate-900">
        {value || "—"}
      </div>
    </div>
  )
}
