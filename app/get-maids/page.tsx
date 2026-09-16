 "use client"

import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { useEffect, useMemo, useState } from "react"
import Footer from "@/components/Footer"

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
  videoId: string | null
  active?: boolean
}

function getNationalityFlag(value: string) {
  const name = value.trim().toLowerCase()

  const flags: Record<string, string> = {
    "مصر": "🇪🇬",
    "مصرية": "🇪🇬",
    "egypt": "🇪🇬",
    "egyptian": "🇪🇬",

    "الفلبين": "🇵🇭",
    "فلبين": "🇵🇭",
    "فلبينية": "🇵🇭",
    "philippines": "🇵🇭",
    "filipino": "🇵🇭",
    "filipina": "🇵🇭",

    "إندونيسيا": "🇮🇩",
    "إندونيسية": "🇮🇩",
    "indonesia": "🇮🇩",
    "indonesian": "🇮🇩",

    "الهند": "🇮🇳",
    "هندية": "🇮🇳",
    "india": "🇮🇳",
    "indian": "🇮🇳",

    "نيبال": "🇳🇵",
    "نيبالية": "🇳🇵",
    "nepal": "🇳🇵",
    "nepalese": "🇳🇵",

    "سريلانكا": "🇱🇰",
    "سريلانكية": "🇱🇰",
    "sri lanka": "🇱🇰",
    "srilanka": "🇱🇰",

    "بنغلاديش": "🇧🇩",
    "بنغلاديشية": "🇧🇩",
    "bangladesh": "🇧🇩",
    "bangladeshi": "🇧🇩",

    "إثيوبيا": "🇪🇹",
    "إثيوبية": "🇪🇹",
    "ethiopia": "🇪🇹",
    "ethiopian": "🇪🇹",

    "كينيا": "🇰🇪",
    "كينية": "🇰🇪",
    "kenya": "🇰🇪",
    "kenyan": "🇰🇪",
  }

  return flags[name] ?? "🌍"
}



const heroBenefits = [
  "اختيار حسب الجنسية والخبرة والمهارات",
  "ملفات وصور وفيديوهات حسب بيانات الإدارة",
  "دوام كامل أو جزئي حسب الاحتياج",
  "متابعة واضحة من الاختيار حتى بدء الخدمة",
]

const nationalities = [
  { name: "الفلبين", code: "ph" },
  { name: "إثيوبيا", code: "et" },
  { name: "إندونيسيا", code: "id" },
]

const benefits = [
  [
    "01",
    "مساعدة منزلية مناسبة",
    "نساعدك في الوصول إلى عاملة تناسب طبيعة منزلك والمهام التي تحتاجها.",
  ],
  [
    "02",
    "رعاية الأطفال",
    "اختر من الملفات التي تتضمن خبرات ومهارات مرتبطة برعاية الأطفال عند توفرها.",
  ],
  [
    "03",
    "تنظيم أفضل للمنزل",
    "عاملات بمهارات مختلفة في التنظيف والترتيب والطبخ والمهام اليومية.",
  ],
  [
    "04",
    "خيارات مرنة",
    "يمكنك المقارنة بين العاملات وفق الجنسية والخبرة ونوع العمل والمهارات.",
  ],
]

const fullTimePoints = [
  "خيارات مناسبة للعائلات التي تحتاج دعماً يومياً مستمراً.",
  "عاملات بمهارات وخبرات مختلفة حسب البيانات المتاحة.",
  "اختيار المرشحة بعد مراجعة الملف والتفاصيل.",
  "إمكانية الانتقال بعد ذلك إلى إجراءات التأشيرة حسب الحالة.",
]

const partTimePoints = [
  "مناسب لمن يحتاج خدمة منزلية بعدد ساعات أو أيام محددة.",
  "اختيارات بحسب نوع العمل والمهارات المتاحة في الملفات.",
  "مقارنة أسهل بين العاملات قبل اتخاذ القرار.",
  "مرونة أكبر للعائلات ذات الاحتياجات المحددة.",
]

const residentPoints = [
  "خيارات لمن يحتاج عاملة تعيش داخل المنزل حسب النظام المناسب.",
  "عرض الخبرة والمهارات واللغة في الملف.",
  "إمكانية مقارنة أكثر من مرشحة قبل الاختيار.",
  "متابعة الإجراءات المطلوبة بعد اختيار العاملة.",
]

const steps = [
  [
    "01",
    "أخبرنا باحتياجك",
    "حدد نوع الخدمة والمهارات وطبيعة العمل التي تبحث عنها.",
  ],
  [
    "02",
    "استعرض الملفات",
    "شاهد العاملات المتاحة وقارن الجنسية والخبرة والمهارات.",
  ],
  [
    "03",
    "اختر المناسبة",
    "افتح الملف الكامل وراجع الصور والفيديو والوصف والتفاصيل.",
  ],
  [
    "04",
    "ابدأ الإجراءات",
    "بعد اختيار العاملة ننتقل معك إلى الخطوات والإجراءات المناسبة.",
  ],
]

const faqs = [
  [
    "كيف أختار العاملة المناسبة؟",
    "ابدأ بتحديد نوع العمل والجنسية والخبرة والمهارات المطلوبة، ثم افتح ملفات العاملات وقارن التفاصيل المتاحة.",
  ],
  [
    "هل يمكنني اختيار الجنسية؟",
    "نعم، يمكنك تصفية النتائج حسب الجنسيات المتاحة في قاعدة البيانات ومراجعة الملفات المرتبطة بكل جنسية.",
  ],
  [
    "هل يوجد دوام كامل ودوام جزئي؟",
    "يعتمد ذلك على البيانات التي تضيفها الإدارة، ويمكنك استخدام فلتر نوع العمل للوصول إلى الخيارات المتاحة.",
  ],
  [
    "هل يمكنني مشاهدة صور أو فيديو للعاملة؟",
    "نعم، عندما تكون الصور أو الفيديوهات مضافة إلى ملف العاملة، تظهر داخل صفحة التفاصيل.",
  ],
  [
    "ماذا يحدث بعد اختيار العاملة؟",
    "تواصل معنا بخصوص الملف المختار، ثم نساعدك في معرفة الإجراءات والخطوات المناسبة للحالة.",
  ],
]

export default function GetMaidsPage() {
  const [maids, setMaids] = useState<Maid[]>([])
  const [selected, setSelected] = useState<Maid | null>(null)
  const [contact, setContact] = useState({ whatsapp: "", phone: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [nationalityFilter, setNationalityFilter] = useState("")
  const [workTypeFilter, setWorkTypeFilter] = useState("")
  const [skillFilter, setSkillFilter] = useState("")

  useEffect(() => {
    async function loadMaids() {
      try {
        setLoading(true)

        const response = await fetch("/api/maids", {
          cache: "no-store",
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "تعذر تحميل العاملات")
        }

        setMaids(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("GET_MAIDS_LOAD_ERROR", err)
        setMaids([])
        setError("")
      } finally {
        setLoading(false)
      }
    }

    loadMaids()
  }, [])
  useEffect(() => {
    fetch("/api/contact", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (data) {
          setContact({
            whatsapp: data.whatsapp ?? "",
            phone: data.phone ?? "",
          })
        }
      })
      .catch(() => {})
  }, [])


  const nationalityOptions = useMemo(
    () =>
      Array.from(
        new Set(
          maids
            .map((maid) => maid.nationality)
            .filter(Boolean)
        )
      ),
    [maids]
  )

  const workTypeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          maids
            .map((maid) => maid.workType)
            .filter(Boolean)
        )
      ),
    [maids]
  )

  const skillOptions = useMemo(
    () =>
      Array.from(
        new Set(
          maids
            .flatMap((maid) => maid.skills || [])
            .filter(Boolean)
        )
      ).slice(0, 20),
    [maids]
  )

  const filteredMaids = useMemo(() => {
    const query = search.trim().toLowerCase()

    return maids.filter((maid) => {
      const text = [
        maid.name,
        maid.nationality,
        maid.country,
        maid.experience,
        maid.workType,
        maid.description,
        ...(maid.skills || []),
      ]
        .join(" ")
        .toLowerCase()

      const searchMatch = !query || text.includes(query)

      const nationalityMatch =
        !nationalityFilter ||
        maid.nationality === nationalityFilter

      const workTypeMatch =
        !workTypeFilter ||
        maid.workType === workTypeFilter

      const skillMatch =
        !skillFilter ||
        (maid.skills || []).includes(skillFilter)

      return (
        searchMatch &&
        nationalityMatch &&
        workTypeMatch &&
        skillMatch
      )
    })
  }, [
    maids,
    search,
    nationalityFilter,
    workTypeFilter,
    skillFilter,
  ])

  const clearFilters = () => {
    setSearch("")
    setNationalityFilter("")
    setWorkTypeFilter("")
    setSkillFilter("")
  }

  return (
    <main
      dir="rtl"
      className="maids-page min-h-screen overflow-hidden bg-[#F6F9FD] text-[#172033]"
    >
      <Navbar />

      {/* =====================================================
          MODERN HERO + FILTER
          ===================================================== */}
      <section className="maids-modern-top -mt-6 md:-mt-8">


        <div className="relative z-10 mx-auto max-w-[1320px] px-5 pb-[140px] pt-0 md:px-8 md:pb-[160px] md:pt-0">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">

            {/* LEFT — FILTER */}
            <div className="order-2 rounded-[30px] border border-[#DDE6F0] bg-white p-6 shadow-[0_22px_60px_rgba(18,87,214,.07)] md:p-8 lg:order-1">

              <div className="mb-7">
                <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
                  SMART FILTER
                </div>

                <h2 className="mt-2 text-2xl font-black text-[#172033] md:text-3xl">
                  صفّي العاملات حسب احتياجك
                </h2>

                <p className="mt-2 text-[11px] font-semibold leading-7 text-slate-500">
                  استخدم الخانات بالترتيب للوصول إلى الخيارات المناسبة.
                </p>
              </div>

              <div className="space-y-4">

                <div>
                  <label className="mb-2 block text-[11px] font-black text-[#172033]">
                    البحث
                  </label>

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="اكتب اسم العاملة أو الجنسية أو المهارة..."
                    className="h-13 w-full rounded-[16px] border border-[#DDE5EF] bg-[#F9FBFD] px-4 text-[12px] font-semibold outline-none transition focus:border-[#1257D6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-black text-[#172033]">
                    اختر الجنسية المتاحة
                  </label>

                  <select
                    value={nationalityFilter}
                    onChange={(event) =>
                      setNationalityFilter(event.target.value)
                    }
                    className="h-13 w-full rounded-[16px] border border-[#DDE5EF] bg-[#F9FBFD] px-4 text-[12px] font-bold outline-none transition focus:border-[#1257D6] focus:bg-white"
                  >
                    <option value="">جميع الجنسيات المتاحة</option>

                    {nationalityOptions.map((nationality) => (
                      <option
                        key={nationality}
                        value={nationality}
                      >
                        {nationality}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-black text-[#172033]">
                    نوع العمل
                  </label>

                  <select
                    value={workTypeFilter}
                    onChange={(event) =>
                      setWorkTypeFilter(event.target.value)
                    }
                    className="h-13 w-full rounded-[16px] border border-[#DDE5EF] bg-[#F9FBFD] px-4 text-[12px] font-bold outline-none transition focus:border-[#1257D6] focus:bg-white"
                  >
                    <option value="">كل أنواع العمل</option>

                    {workTypeOptions.map((workType) => (
                      <option
                        key={workType}
                        value={workType}
                      >
                        {workType}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-black text-[#172033]">
                    المهارة
                  </label>

                  <select
                    value={skillFilter}
                    onChange={(event) =>
                      setSkillFilter(event.target.value)
                    }
                    className="h-13 w-full rounded-[16px] border border-[#DDE5EF] bg-[#F9FBFD] px-4 text-[12px] font-bold outline-none transition focus:border-[#1257D6] focus:bg-white"
                  >
                    <option value="">كل المهارات</option>

                    {skillOptions.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">

                  <div className="rounded-full bg-[#1257D6]/10 px-4 py-2 text-[10px] font-black text-[#1257D6]">
                    {filteredMaids.length} عاملة
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-[14px] bg-[#172033] px-5 py-3 text-[10px] font-black text-white transition hover:bg-[#0D1524]"
                  >
                    مسح الاختيارات
                  </button>

                </div>

              </div>
            </div>

            {/* RIGHT — HERO / CONTACT */}
            <div className="maids-contact-card relative order-1 overflow-hidden rounded-[34px] bg-[#1257D6] p-8 text-white shadow-[0_30px_80px_rgba(18,87,214,.18)] md:p-10 lg:order-2">

              <div className="pointer-events-none absolute -right-28 -top-28 h-[380px] w-[380px] rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-[#57D8FF]/15 blur-3xl" />

              <div className="relative z-10 flex h-full flex-col justify-start">

                <div>

                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black tracking-[2px] text-[#F6B56F] backdrop-blur-md">
                    AL SAADA · HIRE MAIDS
                  </div>

                  <h1 className="mt-6 text-[42px] font-black leading-[1.13] tracking-[-1.8px] md:text-[58px]">
                    وظّف عاملة
                    <br />
                    <span className="text-white">
                      المناسبة لمنزلك.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-[560px] text-[13px] font-semibold leading-8 text-white/68 md:text-[14px]">
                    استعرض العاملات المتاحات واختر الجنسية والخبرة ونوع العمل
                    والمهارات التي تناسب احتياجات منزلك.
                  </p>

                </div>

                <div className="mt-8 rounded-[22px] border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                  <div className="mb-3 text-[10px] font-black tracking-[2px] text-[#F6B56F]">
                    اختر جنسية عاملتك المفضلة
                  </div>

                  <select
                    value={nationalityFilter}
                    onChange={(event) =>
                      setNationalityFilter(event.target.value)
                    }
                    className="h-14 w-full rounded-[16px] border border-white/20 bg-white px-4 text-[12px] font-black text-[#172033] outline-none"
                  >
                    <option value="">جميع الجنسيات المتاحة</option>

                    {nationalityOptions.map((nationality) => (
                      <option
                        key={nationality}
                        value={nationality}
                      >
                        {nationality}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="mt-7">

                  <div className="mb-4 text-[10px] font-black tracking-[2px] text-[#F6B56F]">
                    تواصل معنا
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">

                    <a
                      href="#contact"
                      className="flex min-h-[64px] items-center gap-3 rounded-[18px] border border-white/15 bg-white/10 px-5 backdrop-blur-md transition hover:bg-white/15"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#25D366] text-sm font-black text-white">
                        W
                      </span>

                      <span>
                        <strong className="block text-[12px] font-black">
                          WhatsApp
                        </strong>

                        <small className="mt-1 block text-[9px] font-semibold text-white/50">
                          تواصل سريع معنا
                        </small>
                      </span>
                    </a>

                    <a
                      href="#contact"
                      className="flex min-h-[64px] items-center gap-3 rounded-[18px] border border-white/15 bg-white/10 px-5 backdrop-blur-md transition hover:bg-white/15"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#F28C28] text-sm font-black text-white">
                        ☎
                      </span>

                      <span>
                        <strong className="block text-[12px] font-black">
                          اتصل بنا
                        </strong>

                        <small className="mt-1 block text-[9px] font-semibold text-white/50">
                          تحدث مع فريقنا
                        </small>
                      </span>
                    </a>

                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          HIRE MAIDS
          ===================================================== */}
      <section className="maids-soft-waves relative mx-auto w-[calc(100%_-_32px)] max-w-[1320px] overflow-hidden rounded-[32px] px-5 py-6 md:px-8 md:py-8">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -left-[12%] top-[2%] h-[280px] w-[68%] rounded-[50%] bg-[#D8EEFF]/70 blur-[50px]" />
          <div className="absolute -right-[12%] top-[25%] h-[300px] w-[62%] rounded-[50%] bg-[#C5E4FA]/65 blur-[55px]" />
          <div className="absolute left-[18%] bottom-[-110px] h-[270px] w-[58%] rounded-[50%] bg-[#E6F5FF]/80 blur-[55px]" />
        </div>

        <div className="relative z-10 w-full">
          {loading && (
            <div className="rounded-[30px] border border-[#DEE6F0] bg-white p-14 text-center shadow-sm">
              <div className="text-xl font-black">
                جاري تحميل العاملات...
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-400">
                يتم جلب البيانات من قاعدة البيانات.
              </p>
            </div>
          )}

          {!loading && !error && filteredMaids.length === 0 && (
            <div className="rounded-[30px] border border-[#DEE6F0] bg-white p-14 text-center">
              <div className="text-xl font-black">
                لا توجد عاملات متاحة حاليًا
              </div>

              <p className="mt-3 text-sm font-semibold leading-7 text-slate-400">
                سيتم عرض العاملات هنا تلقائيًا بمجرد أن يضيفها الأدمن ويجعلها متاحة.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-[14px] bg-[#1257D6] px-6 py-3 text-[12px] font-black text-white"
              >
                عرض الكل
              </button>
            </div>
          )}

          {!loading && filteredMaids.length > 0 && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center rounded-full border border-[#A9D5F2]/70 bg-[#E6F5FF]/80 px-7 py-3 shadow-[0_8px_26px_rgba(70,120,170,.10)] backdrop-blur-xl">
                  <h2 className="text-[18px] font-black text-[#1768A8] md:text-[21px]">
                    العاملات المتاحة
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMaids.map((maid) => (
                  <button
                    key={maid.id}
                    type="button"
                    onClick={() => setSelected(maid)}
                    className="group overflow-hidden rounded-[28px] border border-[#DEE6F0] bg-white text-right shadow-[0_14px_40px_rgba(18,87,214,.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(18,87,214,.10)]"
                  >
                    <div className="relative h-[300px] overflow-hidden bg-slate-100">

                      {maid.imageIds[0] ? (
                        <img
                          src={`/api/maids/media?id=${maid.imageIds[0]}`}
                          alt={maid.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl text-slate-300">
                          👩
                        </div>
                      )}

                      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/75 px-3 py-1.5 text-[10px] font-black text-[#1257D6] shadow-[0_5px_18px_rgba(0,0,0,.08)] backdrop-blur-xl">
                          <span className="text-[15px] leading-none">
                            {getNationalityFlag(maid.nationality || maid.country || "")}
                          </span>
                          <span>
                            {maid.nationality || "غير محدد"}
                          </span>
                        </span>

                        <span
                          className={`rounded-full px-3 py-1.5 text-[10px] font-black backdrop-blur ${
                            maid.active === false
                              ? "bg-slate-900/75 text-white"
                              : "bg-emerald-500/90 text-white"
                          }`}
                        >
                          {maid.active === false ? "غير متاحة" : "متاحة"}
                        </span>
                      </div>

                    </div>

                    <div className="p-5">

                      <div className="-mt-[54px] relative z-20 mb-5">
                        <div className="inline-flex max-w-full items-center rounded-[17px] border border-white/60 bg-white/55 px-4 py-2.5 shadow-[0_10px_30px_rgba(20,50,90,.12)] backdrop-blur-xl">
                          <h3 className="truncate text-[17px] font-black text-[#172033]">
                            <span data-no-translate="true">{maid.name}</span>
                          </h3>
                        </div>
                      </div>

                      <div className="text-[11px] font-black text-[#1257D6]">
                        {maid.experience || "خبرة غير محددة"}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {maid.workType && (
                          <span className="rounded-full bg-[#F3F7FC] px-3 py-1.5 text-[9px] font-bold text-slate-500">
                            {maid.workType}
                          </span>
                        )}

                        {(maid.skills || [])
                          .slice(0, 2)
                          .map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-[#F3F7FC] px-3 py-1.5 text-[9px] font-bold text-slate-500"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3 rounded-[16px] border border-[#9CCCF0] bg-[#DFF1FF] px-4 py-3 shadow-[0_8px_24px_rgba(74,151,207,.12)] transition duration-300 group-hover:border-[#6DB3E5] group-hover:bg-[#8FC4EA] group-hover:shadow-[0_12px_30px_rgba(74,151,207,.20)]">
                        <span className="text-[11px] font-black text-[#1768A8] transition group-hover:text-white">
                          عرض ملف العاملة
                        </span>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#BFE3FA] text-sm font-black text-[#1768A8] shadow-sm transition group-hover:translate-x-[-2px] group-hover:bg-white">
                          ←
                        </span>
                      </div>

                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* =====================================================
          BENEFITS
          ===================================================== */}
      <section className="bg-[#F6F9FD] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1320px]">

          <div className="mb-10">
            <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
              WHY HIRE WITH AL SAADA
            </div>

            <h2 className="mt-2 max-w-[850px] text-3xl font-black md:text-5xl">
              فوائد توظيف عاملة منزلية بطريقة منظمة
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([num, title, text]) => (
              <article
                key={num}
                className="rounded-[28px] border border-[#DEE6F0] bg-white p-7 shadow-[0_15px_40px_rgba(18,87,214,.045)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#1257D6]/10 text-[10px] font-black text-[#1257D6]">
                  {num}
                </div>

                <h3 className="mt-7 text-[17px] font-black">
                  {title}
                </h3>

                <p className="mt-3 text-[11px] font-semibold leading-7 text-slate-500">
                  {text}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          FULL TIME
          ===================================================== */}
      <section className="relative overflow-hidden bg-[#1257D6] px-5 py-16 text-white md:px-8 md:py-24">

        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#57D8FF]/10 blur-3xl" />
        <div className="absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-[#F28C28]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1320px] gap-6 lg:grid-cols-2">

          <article className="rounded-[30px] border border-white/10 bg-white/[.08] p-8 backdrop-blur-md md:p-10">
            <div className="text-[10px] font-black tracking-[3px] text-[#F6B56F]">
              FULL TIME
            </div>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              توظيف عاملة منزلية بدوام كامل
            </h2>

            <p className="mt-5 text-[12px] font-semibold leading-8 text-white/68">
              خيار مناسب للعائلات التي تحتاج دعماً منزلياً يومياً ومستقراً،
              مع إمكانية مقارنة الملفات وفق الخبرة والجنسية والمهارات.
            </p>

            <div className="mt-7 space-y-3">
              {fullTimePoints.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[15px] bg-white/[.06] p-3"
                >
                  <span className="mt-1 text-[#F6B56F]">✓</span>
                  <span className="text-[11px] font-bold leading-6 text-white/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/services/maid-visa"
              className="mt-7 inline-flex rounded-[14px] bg-[#F28C28] px-6 py-3.5 text-[11px] font-black text-white"
            >
              تعرف على التأشيرة
            </Link>
          </article>

          <article className="rounded-[30px] bg-white p-8 text-[#172033] shadow-[0_25px_60px_rgba(0,0,0,.10)] md:p-10">
            <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
              PART TIME
            </div>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              توظيف عاملة منزلية بدوام جزئي
            </h2>

            <p className="mt-5 text-[12px] font-semibold leading-8 text-black/50">
              مناسب لمن يحتاج مساعدة منزلية مرنة وفق أيام أو مهام محددة،
              مع مقارنة العاملات المتاحات من داخل نفس قاعدة البيانات.
            </p>

            <div className="mt-7 space-y-3">
              {partTimePoints.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[15px] bg-[#F5F8FD] p-3"
                >
                  <span className="mt-1 text-[#1257D6]">✓</span>
                  <span className="text-[11px] font-bold leading-6 text-slate-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#maids"
              className="mt-7 inline-flex rounded-[14px] bg-[#1257D6] px-6 py-3.5 text-[11px] font-black text-white"
            >
              استعرض الخيارات
            </a>
          </article>

        </div>
      </section>

      {/* =====================================================
          LIVE-IN / RESIDENT
          ===================================================== */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">

          <div>
            <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
              LIVE-IN SUPPORT
            </div>

            <h2 className="mt-3 text-3xl font-black leading-[1.25] md:text-5xl">
              تبحث عن عاملة
              <span className="text-[#1257D6]"> مقيمة؟</span>
            </h2>

            <p className="mt-5 max-w-[650px] text-[13px] font-semibold leading-8 text-black/50">
              يمكنك مراجعة الملفات التي تناسب احتياجك، ثم معرفة الخبرة واللغات
              والمهارات قبل بدء إجراءات التوظيف.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {residentPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[17px] border border-[#E3E9F1] bg-[#F7F9FC] p-4"
                >
                  <div className="text-[11px] font-bold leading-6 text-[#172033]">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] bg-[#EAF2FF] p-2">
            <div className="relative overflow-hidden rounded-[28px] bg-[#1257D6] p-8 md:p-10">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

              <div className="relative">
                <div className="text-[10px] font-black tracking-[3px] text-[#F6B56F]">
                  AL SAADA
                </div>

                <div className="mt-4 text-3xl font-black leading-[1.3] text-white md:text-4xl">
                  الملف الكامل يساعدك
                  <br />
                  على المقارنة قبل القرار.
                </div>

                <p className="mt-5 text-[12px] font-semibold leading-8 text-white/65">
                  افتح أي ملف من القائمة لمراجعة الصور واللغات والخبرة
                  والمهارات والوصف والفيديو عند توفره.
                </p>

                <a
                  href="#maids"
                  className="mt-7 inline-flex rounded-[14px] bg-white px-6 py-3.5 text-[11px] font-black text-[#1257D6]"
                >
                  شاهد العاملات
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          HOW TO HIRE
          ===================================================== */}
      <section className="bg-[#F6F9FD] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1320px]">

          <div className="mb-10">
            <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
              HOW TO HIRE
            </div>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              كيفية توظيف عاملة منزلية مع AL SAADA
            </h2>

            <p className="mt-4 max-w-[700px] text-[12px] font-semibold leading-7 text-slate-500">
              خطوات بسيطة تبدأ من فهم احتياجك وتنتهي بالاختيار والإجراءات المناسبة.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([num, title, text]) => (
              <article
                key={num}
                className="rounded-[27px] border border-[#DDE5EF] bg-white p-7 shadow-[0_16px_40px_rgba(18,87,214,.045)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#1257D6] text-[10px] font-black text-white">
                  {num}
                </div>

                <h3 className="mt-7 text-[17px] font-black">
                  {title}
                </h3>

                <p className="mt-3 text-[11px] font-semibold leading-7 text-slate-500">
                  {text}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          TRUST
          ===================================================== */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1100px]">

          <div className="rounded-[34px] bg-[#172033] p-8 text-white shadow-[0_25px_70px_rgba(23,32,51,.15)] md:p-12">

            <div className="text-[10px] font-black tracking-[3px] text-[#F6B56F]">
              TRUST & CLARITY
            </div>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              عاملات موثوقات وملفات أوضح.
            </h2>

            <p className="mt-5 max-w-[850px] text-[12px] font-semibold leading-8 text-white/65">
              الهدف هو أن تعرف تفاصيل المرشحة قبل الاختيار: الجنسية والخبرة
              واللغات والمهارات والصور والفيديو والوصف، عندما تكون هذه البيانات
              متوفرة في الملف.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-[18px] bg-white/[.06] p-5">
                <div className="text-[12px] font-black">اختيار مدروس</div>
                <div className="mt-2 text-[10px] leading-6 text-white/50">
                  قارن أكثر من ملف قبل اتخاذ القرار.
                </div>
              </div>

              <div className="rounded-[18px] bg-white/[.06] p-5">
                <div className="text-[12px] font-black">بيانات منظمة</div>
                <div className="mt-2 text-[10px] leading-6 text-white/50">
                  التفاصيل الأساسية تظهر داخل الملف.
                </div>
              </div>

              <div className="rounded-[18px] bg-white/[.06] p-5">
                <div className="text-[12px] font-black">متابعة واضحة</div>
                <div className="mt-2 text-[10px] leading-6 text-white/50">
                  بعد اختيار العاملة تبدأ الخطوات التالية.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          FAQ
          ===================================================== */}
      <section className="bg-[#F6F9FD] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1000px]">

          <div className="text-center">
            <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
              FAQ
            </div>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              الأسئلة الشائعة
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map(([question, answer], index) => (
              <details
                key={question}
                className="group overflow-hidden rounded-[22px] border border-[#DEE6F0] bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 text-[13px] font-black">
                  <span className="flex h-9 w-9 min-w-9 items-center justify-center rounded-[11px] bg-[#1257D6]/10 text-[9px] text-[#1257D6]">
                    0{index + 1}
                  </span>

                  <span className="flex-1">
                    {question}
                  </span>

                  <span className="text-xl font-light text-[#1257D6] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-[11px] font-semibold leading-7 text-slate-500">
                  {answer}
                </div>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}
      <section className="bg-white px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[34px] bg-[#1257D6] p-8 text-center text-white shadow-[0_30px_80px_rgba(18,87,214,.18)] md:p-14">

          <div className="text-[10px] font-black tracking-[3px] text-[#F6B56F]">
            READY?
          </div>

          <h2 className="mx-auto mt-3 max-w-[800px] text-3xl font-black leading-[1.3] md:text-5xl">
            جاهز تجد العاملة المناسبة؟
          </h2>

          <p className="mx-auto mt-5 max-w-[680px] text-[12px] font-semibold leading-8 text-white/65">
            ابدأ باستعراض العاملات، افتح الملفات التي تهمك، ثم تواصل معنا
            بخصوص العاملة التي تناسب احتياجات منزلك.
          </p>

          <a
            href="#maids"
            className="mt-8 inline-flex rounded-[15px] bg-[#F28C28] px-8 py-4 text-[12px] font-black text-white transition hover:-translate-y-1 hover:bg-[#E87C1A]"
          >
            مشاهدة العاملات
          </a>

        </div>
      </section>

      {/* =====================================================
          MODAL
          ===================================================== */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-white p-5 shadow-2xl md:p-7"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-black tracking-[2px] text-[#F28C28]">
                  MAID PROFILE
                </div>

                <h2 className="mt-1 text-2xl font-black md:text-3xl">
                  <span data-no-translate="true">{selected.name}</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="mt-7 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">

              <div>
                {selected.imageIds.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {selected.imageIds.map((imageId) => (
                      <img
                        key={imageId}
                        src={`/api/maids/media?id=${imageId}`}
                        alt={selected.name}
                        className="h-52 w-full rounded-[18px] object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-72 items-center justify-center rounded-[20px] bg-slate-100 text-5xl">
                    👩
                  </div>
                )}

                {selected.videoId && (
                  <div className="mt-4 overflow-hidden rounded-[20px] bg-black">
                    <video
                      controls
                      className="w-full"
                      src={`/api/maids/media?id=${selected.videoId}`}
                    />
                  </div>
                )}
              </div>

              <div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Detail label="الاسم" value={selected.name} />
                  <Detail label="العمر" value={selected.age || "غير محدد"} />
                  <Detail label="الجنسية" value={selected.nationality || "غير محددة"} />
                  <Detail label="البلد" value={selected.country || "غير محدد"} />
                  <Detail label="الخبرة" value={selected.experience || "غير محددة"} />
                  <Detail label="نوع العمل" value={selected.workType || "غير محدد"} />
                </div>

                <div className="mt-6 rounded-[20px] bg-[#F6F9FD] p-5">
                  <h3 className="font-black">اللغات</h3>

                  <div className="mt-3 space-y-2">
                    {selected.languages.length ? (
                      selected.languages.map((language, index) => (
                        <div
                          key={`${language.name}-${index}`}
                          className="rounded-[13px] bg-white px-4 py-3 text-[11px] font-semibold"
                        >
                          {language.name}
                          {language.level ? ` — ${language.level}` : ""}
                        </div>
                      ))
                    ) : (
                      <div className="text-[11px] text-slate-400">
                        غير محدد
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-black">المهارات</h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.skills.length ? (
                      selected.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-[#1257D6]/10 px-3 py-2 text-[10px] font-bold text-[#1257D6]"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-400">
                        غير محددة
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-black">الوصف</h3>

                  <p className="mt-3 whitespace-pre-wrap text-[12px] font-semibold leading-8 text-slate-500">
                    {selected.description || "لا يوجد وصف."}
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {contact.whatsapp && (
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 rounded-[16px] bg-[#25D366] px-6 py-4 text-[12px] font-black text-white shadow-lg shadow-green-100 transition hover:-translate-y-0.5"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        W
                      </span>
                      تواصل عبر واتساب
                    </a>
                  )}

                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center justify-center gap-3 rounded-[16px] bg-[#1257D6] px-6 py-4 text-[12px] font-black text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5"
                    >
                      ☎
                      اتصل بنا
                    </a>
                  )}

                  <Link
                    href="/get-maids#maids"
                    onClick={() => setSelected(null)}
                    className="sm:col-span-2 flex items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 px-6 py-3.5 text-[11px] font-black text-slate-600 transition hover:bg-slate-100"
                  >
                    العودة إلى العاملات
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
      <Footer />
    </main>
  )
}

function Detail({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[18px] bg-[#F6F9FD] p-4">
      <div className="text-[10px] font-bold text-slate-400">
        {label}
      </div>

      <div className="mt-1 text-[12px] font-black text-slate-900">
        {value || "—"}
      </div>
    </div>
  )
}
