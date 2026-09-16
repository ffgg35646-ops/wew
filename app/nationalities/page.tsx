 "use client"

import Link from "next/link"
import Navbar from "@/components/Navbar"
import { useEffect, useState } from "react"
import Footer from "@/components/Footer"

const nationalities = [
  {
    id: "philippines",
    name: "الفلبين",
    short: "فلبينيات",
    slug: "filipino-maids",
    description:
      "عاملات منزليات ومربيات فلبينيات موثوقات ومدرّبات لمختلف احتياجات المنزل.",
  },
  {
    id: "ethiopia",
    name: "إثيوبيا",
    short: "إثيوبيات",
    slug: "ethiopian-maids",
    description:
      "عاملات منزليات إثيوبيات بخبرة مناسبة للتنظيف والمهام المنزلية والرعاية.",
  },
  {
    id: "indonesia",
    name: "إندونيسيا",
    short: "إندونيسيات",
    slug: "indonesian-maids",
    description:
      "عاملات منزليات ومربيات إندونيسيات لخدمات التنظيف والطبخ ورعاية الأطفال.",
  },
  {
    id: "africa",
    name: "أفريقيا",
    short: "أفريقيات",
    slug: "african-maids",
    description:
      "مجموعة متنوعة من العاملات المنزليات من جنسيات أفريقية حسب التوفر والاحتياج.",
  },
  {
    id: "other",
    name: "جنسيات أخرى",
    short: "أخرى",
    slug: "other-nationalities",
    description:
      "خيارات إضافية من الجنسيات المتاحة حسب المخزون والتوفر الحالي.",
  },
]

const content = {
  philippines: {
    title: "عاملات منزليات ومربيات فلبينيات في دبي",
    text:
      "نساعدك في العثور على عاملة منزلية أو مربية فلبينية مناسبة لاحتياجات منزلك، مع خيارات للدوام الكامل والجزئي وخدمات التأشيرة والمتابعة.",
  },
  ethiopia: {
    title: "عاملات منزليات إثيوبيات في دبي",
    text:
      "خيارات من العاملات الإثيوبيات حسب الخبرة والمهارات وطبيعة المهام المطلوبة للمنزل أو الأسرة.",
  },
  indonesia: {
    title: "عاملات منزليات ومربيات إندونيسيات في دبي",
    text:
      "نوفر خيارات من العاملات والمربيات الإندونيسيات للتنظيف والطبخ ورعاية الأطفال والمهام المنزلية المختلفة.",
  },
  africa: {
    title: "عاملات منزليات من أفريقيا في دبي",
    text:
      "خيارات متنوعة من العاملات المنزليات من دول أفريقية مختلفة بحسب التوفر ومتطلبات الأسرة.",
  },
  other: {
    title: "عاملات منزليات من جنسيات مختلفة في دبي",
    text:
      "تتوفر جنسيات أخرى حسب الطلب والتوفر الحالي، ويمكن لفريقنا مساعدتك في اختيار الأنسب لاحتياجات منزلك.",
  },
}

const nationalitySliderImages = [
  "/images/saada/nationalities/1.jpg",
  "/images/saada/nationalities/2.jpg",
  "/images/saada/nationalities/3.jpg",
  "/images/saada/nationalities/4.jpg",
  "/images/saada/nationalities/5.jpeg",
  "/images/saada/nationalities/6.jpg",
]

export default function NationalitiesPage() {
  const [active, setActive] = useState("philippines")
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((value) => (value + 1) % nationalitySliderImages.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const selected =
    nationalities.find((item) => item.id === active) ?? nationalities[0]

  return (
    <main dir="rtl" className="min-h-screen bg-[#F7F9FC] text-[#172033]">

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">

        <div className="pointer-events-none absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-[#1257D6]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-[-150px] h-[400px] w-[400px] rounded-full bg-[#F28C28]/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[.95fr_1.05fr]">

          {/* LEFT */}
          <div className="order-2 lg:order-1">

            <div className="mb-5 text-[10px] font-black tracking-[3px] text-[#F28C28]">
              NATIONALITIES
            </div>

            <h1 className="max-w-[700px] text-[38px] font-black leading-[1.3] tracking-[-1.5px] text-[#29456F] md:text-[54px]">
              تبحث عن عاملة منزلية موثوقة في دبي؟
              <br />
              <span className="text-[#1257D6]">
                اختر جنسيتك المفضلة.
              </span>
            </h1>

            <p className="mt-6 max-w-[650px] text-[14px] font-semibold leading-[2] text-black/50 md:text-[16px]">
              اختر الجنسية التي تفضلها وسنساعدك في الوصول إلى الخيارات
              المناسبة حسب الخبرة والمهارات والتوفر الحالي.
            </p>

            {/* NATIONALITY BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              {nationalities.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActive(item.id)
                    setSlide(0)
                  }}
                  className={[
                    "rounded-full border px-5 py-3 text-[12px] font-black transition-all duration-300",
                    active === item.id
                      ? "border-[#1257D6] bg-[#1257D6] text-white shadow-[0_10px_25px_rgba(18,87,214,.18)]"
                      : "border-black/10 bg-white text-[#172033] hover:border-[#F28C28]/40 hover:bg-[#FFF7F0]",
                  ].join(" ")}
                >
                  {item.short}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="tel:+97148985444"
                className="inline-flex items-center gap-3 rounded-[14px] bg-[#1257D6] px-6 py-4 text-[12px] font-black text-white shadow-[0_12px_30px_rgba(18,87,214,.18)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                  <path d="M6.6 3.8 9.1 3c.7-.2 1.4.2 1.7.8l1.3 3.1c.2.5.1 1.1-.3 1.5L10.2 10c1 2 2.6 3.5 4.6 4.6l1.6-1.6c.4-.4 1-.5 1.5-.3l3.1 1.3c.6.3 1 .9.8 1.7l-.8 2.5c-.3.9-1.1 1.5-2.1 1.5C11 19.6 4.4 13 4.4 5.9c0-1 .6-1.8 1.5-2.1Z"/>
                </svg>
                اتصل الآن
              </a>

              <a
                href="https://wa.me/97148985444"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-[14px] border border-[#25D366]/25 bg-[#25D366]/10 px-6 py-4 text-[12px] font-black text-[#15803D] transition hover:bg-[#25D366]/15"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                  <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.1-3.7a8.5 8.5 0 1 1 15.4-4.8Z"/>
                  <path d="M9 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c.8 1.3 1.7 2.1 3 2.8l.5-.6c.2-.2.4-.2.6-.1l1.7.8c.2.1.3.3.2.5v.5c-.1.5-.4.8-.8.9-2.4.1-6.3-3.3-7.1-6.4-.1-.5.1-1 .6-1.3Z"/>
                </svg>
                واتساب
              </a>

            </div>

          </div>

          {/* RIGHT IMAGE SLIDER PLACEHOLDER */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[34px] border border-white bg-white p-2 shadow-[0_30px_75px_rgba(20,50,90,.12)]">

              <div className="relative h-[430px] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#EAF2FF,#F9FBFD)] md:h-[560px]">

                <div className="absolute inset-0">
                  <img
                    key={nationalitySliderImages[slide]}
                    src={nationalitySliderImages[slide]}
                    alt="عاملات منزلية وخدمات منزلية"
                    className="h-full w-full object-cover object-center transition-opacity duration-700"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

                  <div className="absolute left-5 top-5 z-10 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur-md">
                    {String(slide + 1).padStart(2, "0")} / {String(nationalitySliderImages.length).padStart(2, "0")}
                  </div>
                </div>

<div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                  {[0, 1, 2, 3].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSlide(item)}
                      className={`h-2 rounded-full transition-all ${
                        slide === item
                          ? "w-8 bg-[#1257D6]"
                          : "w-2 bg-black/15"
                      }`}
                      aria-label={`الشريحة ${item + 1}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SELECTED NATIONALITY */}
      <section className="bg-[#F7F9FC] py-20 md:py-24">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">

          <div className="mb-10">
            <div className="mb-3 text-[10px] font-black tracking-[3px] text-[#F28C28]">
              {selected.name.toUpperCase()}
            </div>

            <h2 className="text-3xl font-black tracking-[-1px] md:text-5xl">
              {content[selected.id as keyof typeof content].title}
            </h2>
          </div>

          <div className="rounded-[30px] border border-[#DDE4EE] bg-white p-7 shadow-[0_18px_55px_rgba(20,50,90,.05)] md:p-10">

            <p className="max-w-[850px] text-[14px] font-semibold leading-[2] text-black/55">
              {content[selected.id as keyof typeof content].text}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">

              {[
                "دوام كامل أو جزئي",
                "خيارات حسب الخبرة والمهارات",
                "دعم في إجراءات التأشيرة",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[20px] bg-[#F7F9FC] p-5"
                >
                  <div className="mb-6 text-[10px] font-black text-[#F28C28]">
                    0{index + 1}
                  </div>

                  <div className="text-[13px] font-black">
                    {item}
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-5 py-16 md:px-8">
        <div className="mx-auto max-w-[1240px] rounded-[32px] bg-[#1257D6] p-8 text-white md:p-12">

          <div className="max-w-[800px]">
            <div className="mb-3 text-[10px] font-black tracking-[3px] text-[#F6B56F]">
              AL SAADA
            </div>

            <h2 className="text-3xl font-black leading-[1.35] md:text-5xl">
              اختر جنسيتك واترك الباقي علينا.
            </h2>

            <p className="mt-5 text-[13px] font-semibold leading-8 text-white/70">
              أخبرنا بما تحتاجه وسنساعدك في معرفة الخيارات المناسبة والتوفر الحالي.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+97148985444"
                className="rounded-[14px] bg-[#F6B56F] px-7 py-4 text-[12px] font-black text-white"
              >
                اتصل الآن
              </a>

              <a
                href="https://wa.me/97148985444"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[14px] border border-white/15 bg-white/10 px-7 py-4 text-[12px] font-black text-white"
              >
                تواصل عبر واتساب
              </a>
            </div>
          </div>

        </div>
      </section>

          {/* FOOTER */}
      <Footer />

</main>
  )
}
