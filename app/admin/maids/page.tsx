import { requireAdmin } from "@/lib/admin-auth"
import MaidsAdminClient from "./MaidsAdminClient"

export default async function MaidsAdminPage() {
  await requireAdmin()

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F7F9FC] px-5 py-10 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <a
          href="/admin"
          className="text-sm font-bold text-[#1257D6]"
        >
          ← العودة للوحة التحكم
        </a>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div>
            <p className="text-sm font-bold text-[#1257D6]">
              إدارة العاملات
            </p>

            <h1 className="mt-1 text-3xl font-black text-slate-900">
              العاملات
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
              أضف العاملات وتحكم في الاسم والجنسية والخبرة واللغات
              والمهارات والصور والفيديو والحالة الظاهرة للمستخدم.
            </p>
          </div>

          <MaidsAdminClient />
        </div>
      </div>
    </main>
  )
}
