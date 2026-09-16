import { requireAdmin } from "@/lib/admin-auth"

export default async function MaidVisasAdminPage() {
  await requireAdmin()

  return (
    <main dir="rtl" className="min-h-screen bg-[#F7F9FC] px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <a href="/admin" className="text-sm font-bold text-[#1257D6]">
          ← العودة للوحة التحكم
        </a>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">
            تأشيرات العاملات
          </h1>
          <p className="mt-3 text-slate-500">
            القسم جاهز للربط بالبيانات.
          </p>
        </div>
      </div>
    </main>
  )
}
