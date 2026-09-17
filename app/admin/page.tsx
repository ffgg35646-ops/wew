import Link from "next/link"
import { requireAdmin } from "@/lib/admin-auth"

const sections = [
  {
    title: "توظيف عاملة",
    description: "إضافة وتعديل العاملات وبياناتهن وصورهن وفيديوهاتهن.",
    href: "/admin/maids",
    icon: "👩🏻",
  },
  {
    title: "بيانات الاتصال",
    description: "إدارة أرقام الهاتف وواتساب وبيانات التواصل الظاهرة في الموقع.",
    href: "/admin/contact",
    icon: "📞",
  },
  {
    title: "ترخيص دائرة التنمية الاقتصادية",
    description: "التحكم في ملف الترخيص والعرض والتحميل.",
    href: "/admin/economic-license",
    icon: "📄",
  },
  {
    title: "صور الموقع",
    description: "رفع واستبدال صور صفحات الموقع من مكان واحد.",
    href: "/admin/site-images",
    icon: "🖼️",
  },
]


export default async function AdminDashboard() {
  const admin = await requireAdmin()

  return (
    <main dir="rtl" className="min-h-screen bg-[#F7F9FC] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-[#1257D6]">
              Maidora Admin
            </p>

            <h1 className="mt-1 text-3xl font-black text-slate-900">
              لوحة التحكم
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              مرحبًا، {admin.email}
            </p>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
            >
              تسجيل الخروج
            </button>
          </form>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1257D6]/10 text-2xl">
                {section.icon}
              </div>

              <h2 className="text-lg font-extrabold text-slate-900 transition group-hover:text-[#1257D6]">
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {section.description}
              </p>

              <div className="mt-6 text-sm font-bold text-[#1257D6]">
                فتح القسم ←
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
