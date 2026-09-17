"use client"

import SiteImage from "@/components/SiteImage"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const emirates = {
  "أبوظبي": {
    title: "خدمات العاملات المنزليات في أبوظبي",
    text: "اختر العاملة المناسبة لمنزلك في أبوظبي حسب الجنسية والخبرة ونوع العمل، مع خيارات بدوام كامل أو جزئي.",
    points: ["دوام كامل أو جزئي", "اختيار الجنسية", "خبرات ومهارات متنوعة", "مساعدة في الإجراءات"],
  },
  "دبي": {
    title: "خدمات العاملات المنزليات في دبي",
    text: "حلول مرنة للأسر في دبي لاختيار عاملة منزلية حسب احتياجات المنزل والخبرة ونوع العمل.",
    points: ["دوام كامل أو جزئي", "اختيار الجنسية", "اختيار الخبرة", "دعم مباشر"],
  },
  "الشارقة": {
    title: "خدمات العاملات المنزليات في الشارقة",
    text: "اختر العاملة المناسبة في الشارقة مع إمكانية تحديد الجنسية والمهارات ونوع العمل.",
    points: ["دوام كامل", "دوام جزئي", "جنسيات متعددة", "متابعة منظمة"],
  },
  "عجمان": {
    title: "خدمات العاملات المنزليات في عجمان",
    text: "خدمة مرنة للأسر في عجمان للوصول إلى العاملة المناسبة حسب احتياجات المنزل.",
    points: ["نوع العمل", "الجنسية", "المهارة", "تواصل سريع"],
  },
  "رأس الخيمة": {
    title: "خدمات العاملات المنزليات في رأس الخيمة",
    text: "خيارات للأسر في رأس الخيمة تشمل العاملات بدوام كامل أو جزئي وخدمات الرعاية المنزلية.",
    points: ["دوام كامل", "دوام جزئي", "أعمال منزلية", "رعاية منزلية"],
  },
  "أم القيوين": {
    title: "خدمات العاملات المنزليات في أم القيوين",
    text: "حلول بسيطة وواضحة للأسر في أم القيوين لاختيار عاملة منزلية حسب الاحتياج.",
    points: ["دوام مرن", "اختيار الجنسية", "الخبرة والمهارة", "مساعدة في الإجراءات"],
  },
} as const

type Emirate = keyof typeof emirates

const emirateNames = Object.keys(emirates) as Emirate[]

const cards = [
  {
    icon: "⌂",
    title: "دوام كامل",
    text: "عاملة منزلية بدوام كامل للعائلات التي تحتاج إلى مساعدة يومية مستمرة في أعمال المنزل.",
    image: "/images/maid-2.jpg",
  },
  {
    icon: "◷",
    title: "دوام جزئي",
    text: "خيار مرن للعائلات التي تحتاج إلى الخدمة لساعات أو أيام محددة.",
    image: "/images/maid-3.jpg",
  },
  {
    icon: "✓",
    title: "تأشيرة عاملة منزلية",
    text: "إرشاد واضح حول إجراءات ومتطلبات تأشيرة العاملة المنزلية حسب الحالة.",
    image: "/images/maid-4.jpg",
  },
]

const benefits = [
  ["01", "اختيار الجنسية", "اختر الجنسية المفضلة حسب احتياجات منزلك."],
  ["02", "اختيار الخبرة", "قارن الخبرات والمهارات المناسبة لطبيعة العمل."],
  ["03", "خدمة مرنة", "دوام كامل أو جزئي حسب احتياج الأسرة."],
  ["04", "متابعة منظمة", "نساعدك في الانتقال من الاختيار إلى الخطوات التالية."],
]

const steps = [
  ["01", "اختر الإمارة", "حدد الإمارة من قائمة عاملات الإمارات داخل الهيرو."],
  ["02", "حدد احتياجك", "حدد الجنسية والخبرة ونوع العمل والمهارات."],
  ["03", "قارن الخيارات", "راجع التفاصيل واختر الأنسب لمنزلك."],
  ["04", "ابدأ الخدمة", "تواصل معنا لاستكمال الإجراءات والخطوات المطلوبة."],
]

const faqs = [
  ["هل يمكنني اختيار جنسية العاملة؟", "نعم، يمكنك تحديد الجنسية المفضلة ثم معرفة الخيارات المتاحة."],
  ["هل يوجد دوام كامل وجزئي؟", "نعم، تتوفر خيارات للدوام الكامل والجزئي حسب احتياج الأسرة."],
  ["هل تساعدون في التأشيرة؟", "يمكن لفريقنا إرشادك بشأن خطوات ومتطلبات التأشيرة."],
  ["هل لكل إمارة صفحة منفصلة؟", "لا، نفس الصفحة تحتوي على الإمارات الست وتفاصيل كل إمارة داخل الهيرو."],
]

export default function FullTimeMaidServicePage() {
  const [selected, setSelected] = useState<Emirate>("أبوظبي")
  const current = emirates[selected]

  return (
    <main dir="rtl" className="uae-page min-h-screen overflow-hidden bg-[#F7F9FC] text-[#172033]">
      <Navbar />

      {/* HERO */}
      <section className="uae-hero mx-auto mt-6 w-[calc(100%-28px)] max-w-[1320px]">
        <div className="uae-hero-grid">

          {/* IMAGE */}
          <div className="uae-photo">
            <SiteImage
              page="full-time-maid-service" slot={4} fallbackSrc="/images/maid-1.jpg"
              alt="عاملات الإمارات"
              fill
              priority
              className="object-cover"
            />

            <div className="uae-photo-overlay" />

            <div className="uae-photo-badge">
              <div className="text-[9px] font-black tracking-[3px] text-[#1257D6]">
                AL SAADA
              </div>
              <div className="mt-1 text-[20px] font-black text-[#172033]">
                ثقة · أمان · خدمة عالية
              </div>
              <div className="mt-1 text-[10px] font-semibold text-slate-500">
                خدمات العاملات المنزلية في الإمارات
              </div>
            </div>
          </div>

          {/* BLUE PANEL */}
          <div className="uae-blue-panel">

            <svg className="uae-blue-wave" viewBox="0 0 700 700" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M700 0C570 75 620 140 475 215C330 290 415 360 255 430C135 482 115 570 0 640V0Z"
                fill="#57D8FF"
                opacity=".22"
              />
              <path
                d="M700 175C590 225 625 290 515 345C390 408 430 470 300 535C205 582 185 635 75 700H700Z"
                fill="#FFFFFF"
                opacity=".11"
              />
            </svg>

            <div className="relative z-10">

              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[9px] font-black tracking-[2px] text-[#9DEBFF]">
                AL SAADA · UAE MAID SERVICES
              </div>

              <h1 className="mt-6 text-[45px] font-black leading-[1.02] tracking-[-1.8px] text-white md:text-[62px]">
                عاملات
                <span className="block text-white">
                  الإمارات
                </span>
              </h1>

              <p className="mt-5 max-w-[560px] text-[13px] font-semibold leading-8 text-white/72">
                اختر الإمارة المناسبة لك، وستظهر تفاصيل الخدمة داخل نفس الصفحة.
                لا تحتاج إلى الانتقال بين صفحات مختلفة.
              </p>

              <div className="mt-7">
                <div className="mb-3 text-[9px] font-black tracking-[2px] text-white/55">
                  اختر الإمارة
                </div>

                <div className="flex flex-wrap gap-2">
                  {emirateNames.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelected(name)}
                      className={`rounded-full px-4 py-2.5 text-[10px] font-black transition ${
                        selected === name
                          ? "bg-white text-[#1257D6] shadow-[0_8px_25px_rgba(0,0,0,.16)]"
                          : "border border-white/15 bg-white/10 text-white hover:bg-white/15"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 rounded-[25px] border border-white/15 bg-[#0B3F9D]/90 p-5">

                <div className="text-[9px] font-black tracking-[2px] text-[#F6B56F]">
                  الإمارة المختارة
                </div>

                <h2 className="mt-2 text-[21px] font-black text-white md:text-[25px]">
                  {current.title}
                </h2>

                <p className="mt-3 text-[11px] font-semibold leading-7 text-white/70">
                  {current.text}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {current.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-[13px] bg-white/10 px-3 py-2.5 text-[9px] font-bold text-white"
                    >
                      ✓ {point}
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">

                  <a
                    href="#contact"
                    className="flex min-h-[48px] items-center justify-center rounded-[14px] bg-[#25D366] text-[10px] font-black text-white shadow-lg"
                  >
                    واتساب
                  </a>

                  <a
                    href="#contact"
                    className="flex min-h-[48px] items-center justify-center rounded-[14px] bg-white text-[10px] font-black text-[#1257D6]"
                  >
                    اتصل بنا
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto w-[calc(100%-28px)] max-w-[1100px] py-16 text-center md:py-20">
        <div>
          <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
            AL SAADA
          </div>

          <h2 className="mx-auto mt-3 max-w-[850px] text-3xl font-black leading-[1.25] md:text-5xl mx-auto w-fit max-w-full rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 border border-[#8EDDF5]/45 bg-[#DDF7FF]/80 shadow-[0_10px_30px_rgba(87,216,255,.14)] section-title-glass">
            خدمة عاملات منزلية
            <span className="text-[#1257D6]"> في جميع الإمارات</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[900px] text-[13px] font-semibold leading-9 text-slate-500 md:text-[15px]">
            نساعد العائلات على الوصول إلى العاملة المناسبة بطريقة واضحة ومنظمة،
            بداية من اختيار الإمارة والجنسية ونوع العمل، وصولًا إلى الاختيار
            والإجراءات المناسبة. الهدف هو الوصول إلى الحل الأقرب لاحتياجات
            المنزل وليس مجرد عرض عدد كبير من الخيارات.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto w-[calc(100%-28px)] max-w-[1320px] pb-16">
        <div className="mb-8">
          <div className="text-[10px] font-black tracking-[3px] text-[#1257D6]">
            WHY AL SAADA
          </div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl mx-auto w-fit max-w-full rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 border border-[#8EDDF5]/45 bg-[#DDF7FF]/80 shadow-[0_10px_30px_rgba(87,216,255,.14)] section-title-glass">
            لماذا تختار خدمة منظمة؟
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([number, title, text]) => (
            <article
              key={number}
              className="rounded-[26px] border border-[#DEE6F0] bg-white p-6 shadow-[0_16px_45px_rgba(18,87,214,.045)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#1257D6] text-[10px] font-black text-white">
                {number}
              </div>

              <h3 className="mt-5 text-[16px] font-black">
                {title}
              </h3>

              <p className="mt-3 text-[11px] font-semibold leading-7 text-slate-500">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto w-[calc(100%-28px)] max-w-[1320px] pb-16 md:pb-20">

        <div className="mb-8">
          <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
            SERVICES
          </div>

          <h2 className="mt-2 text-3xl font-black md:text-4xl mx-auto w-fit max-w-full rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 border border-[#8EDDF5]/45 bg-[#DDF7FF]/80 shadow-[0_10px_30px_rgba(87,216,255,.14)] section-title-glass">
            خدمات حسب طبيعة احتياجك
          </h2>

          <p className="mt-3 max-w-3xl text-[12px] font-semibold leading-7 text-slate-500">
            اختر الخدمة التي تناسب منزلك، ثم تواصل معنا لمعرفة الخيارات والإجراءات المناسبة.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[28px] border border-[#E0E7EF] bg-white shadow-[0_18px_55px_rgba(23,32,51,.06)]"
            >
              <div className="relative h-[245px] overflow-hidden bg-[#EAF2FA]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#1257D6] text-sm font-black text-white">
                  {card.icon}
                </div>

                <h3 className="mt-5 text-[20px] font-black">
                  {card.title}
                </h3>

                <p className="mt-3 text-[12px] font-semibold leading-7 text-slate-500">
                  {card.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FULL + PART */}
      <section className="mx-auto w-[calc(100%-28px)] max-w-[1320px] pb-16">
        <div className="grid gap-5 lg:grid-cols-2">

          <article className="rounded-[30px] bg-[#1257D6] p-8 text-white md:p-10">
            <div className="text-[10px] font-black tracking-[3px] text-[#9DEBFF]">
              FULL TIME
            </div>

            <h2 className="mt-3 text-3xl font-black mx-auto w-fit max-w-full rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 border border-[#8EDDF5]/45 bg-[#DDF7FF]/80 shadow-[0_10px_30px_rgba(87,216,255,.14)] section-title-glass">
              عاملة منزلية بدوام كامل
            </h2>

            <p className="mt-5 text-[12px] font-semibold leading-8 text-white/70">
              مناسب للعائلات التي تحتاج إلى مساعدة منزلية مستمرة في التنظيف
              والترتيب والطبخ ورعاية الأطفال أو كبار السن حسب الخبرة والمهارات.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "خدمة يومية",
                "خبرات متنوعة",
                "اختيار الجنسية",
                "متابعة الإجراءات",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[15px] bg-white/10 px-4 py-3 text-[10px] font-bold"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[30px] bg-white p-8 shadow-[0_20px_55px_rgba(18,87,214,.06)] md:p-10">
            <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
              PART TIME
            </div>

            <h2 className="mt-3 text-3xl font-black mx-auto w-fit max-w-full rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 border border-[#8EDDF5]/45 bg-[#DDF7FF]/80 shadow-[0_10px_30px_rgba(87,216,255,.14)] section-title-glass">
              عاملة منزلية بدوام جزئي
            </h2>

            <p className="mt-5 text-[12px] font-semibold leading-8 text-slate-500">
              خيار مرن لمن يحتاج إلى خدمة منزلية في أيام أو ساعات محددة،
              مع إمكانية تحديد نوع العمل والجنسية والمهارات المطلوبة.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "مرونة أكبر",
                "مهام محددة",
                "اختيار حسب الاحتياج",
                "مقارنة الخيارات",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[15px] bg-[#F5F8FD] px-4 py-3 text-[10px] font-bold text-slate-600"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </article>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto w-[calc(100%-28px)] max-w-[1320px] pb-16">
        <div className="rounded-[32px] bg-[#0B3F9D] p-7 text-white md:p-10">

          <div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:items-center">

            <div>
              <div className="text-[10px] font-black tracking-[3px] text-[#9DEBFF]">
                HOW IT WORKS
              </div>

              <h2 className="mt-3 text-3xl font-black mx-auto w-fit max-w-full rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 border border-[#8EDDF5]/45 bg-[#DDF7FF]/80 shadow-[0_10px_30px_rgba(87,216,255,.14)] section-title-glass">
                كيف تبدأ؟
              </h2>

              <p className="mt-4 text-[12px] font-semibold leading-8 text-white/65">
                أربع خطوات بسيطة تبدأ من اختيار الإمارة وتنتهي ببدء الخدمة.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map(([number, title, text]) => (
                <article
                  key={number}
                  className="rounded-[21px] border border-white/10 bg-white/10 p-5"
                >
                  <div className="text-[10px] font-black text-[#9DEBFF]">
                    {number}
                  </div>

                  <h3 className="mt-4 text-[16px] font-black">
                    {title}
                  </h3>

                  <p className="mt-2 text-[11px] font-semibold leading-7 text-white/65">
                    {text}
                  </p>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-[calc(100%-28px)] max-w-[1000px] pb-16">
        <div className="text-center">
          <div className="text-[10px] font-black tracking-[3px] text-[#F28C28]">
            FAQ
          </div>

          <h2 className="mt-3 text-3xl font-black md:text-4xl mx-auto w-fit max-w-full rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 border border-[#8EDDF5]/45 bg-[#DDF7FF]/80 shadow-[0_10px_30px_rgba(87,216,255,.14)] section-title-glass">
            الأسئلة الشائعة
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map(([question, answer], index) => (
            <details
              key={question}
              className="overflow-hidden rounded-[20px] border border-[#DEE6F0] bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 text-[12px] font-black">
                <span className="flex h-8 w-8 min-w-8 items-center justify-center rounded-[10px] bg-[#1257D6]/10 text-[9px] text-[#1257D6]">
                  0{index + 1}
                </span>

                <span className="flex-1">{question}</span>
                <span className="text-xl font-light text-[#1257D6]">+</span>
              </summary>

              <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-[11px] font-semibold leading-7 text-slate-500">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto mb-12 w-[calc(100%-28px)] max-w-[1320px] rounded-[32px] bg-[#1257D6] p-7 text-white md:p-10"
      >
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="text-[10px] font-black tracking-[3px] text-[#9DEBFF]">
              AL SAADA
            </div>

            <h2 className="mt-3 text-3xl font-black md:text-4xl mx-auto w-fit max-w-full rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-300 border border-[#8EDDF5]/45 bg-[#DDF7FF]/80 shadow-[0_10px_30px_rgba(87,216,255,.14)] section-title-glass">
              ابدأ طلب عاملتك في {selected}
            </h2>

            <p className="mt-3 max-w-2xl text-[12px] font-semibold leading-8 text-white/70">
              اختر الإمارة ثم تواصل معنا لمعرفة الخيارات والإجراءات المناسبة.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-[16px] bg-[#25D366] px-7 py-3.5 text-[11px] font-black text-white"
            >
              واتساب
            </a>

            <a
              href="#contact"
              className="rounded-[16px] bg-white px-7 py-3.5 text-[11px] font-black text-[#1257D6]"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </section>
      <Footer />

      {/* PAGE-SPECIFIC CSS */}
      <style jsx global>{`
        .uae-hero {
          position: relative;
        }

        .uae-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 680px;
        }

        .uae-photo {
          position: relative;
          min-height: 680px;
          overflow: hidden;
          background: #eaf1f8;
        }

        .uae-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 42%,
            rgba(8, 35, 70, .52) 100%
          );
        }

        .uae-photo-badge {
          position: absolute;
          left: 28px;
          right: 28px;
          bottom: 28px;
          z-index: 4;
          padding: 18px 20px;
          border-radius: 22px;
          background: rgba(255,255,255,.91);
          border: 1px solid rgba(255,255,255,.96);
          box-shadow: 0 18px 45px rgba(10,40,80,.12);
          backdrop-filter: blur(12px);
        }

        .uae-blue-panel {
          position: relative;
          overflow: hidden;
          min-height: 680px;
          padding: 48px;
          background: linear-gradient(
            145deg,
            #0b3f9d 0%,
            #1257d6 52%,
            #176be8 78%,
            #0d8fd0 100%
          );
        }

        .uae-blue-wave {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .uae-hero-grid {
            grid-template-columns: 1fr;
          }

          .uae-photo,
          .uae-blue-panel {
            min-height: 560px;
          }

          .uae-blue-panel {
            padding: 28px;
          }
        }
      `}</style>
    </main>
  )
}
