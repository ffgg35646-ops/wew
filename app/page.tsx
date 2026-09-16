 "use client"

import { useEffect, useState } from "react"

import "./reviews.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const maids = [
  "/images/saada/home-1.jpg",
  "/images/saada/home-2.jpg",
  "/images/saada/home-3.jpg",
]






const questions = [
  "هل تقدمون المساعدة في تأشيرة العاملة؟",
  "هل يمكن توظيف عاملة بدوام جزئي؟",
  "هل يمكنني اختيار جنسية العاملة؟",
  "ما هي تكلفة توظيف عاملة في دبي؟",
]

const reviews = [
  {
    name: "نورة أحمد",
    role: "عميلة من دبي",
    text: "تجربة ممتازة من أول تواصل. ساعدوني في اختيار العاملة المناسبة وكان التعامل راقياً جداً.",
  },
  {
    name: "سارة محمد",
    role: "عميلة من دبي",
    text: "الخدمة كانت سهلة وواضحة، والأهم أن الخيارات كانت مناسبة فعلاً لاحتياجات المنزل.",
  },
  {
    name: "ريم خالد",
    role: "عميلة من دبي",
    text: "فريق محترم وسريع في الرد. التجربة بالكامل كانت أفضل مما توقعت.",
  },
]

const steps = [
  ["01", "أخبرنا باحتياجك", "شاركنا تفاصيل منزلك وما تبحث عنه."],
  ["02", "نقترح الأنسب", "نساعدك في اختيار العاملة المناسبة."],
  ["03", "ابدأ الخدمة", "نتابع معك باقي الإجراءات حتى البداية."],
]

const featuredMaids = [
  {
    name: "فاطمة",
    image: 7,
    experience: "3 سنوات خبرة",
    type: "دوام كامل",
  },
  {
    name: "مريم",
    image: 8,
    experience: "5 سنوات خبرة",
    type: "دوام كامل",
  },
  {
    name: "سارة",
    image: 9,
    experience: "4 سنوات خبرة",
    type: "دوام كامل",
  },
]

export default function Home() {

  useEffect(() => {
    const items = document.querySelectorAll(".services-slide")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main
      dir="rtl"
      className="home-page min-h-screen overflow-hidden bg-[#F7F9FC] text-[#172033]"
    >
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative mt-8 overflow-hidden bg-white pb-12 pt-20 md:mt-10 md:pb-16 md:pt-24">
        <div className="pointer-events-none absolute -right-40 -top-32 h-[620px] w-[620px] rounded-full bg-[#1257D6]/10 blur-[110px]" />
        <div className="pointer-events-none absolute left-[15%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#5B8DEF]/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[-180px] right-[35%] h-[420px] w-[420px] rounded-full bg-[#1257D6]/[0.06] blur-[100px]" />
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            {/* HERO TEXT */}
            <div className="order-2 pt-0 lg:order-1 lg:pt-0">

              <div className="mb-6 flex items-center gap-2 text-[11px] font-normal text-[#F28C28]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F28C28]" />
                خدمة منزلية موثوقة في دبي
              </div>

              <h1 className="mb-7 max-w-[650px] text-[40px] font-medium leading-[1.28] tracking-[-1.4px] text-[#29456F] sm:text-[47px] md:text-[56px]">
                راحة منزلك تبدأ
                <br />
                <span className="text-[#53709A]">
                  بالاختيار الصحيح.
                </span>
              </h1>

              <p className="mb-8 max-w-[530px] text-[14px] font-normal leading-[2.1] text-black/45 md:text-[16px]">
                نساعدك في العثور على عاملة منزلية محترفة وموثوقة
                تناسب احتياجات منزلك، مع متابعة وإجراءات واضحة
                من البداية حتى اكتمال الخدمة.
              </p>

              <div className="mb-10 flex flex-wrap gap-3">
<a
                  href="/get-maids"
                  className="hero-hire-button group relative inline-flex h-[58px] min-w-[235px] items-center justify-center gap-4 rounded-[14px] bg-[#1257D6] px-9 text-[15px] font-extrabold tracking-[-0.2px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.16)] shadow-[0_10px_30px_rgba(18,87,214,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d4dbf] hover:shadow-[0_15px_35px_rgba(18,87,214,0.25)]"
                >
                  <span>
                    توظيف عاملة منزلية
                  </span>

                  <span className="text-[18px] font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </a>
<a
                  href="/services/maid-visa"
                  className="hero-hire-button group relative inline-flex h-[58px] min-w-[235px] items-center justify-center gap-4 rounded-[14px] bg-[#1257D6] px-9 text-[15px] font-extrabold tracking-[-0.2px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.16)] shadow-[0_10px_30px_rgba(18,87,214,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d4dbf] hover:shadow-[0_15px_35px_rgba(18,87,214,0.25)]"
                >
                  <span>
                    احصل على تأشيرة الآن
                  </span>

                  <span className="text-[18px] font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </a>
</div>

              <div className="flex items-center gap-6 text-black/60">
                <div>
                  <div className="text-xl font-normal text-black">
                    3,980+
                  </div>
                  <div className="mt-1 text-[10px] text-black/35">
                    عميل سعيد
                  </div>
                </div>


                <div className="hidden sm:block">
                  <div className="text-xl font-normal text-black">
                    10+
                  </div>
                  <div className="mt-1 text-[10px] text-black/35">
                    سنوات خبرة
                  </div>
                </div>
              </div>
            </div>

            {/* HERO IMAGES */}
            <div className="order-1 relative h-[390px] sm:h-[430px] lg:order-2">

              <div className="absolute right-[7%] top-0 h-[82%] w-[52%] overflow-hidden rounded-[32px] bg-[#f5f2ec] p-3">
                <img
                  src="/assets/new-images/1.jpg"
                  alt="عاملة منزلية"
                  className="h-full w-full rounded-[24px] object-cover object-top transition duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 left-[4%] h-[58%] w-[45%] overflow-hidden rounded-[30px] border-[6px] border-[#f5f2ec] bg-[#f5f2ec] p-3">
                <img
                  src="/assets/new-images/2.jpg"
                  alt="خدمات منزلية"
                  className="h-full w-full rounded-[22px] object-cover object-top transition duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-[13%] right-[34%] z-10 h-[38%] w-[29%] overflow-hidden rounded-[25px] border-[6px] border-[#f5f2ec] bg-[#f5f2ec] p-3 shadow-[0_15px_45px_rgba(0,0,0,0.12)]">
                <img
                  src="/assets/new-images/3.jpg"
                  alt="عاملة منزلية"
                  className="h-full w-full rounded-[18px] object-cover object-top"
                />
              </div>

              {/* GLASS CARD */}
              <div className="absolute left-0 top-[14%] z-20 rounded-[18px] border border-white/70 bg-white p-4 shadow-[0_15px_50px_rgba(0,0,0,0.08)] ">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf2fb] text-sm text-[#1257D6]">
                    ✓
                  </div>

                  <div>
                    <div className="text-[11px] font-medium">
                      موثوقة ومتحقق منها
                    </div>

                    <div className="mt-1 text-[9px] text-black/35">
                      اختيار بعناية
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto max-w-[1320px] px-5 py-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              ["01", "اختيار دقيق", "نختار لك الأنسب"],
              ["02", "خبرة حقيقية", "عاملات مؤهلات"],
              ["03", "إجراءات كاملة", "توظيف وتأشيرة"],
              ["04", "دعم مستمر", "نحن معك دائماً"],
            ].map(([num, title, text]) => (
              <div
                key={num}
                className="flex items-center gap-3 border-black/5 px-3 py-3 md:border-l"
              >
                <span className="text-[9px] text-[#F28C28]">
                  {num}
                </span>

                <div>
                  <div className="text-[11px] font-medium">
                    {title}
                  </div>

                  <div className="mt-1 text-[9px] text-black/30">
                    {text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="overflow-hidden bg-white py-24 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">

          <div className="mb-12 text-center">
            <div className="mb-3 text-[10px] font-bold tracking-[3px] text-[#F28C28]">
              OUR SERVICES
            </div>

            <h2 className="text-3xl font-black tracking-[-1px] text-[#172033] md:text-4xl">
              خدمات توظيف العاملات المنزلية في دبي
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* 01 */}
            <article className="services-slide services-slide-right services-glass-card services-blue-orange services-six-card rounded-[30px] p-7 md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  AL SAADA MAIDS
                </div>

                <h3 className="mb-4 text-[23px] font-black leading-[1.5] text-white md:text-[27px]">
                  خدمة توظيف عاملة منزلية بدوام جزئي أو كامل في دبي
                </h3>

                <p className="text-[12px] font-bold leading-8 text-white/90 md:text-[13px]">
                  وظّف عاملة منزلية بدوام جزئي لإنجاز المهام المنزلية المهمة.
                </p>
              </div>
            </article>

            {/* 02 */}
            <article className="services-slide services-slide-left services-glass-card services-orange-blue services-six-card rounded-[30px] p-7 md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M12 3l2.8 5.7L21 9.6l-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3z" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  WHY AL SAADA
                </div>

                <h3 className="mb-4 text-[23px] font-black leading-[1.5] text-white md:text-[27px]">
                  أفضل خدمة توظيف عاملة منزلية في دبي
                </h3>

                <p className="text-[12px] font-bold leading-8 text-white/90 md:text-[13px]">
                  هل تبحث عن مساعدة منزلية في دبي؟ نقدم مساعدات منزليات مدربات بشكل احترافي وذوات خبرة، ونساعدك في اختيار الحل الأنسب لاحتياجاتك المنزلية.
                </p>
              </div>
            </article>

            {/* 03 */}
            <article className="services-slide services-slide-right services-glass-card services-orange-blue services-six-card rounded-[30px] p-7 md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M4 12h16M12 4v16" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  FULL TIME
                </div>

                <h3 className="mb-4 text-[23px] font-black leading-[1.5] text-white md:text-[27px]">
                  خدمة توظيف عاملة منزلية بدوام كامل في دبي
                </h3>

                <p className="text-[12px] font-bold leading-8 text-white/90 md:text-[13px]">
                  احصل على خدمة توظيف عاملة منزلية بدوام كامل لمنزلك أو فيلتك أو شقتك في دبي.
                </p>
              </div>
            </article>

            {/* 04 */}
            <article className="services-slide services-slide-left services-glass-card services-blue-orange services-six-card rounded-[30px] p-7 md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M6 4h12v16H6z" />
                  <path d="M9 8h6M9 12h6M9 16h4" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  CHOOSE SMART
                </div>

                <h3 className="mb-4 text-[23px] font-black leading-[1.5] text-white md:text-[27px]">
                  استعن بأفضل عاملة منزلية في دبي
                </h3>

                <p className="text-[12px] font-bold leading-8 text-white/90 md:text-[13px]">
                  عاملاتنا المنزلية المدربات بشكل احترافي سيجعلن الحياة أسهل بكثير من خلال الاعتناء بالمهام المنزلية اليومية.
                </p>
              </div>
            </article>

            {/* 05 */}
            <article className="services-slide services-slide-right services-glass-card services-blue-orange services-six-card rounded-[30px] p-7 md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M4 7h16M7 3v4M17 3v4M5 11h14M5 15h8M5 19h6" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  CLEAR PRICING
                </div>

                <h3 className="mb-4 text-[23px] font-black leading-[1.5] text-white md:text-[27px]">
                  أسعار شفافة / توصيل مجاني
                </h3>

                <p className="text-[12px] font-bold leading-8 text-white/90 md:text-[13px]">
                  شركة AL SAADA Maids هي شريكك الموثوق في خدمة توظيف العاملات المنزلية في دبي مع أسعار واضحة وتجربة منظمة.
                </p>
              </div>
            </article>

            {/* 06 */}
            <article className="services-slide services-slide-left services-glass-card services-orange-blue services-six-card rounded-[30px] p-7 md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M7 3h10v18H7z" />
                  <path d="M9.5 7h5M9.5 11h5M9.5 15h3" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  VISA SUPPORT
                </div>

                <h3 className="mb-4 text-[23px] font-black leading-[1.5] text-white md:text-[27px]">
                  أسرع موافقات على تأشيرات العاملات المنزلية
                </h3>

                <p className="text-[12px] font-bold leading-8 text-white/90 md:text-[13px]">
                  نتعامل مع متطلبات تأشيرة العاملة المنزلية ونساعدك في استكمال الإجراءات المطلوبة بطريقة واضحة ومنظمة.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* LOCATION / GOOGLE MAP */}
      <section className="border-y border-[#E8EDF4] bg-[#F7F9FC] py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">

          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="mb-3 text-[10px] font-medium tracking-[3px] text-[#F28C28]">
                OUR LOCATION
              </div>

              <h2 className="text-3xl font-normal tracking-[-1px] text-[#172033] md:text-4xl">
                موقعنا في دبي
              </h2>

              <p className="mt-4 max-w-[520px] text-[12px] leading-7 text-black/40">
                يمكنك مشاهدة موقعنا مباشرة على الخريطة أو فتح
                الموقع في Google Maps للحصول على الاتجاهات.
              </p>
            </div>

            <a
              href="https://www.google.com/maps?ll=25.199877,55.248423&z=15&t=m&hl=en&gl=US&mapclient=embed&cid=17665367873827462439"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-[#1257D6] px-6 py-3.5 text-[11px] font-normal text-white transition hover:bg-[#F28C28]"
            >
              فتح الموقع في Google Maps
              <span className="text-[13px]">↗</span>
            </a>

          </div>

          
          <div className="location-map-cta-grid">

            <div className="location-map-card">
<div className="overflow-hidden rounded-[28px] border border-[#E3E9F2] bg-white p-2 shadow-[0_20px_60px_rgba(18,87,214,0.08)]">

            <div className="relative h-[380px] overflow-hidden rounded-[22px] md:h-[500px]">

              <iframe
                title="AL SAADA Dubai Location"
                src="https://www.google.com/maps?q=25.199877,55.248423&z=15&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

            </div>

          </div>
            </div>

<div className="location-cta-card relative mx-auto max-w-[1320px] overflow-hidden rounded-[32px] bg-[#1257D6]">

          <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#F28C28]/20 blur-[90px]" />

          <div className="relative px-6 py-20 text-center md:px-10 md:py-24">
            <div className="mb-5 text-[10px] tracking-[3px] text-[#F28C28]">
              GET STARTED
            </div>

            <h2 className="mb-5 text-3xl font-normal leading-[1.4] text-white md:text-5xl">
              جاهز تجد المساعدة
              <br />
              <span className="text-[#1257D6]">
                المناسبة لمنزلك؟
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-[480px] text-[12px] leading-7 text-white/35">
              تحدث معنا وسنساعدك في معرفة الخيارات المناسبة
              والخطوات المطلوبة.
            </p>

            <a
              href="#"
              className="inline-flex rounded-full bg-[#F28C28] px-8 py-3.5 text-[11px] font-medium text-white transition hover:bg-[#1257D6]"
            >
              احصل على تأشيرة
            </a>

            <div className="mt-5 text-center text-[13px] font-black text-[#172033]">
              معالجة سريعة + دعم متكامل
            </div>
          </div>
        </div>

          </div>


          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#E8EDF4] bg-white px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1257D6]">
                <span className="text-sm">⌖</span>
              </div>

              <div>
                <div className="text-[11px] font-medium text-[#172033]">
                  دبي، الإمارات العربية المتحدة
                </div>

                <div className="mt-1 text-[9px] text-black/30">
                  موقعنا على Google Maps
                </div>
              </div>

            </div>

            <a
              href="https://www.google.com/maps?ll=25.199877,55.248423&z=15&t=m&hl=en&gl=US&mapclient=embed&cid=17665367873827462439"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-normal text-[#1257D6] transition hover:text-[#F28C28]"
            >
              عرض التفاصيل والاتجاهات ←
            </a>

          </div>

        </div>
      </section>


      {/* REVIEWS */}
      <section className="overflow-hidden bg-[#F7F9FC] py-24 md:py-28">

        <div className="mx-auto mb-14 max-w-[1320px] px-5 text-center md:px-8">

          <div className="mb-3 text-[10px] font-medium tracking-[3px] text-[#F28C28]">
            CLIENT REVIEWS
          </div>

          <h2 className="text-3xl font-normal tracking-[-1px] text-[#172033] md:text-4xl">
            تجارب عملائنا
          </h2>

          <p className="mx-auto mt-4 max-w-[500px] text-[12px] leading-7 text-black/40">
            آراء حقيقية من عملاء اختاروا خدماتنا للحصول على
            تجربة أسهل وأكثر راحة.
          </p>

          <div className="mt-5 text-sm tracking-[3px] text-[#F28C28]">
            ★★★★★
            <span className="mr-2 text-[11px] tracking-normal text-black/35">
              4.8 من 5
            </span>
          </div>

        </div>

        {/* الصف الأول - عربي */}
        <div className="review-marquee mb-5">
          <div className="review-track review-track-right">

            {[
              ["نورة أحمد", "دبي", "تجربة ممتازة من البداية للنهاية. ساعدوني في اختيار العاملة المناسبة وكانت الإجراءات واضحة جداً."],
              ["سارة محمد", "دبي", "الخدمة كانت سريعة واحترافية، والأهم أن الاختيارات كانت مناسبة فعلاً لاحتياجات المنزل."],
              ["ريم خالد", "دبي", "فريق محترم جداً وسريع في الرد. التجربة بالكامل كانت أسهل بكثير مما توقعت."],
              ["مريم علي", "دبي", "أعجبني الاهتمام بالتفاصيل والمتابعة المستمرة حتى بعد اختيار العاملة."],
              ["نورة أحمد", "دبي", "تجربة ممتازة من البداية للنهاية. ساعدوني في اختيار العاملة المناسبة وكانت الإجراءات واضحة جداً."],
              ["سارة محمد", "دبي", "الخدمة كانت سريعة واحترافية، والأهم أن الاختيارات كانت مناسبة فعلاً لاحتياجات المنزل."],
              ["ريم خالد", "دبي", "فريق محترم جداً وسريع في الرد. التجربة بالكامل كانت أسهل بكثير مما توقعت."],
              ["مريم علي", "دبي", "أعجبني الاهتمام بالتفاصيل والمتابعة المستمرة حتى بعد اختيار العاملة."],
            ].map(([name, city, text], i) => (

              <div
                key={`ar-${i}`}
                className="w-[310px] shrink-0 rounded-[24px] border border-[#E8EDF4] bg-white p-6 shadow-[0_10px_35px_rgba(20,50,90,0.04)] md:w-[390px]"
              >

                <div className="mb-5 flex items-center justify-between">
                  <div className="text-[12px] tracking-[3px] text-[#F28C28]">
                    ★★★★★
                  </div>

                  <span className="rounded-full bg-[#F3F7FC] px-3 py-1.5 text-[9px] text-[#1257D6]">
                    عميلة
                  </span>
                </div>

                <p className="mb-6 text-[12px] leading-7 text-black/50">
                  “{text}”
                </p>

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF] text-xs font-medium text-[#1257D6]">
                    {name.charAt(0)}
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-[#172033]">
                      {name}
                    </div>

                    <div className="mt-1 text-[9px] text-black/30">
                      {city}
                    </div>
                  </div>

                </div>

              </div>

            ))}

          </div>
        </div>

        {/* الصف الثاني - English */}
        <div className="review-marquee">

          <div className="review-track review-track-left">

            {[
              ["Sarah M.", "Dubai", "Very professional service. The team helped us find a suitable maid and made the whole process simple."],
              ["Emma R.", "Dubai", "Excellent experience from start to finish. Communication was clear and the support was very helpful."],
              ["Lina K.", "Dubai", "Everything was organized and easy. I really appreciated the follow-up and attention to detail."],
              ["Maya A.", "Dubai", "A smooth and professional experience. The available options were exactly what we needed."],
              ["Sarah M.", "Dubai", "Very professional service. The team helped us find a suitable maid and made the whole process simple."],
              ["Emma R.", "Dubai", "Excellent experience from start to finish. Communication was clear and the support was very helpful."],
              ["Lina K.", "Dubai", "Everything was organized and easy. I really appreciated the follow-up and attention to detail."],
              ["Maya A.", "Dubai", "A smooth and professional experience. The available options were exactly what we needed."],
            ].map(([name, city, text], i) => (

              <div
                key={`en-${i}`}
                dir="ltr"
                className="w-[310px] shrink-0 rounded-[24px] border border-[#E8EDF4] bg-white p-6 shadow-[0_10px_35px_rgba(20,50,90,0.04)] md:w-[390px]"
              >

                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full bg-[#F3F7FC] px-3 py-1.5 text-[9px] text-[#1257D6]">
                    Verified
                  </span>

                  <div className="text-[12px] tracking-[3px] text-[#F28C28]">
                    ★★★★★
                  </div>
                </div>

                <p className="mb-6 text-[12px] leading-7 text-black/50">
                  “{text}”
                </p>

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF] text-xs font-medium text-[#1257D6]">
                    {name.charAt(0)}
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-[#172033]">
                      {name}
                    </div>

                    <div className="mt-1 text-[9px] text-black/30">
                      {city}
                    </div>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <Footer />
    </main>
  )
}