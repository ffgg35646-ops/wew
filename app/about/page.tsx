"use client"

import SiteImage from "@/components/SiteImage"

import PhoneContactButton from "@/components/PhoneContactButton";

import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const pillars = [
  {
    num: "01",
    title: "حماية قانونية",
    text: "نعتمد على إجراءات توظيف وعقود واضحة تساعد على تنظيم العلاقة وحماية صاحب العمل والعاملة.",
  },
  {
    num: "02",
    title: "اختيار موثوق",
    text: "نساعدك على الوصول إلى عاملة مناسبة حسب الخبرة والمهارات واللغة وطبيعة احتياجات المنزل.",
  },
  {
    num: "03",
    title: "معالجة أسرع",
    text: "نتابع خطوات التوظيف والتأشيرة والفحوصات والمستندات ضمن مسار منظم وواضح.",
  },
  {
    num: "04",
    title: "دعم مستمر",
    text: "لا تنتهي علاقتنا عند التوظيف، بل نستمر في مساعدتك في أمور العقود والتجديدات وشؤون الخدمة.",
  },
]

const numbers = [
  ["40+", "عاماً من الخبرة"],
  ["آلاف", "العائلات التي خدمناها"],
  ["15+", "جنسية متاحة"],
  ["100%", "تركيز على الإجراءات المنظمة"],
]

const services = [
  ["التدبير المنزلي", "التنظيف والترتيب والغسيل والكي وصيانة المنزل والمهام اليومية."],
  ["الطبخ", "تحضير الوجبات وتنظيم المطبخ والمشتريات حسب احتياجات المنزل."],
  ["رعاية الأطفال", "مساعدة مخصصة للأطفال والإشراف اليومي والأنشطة ورعاية الرضع."],
  ["رعاية كبار السن", "المساعدة في الأنشطة اليومية والرفقة والحركة والرعاية المنزلية."],
  ["إدارة المنزل", "تنسيق أعمال المنزل ومتابعة المهام والإشراف على الموظفين الآخرين."],
  ["متعددة المهارات", "حل منزلي مرن يجمع بين التنظيف والطبخ ورعاية الأطفال والمهام اليومية."],
]

const steps = [
  ["01", "نفهم احتياجك", "نتعرف على احتياجات منزلك وطبيعة العاملة التي تبحث عنها."],
  ["02", "نساعدك في الاختيار", "نقارن الخيارات ونساعدك في الوصول إلى المرشحة الأنسب."],
  ["03", "نتابع الإجراءات", "نتابع المستندات والتأشيرة والفحص والعقد والخطوات المطلوبة."],
  ["04", "تبدأ الخدمة", "تبدأ العاملة عملها مع استمرار الدعم والمتابعة عند الحاجة."],
]

const faqs = [
  [
    "ما الخدمات التي تقدمها AL SAADA؟",
    "نقدم حلول توظيف العمالة المنزلية بدوام كامل في مجالات التدبير المنزلي والطبخ ورعاية الأطفال وكبار السن وإدارة المنزل والعاملات متعددة المهارات.",
  ],
  [
    "هل تساعدون في إجراءات التأشيرة؟",
    "نعم، تشمل الخدمة متابعة إجراءات التأشيرة والفحوصات الطبية والهوية والعقد وفق الحالة والمسار المناسب.",
  ],
  [
    "كيف أختار العاملة المناسبة؟",
    "نبدأ بفهم احتياجاتك ثم نساعدك في الاختيار بناءً على الخبرة والمهارات واللغة ونوع المهام المطلوبة.",
  ],
  [
    "هل الدعم ينتهي بعد التوظيف؟",
    "لا، الهدف هو توفير تجربة مستمرة تشمل المساعدة في الأمور المتعلقة بالعقد والتجديد وشؤون التوظيف.",
  ],
]

export default function AboutPage() {
  const [contact, setContact] = useState({
    whatsapp: "",
    phone: "",
  })

  useEffect(() => {
    fetch("/api/contact", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data) return

        setContact({
          whatsapp: data.whatsapp ?? "",
          phone: data.phone ?? "",
        })
      })
      .catch(() => {})

  }, [])


  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`
    : "#contact"

  const phoneHref = contact.phone
    ? `tel:${contact.phone}`
    : "#contact"

  return (
    <main dir="rtl" className="about-wave-page min-h-screen overflow-hidden text-[#172033]">
      <Navbar />

      {/* HERO */}
      <section className="about-new-hero">

        <div className="about-new-hero-blue">

          <div className="about-new-wave" />



          <div className="about-new-hero-content relative">
              <div className="mt-8 overflow-hidden rounded-[28px] border border-white/15 bg-white/10 shadow-[0_25px_70px_rgba(0,0,0,.16)]">
                <div className="relative h-[280px] w-full md:h-[360px]">
                  <SiteImage
                    page="about" slot={1} fallbackSrc="/images/saada/hero/about-hero.jpg"
                    alt="من نحن"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              </div>
    

            <div className="mb-4 text-[10px] font-black tracking-[3px] text-[#F6B56F]">
              ABOUT AL SAADA
            </div>

            <h1 className="max-w-[560px] text-[40px] font-black leading-[1.2] tracking-[-1.5px] text-white md:text-[58px]">
              شريكك الموثوق
              <br />
              للخدمات المنزلية
              <span className="text-white"> في دبي.</span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[13px] font-semibold leading-[2] text-white/70 md:text-[15px]">
              نساعدك على الوصول إلى العاملة المناسبة من خلال اختيار موثوق،
              إجراءات واضحة، ومتابعة مستمرة من البداية حتى بدء الخدمة.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3">

              <div className="about-new-mini-card">
                <span>01</span>
                <div>
                  <strong className="text-[15px] font-black text-white md:text-[17px]">اختيار موثوق</strong>
                  <small className="mt-1 block text-[11px] font-semibold leading-6 text-white/75 md:text-[12px]">حسب الخبرة والمهارات واحتياجات منزلك.</small>
                </div>
              </div>

              <div className="about-new-mini-card">
                <span>02</span>
                <div>
                  <strong className="text-[15px] font-black text-white md:text-[17px]">إجراءات واضحة</strong>
                  <small className="mt-1 block text-[11px] font-semibold leading-6 text-white/75 md:text-[12px]">نتابع المستندات والتأشيرة والخطوات المطلوبة.</small>
                </div>
              </div>

              <div className="about-new-mini-card">
                <span>03</span>
                <div>
                  <strong className="text-[15px] font-black text-white md:text-[17px]">دعم مستمر</strong>
                  <small className="mt-1 block text-[11px] font-semibold leading-6 text-white/75 md:text-[12px]">نواصل مساعدتك حتى بعد بدء الخدمة.</small>
                </div>
              </div>

              <div className="about-new-mini-card">
                <span>04</span>
                <div>
                  <strong className="text-[15px] font-black text-white md:text-[17px]">تجربة منظمة</strong>
                  <small className="mt-1 block text-[11px] font-semibold leading-6 text-white/75 md:text-[12px]">حلول منزلية مصممة لتكون أبسط وأوضح.</small>
                </div>
              </div>

            </div>



            <div className="mt-8 rounded-[30px] border border-white/15 bg-white/10 p-6 shadow-[0_25px_70px_rgba(0,0,0,.14)] backdrop-blur-xl md:p-8 lg:absolute lg:left-0 lg:top-1/2 lg:z-50 lg:mt-0 lg:w-[380px] lg:-translate-x-[300px] lg:-translate-y-1/2">
              <div className="text-[10px] font-black tracking-[3px] text-[#F6B56F]">
                CONTACT US
              </div>

              <h2 className="mt-3 text-2xl font-black leading-[1.35] text-white md:text-3xl">
                هل لديك سؤال أو تحتاج مساعدة؟
              </h2>

              <p className="mt-4 text-[13px] font-semibold leading-8 text-white/70">
                تواصل معنا لمعرفة العاملات المتاحة، الخدمات المنزلية،
                إجراءات التأشيرة، أو أي تفاصيل تحتاجها قبل البدء.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-[16px] bg-[#25D366] px-5 py-4 text-[12px] font-black text-white shadow-[0_12px_30px_rgba(37,211,102,.20)] transition hover:-translate-y-0.5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[12px] font-black">
                    W
                  </span>
                  تواصل عبر واتساب
                </a>

                <PhoneContactButton
                  phone={contact.phone}
                  className="flex items-center justify-center gap-3 rounded-[16px] bg-[#F6B56F] px-5 py-4 text-[12px] font-black text-white shadow-[0_12px_30px_rgba(246,181,111,.20)] transition hover:-translate-y-0.5"
                >
                  <span className="text-[16px]">
                    ☎
                  </span>
                  اتصل بنا
                </PhoneContactButton>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* STORY */}
      <section className="about-white-section relative py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">

          <div className="mb-12">
            <div className="mb-3 text-[10px] font-black tracking-[3px] text-[#F28C28]">
              OUR STORY
            </div>

            <h2 className="max-w-[780px] text-3xl font-black leading-[1.25] tracking-[-1.4px] md:text-5xl">
              نبني تجربة منزلية
              <span className="text-[#1257D6]"> أسهل وأوضح.</span>
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <article className="about-soft-card lg:col-span-2">
              <p className="text-[14px] font-semibold leading-[2.1] text-black/55 md:text-[15px]">
                AL SAADA هي منصة خدمات منزلية في دبي تركز على مساعدة العائلات في الوصول إلى
                العمالة المنزلية المناسبة بطريقة منظمة وبسيطة.
              </p>

              <p className="mt-5 text-[14px] font-semibold leading-[2.1] text-black/55 md:text-[15px]">
                نؤمن أن اختيار العاملة المناسبة لا يعتمد فقط على توفرها، بل على فهم طبيعة
                المنزل واحتياجات الأسرة والمهارات المطلوبة ثم تقديم الخيارات الأنسب.
              </p>
            </article>

            <article className="about-soft-card about-soft-card-accent">
              <div className="text-[10px] font-black tracking-[2px] text-[#F28C28]">
                OUR APPROACH
              </div>

              <p className="mt-4 text-[13px] font-bold leading-8 text-black/55">
                لذلك نجمع بين الاختيار والمتابعة والإجراءات الواضحة، مع اهتمام حقيقي
                بالتفاصيل التي تجعل تجربة التوظيف أكثر راحة لصاحب العمل والعاملة.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHY — 4 BOXES */}
      <section className="about-blue-wave-section relative py-20 md:py-28">
        <div className="about-wave-light" />

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-8">

          <div className="mb-12">
            <div className="mb-3 text-[10px] font-black tracking-[3px] text-[#F6B56F]">
              WHY AL SAADA
            </div>

            <h2 className="text-3xl font-black text-white md:text-5xl">
              لماذا يختارنا العملاء؟
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <article key={item.num} className="about-blue-card">
                <div className="about-card-icon">
                  {item.num}
                </div>

                <h3 className="mt-8 text-[18px] font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-[12px] font-semibold leading-8 text-white/70">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="about-white-blue-section py-14 md:py-20">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-4 px-5 md:grid-cols-4 md:px-8">
          {numbers.map(([number, label]) => (
            <div key={label} className="about-number-card">
              <div className="text-3xl font-black tracking-[-1px] text-[#1257D6] md:text-5xl">
                {number}
              </div>

              <div className="mt-2 text-[11px] font-bold text-black/45">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="about-wave-white-section relative py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">

          <div className="mb-12">
            <div className="mb-3 text-[10px] font-black tracking-[3px] text-[#F28C28]">
              HOW WE WORK
            </div>

            <h2 className="text-3xl font-black text-[#172033] md:text-5xl">
              من أول تواصل حتى بدء الخدمة.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([num, title, text]) => (
              <article key={num} className="about-step-card">
                <div className="about-step-number">
                  {num}
                </div>

                <h3 className="mt-8 text-[17px] font-black">
                  {title}
                </h3>

                <p className="mt-3 text-[12px] font-semibold leading-8 text-black/50">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — 6 BOXES */}
      <section className="about-blue-wave-section about-services-section relative py-20 md:py-28">
        <div className="about-wave-light about-wave-light-second" />

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-8">

          <div className="mb-12">
            <div className="mb-3 text-[10px] font-black tracking-[3px] text-[#F6B56F]">
              OUR SERVICES
            </div>

            <h2 className="text-3xl font-black text-white md:text-5xl">
              حلول منزلية حسب احتياجك.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, text], index) => (
              <article key={title} className="about-service-card">
                <div className="about-service-icon">
                  0{index + 1}
                </div>

                <h3 className="mt-8 text-[18px] font-black text-white">
                  {title}
                </h3>

                <p className="mt-3 text-[12px] font-semibold leading-8 text-white/70">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[34px] bg-[#1257D6] px-7 py-12 text-white shadow-[0_30px_80px_rgba(18,87,214,.18)] md:px-12 md:py-16">

          <div className="max-w-[820px]">
            <div className="mb-3 text-[10px] font-black tracking-[3px] text-[#F6B56F]">
              AL SAADA
            </div>

            <h2 className="text-3xl font-black leading-[1.3] md:text-5xl">
              مستعد للعثور على العاملة المناسبة؟
            </h2>

            <p className="mt-5 max-w-[760px] text-[13px] font-semibold leading-8 text-white/70">
              تحدث معنا عن احتياجات منزلك وسنساعدك في معرفة الخيارات والإجراءات
              والخطوات المناسبة للبدء.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-maids"
                className="rounded-[15px] bg-[#F28C28] px-7 py-4 text-[13px] font-black text-white transition hover:-translate-y-1 hover:bg-[#E87C1A]"
              >
                ابدأ طلبك الآن
              </Link>

              <Link
                href="/services/maid-visa"
                className="rounded-[15px] border border-white/15 bg-white/10 px-7 py-4 text-[13px] font-black text-white transition hover:-translate-y-1 hover:bg-white/15"
              >
                تعرف على التأشيرة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="about-faq-section py-20 md:py-28">
        <div className="mx-auto max-w-[980px] px-5 md:px-8">

          <div className="mb-12 text-center">
            <div className="mb-3 text-[10px] font-black tracking-[3px] text-[#F28C28]">
              FAQ
            </div>

            <h2 className="text-3xl font-black text-[#172033] md:text-5xl">
              الأسئلة الشائعة
            </h2>

            <p className="mx-auto mt-4 max-w-[620px] text-[12px] font-semibold leading-7 text-black/45">
              إجابات واضحة على أكثر الأسئلة التي قد تحتاج إلى معرفتها قبل بدء الخدمة.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map(([question, answer], index) => (
              <details key={question} className="about-faq-item">
                <summary>
                  <span className="about-faq-number">0{index + 1}</span>
                  <span className="flex-1">{question}</span>
                  <span className="about-faq-plus">+</span>
                </summary>

                <div className="about-faq-answer">
                  {answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
