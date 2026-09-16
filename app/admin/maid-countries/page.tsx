import Link from "next/link"
import { requireAdmin } from "@/lib/admin-auth"

export default async function MaidCountriesAdminPage() {
  await requireAdmin()

  return (
    <main dir="rtl" className="min-h-screen bg-[#F7F9FC] px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin"
          className="text-sm font-bold text-[#1257D6]"
        >
          ← العودة للوحة التحكم
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">
            بلدان العاملات
          </h1>

          <p className="mt-3 text-slate-500">
            من هنا ندير البلدان والعاملات التابعة لكل بلد.
          </p>

          <div className="mt-8">
            <Link
              href="/admin/maids"
              className="inline-flex rounded-2xl bg-[#1257D6] px-6 py-4 text-sm font-black text-white"
            >
              إدارة العاملات ←
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
