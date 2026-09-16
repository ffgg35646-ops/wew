import { requireAdmin } from "@/lib/admin-auth"
import LicenseAdminClient from "./LicenseAdminClient"

export default async function EconomicLicenseAdminPage() {
  await requireAdmin()

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F7F9FC] px-5 py-10"
    >
      <div className="mx-auto max-w-5xl">
        <a
          href="/admin"
          className="text-sm font-bold text-[#1257D6]"
        >
          ← العودة للوحة التحكم
        </a>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold text-[#1257D6]">
            ترخيص دائرة التنمية الاقتصادية
          </p>

          <h1 className="mt-2 text-2xl font-black text-slate-900">
            إدارة ترخيص دائرة التنمية الاقتصادية
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            ارفع ملفًا مستقلًا للعرض وملفًا مستقلًا للتحميل،
            وتحكم في ظهورهما عند المستخدم.
          </p>

          <LicenseAdminClient />
        </div>
      </div>
    </main>
  )
}
