import SiteImage from "@/components/SiteImage"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const includes = [
  "الهوية الإماراتية والتأمين الصحي",
  "صفر التزامات قانونية، نحن نتولى كل شيء",
  "بطاقة WPS لإدارة الرواتب بشكل آمن",
  "خدمات PRO كاملة: الأوراق، إجراءات السفارة، رفع الحظر، والمزيد",
  "العاملة تعمل حصريًا لك تحت تأشيرتنا",
]

const comparisonRows = [
  {
    label: "أقل قيمة وديعة تأمين",
    "AL SAADA": "أسهل وأقل التزام مالي.",
    other: "مبالغ تأمين إضافية مرتفعة وعبء مالي أكبر.",
  },
  {
    label: "توصيل العاملة حتى باب منزلك",
    "AL SAADA": "مجاناً لجميع الإمارات.",
    other: "خدمة مأجورة ورسوم إضافية.",
  },
  {
    label: "استرداد المبلغ في حال عدم الرغبة",
    "AL SAADA": "استرجاع كامل المبلغ بكل شفافية.",
    other: "خصومات واقتطاعات من الأجور.",
  },
  {
    label: "استبدال العاملة خلال العقد",
    "AL SAADA": "استبدال فوري بدون رسوم.",
    other: "رسوم تبديل ومعاملات إضافية.",
  },
  {
    label: "فترة التجربة",
    "AL SAADA": "تجربة مجانية تضمن ملاءمة العاملة.",
    other: "فترة مدفوعة وغير مرنة.",
  },
  {
    label: "إنجاز المعاملات والعقود",
    "AL SAADA": "إلكترونياً 100% عبر الواتساب.",
    other: "زيارات متعددة وانتظار طويل.",
  },
  {
    label: "دعم ومتابعة ما بعد الوصول",
    "AL SAADA": "خدمة عملاء ومتابعة على مدار الساعة.",
    other: "ينتهي الدعم فور استلام العاملة.",
  },
  {
    label: "الفحص الطبي والتدريب المسبق",
    "AL SAADA": "عاملات مؤهلات ومفحوصات طبياً بعناية.",
    other: "تدريب غير مضمون وتأخير بالفحوصات.",
  },
]


const costBenefits = [
  "3,500 درهم إماراتي كحد أدنى",
  "خطة أقساط سهلة على 5 أشهر",
  "راتب العاملة 1,000 درهم شهريًا",
  "ضمان تأشيرة لمدة سنتين",
  "حل ميسّر وشفاف للتكلفة",
]

const processBenefits = [
  "نتولى جميع المعاملات الورقية",
  "العاملة المنزلية تكون تحت كفالتنا",
  "عملية تأشيرة خالية من المتاعب",
  "نلبي جميع احتياجاتك",
  "نتابع الإجراءات حتى إتمامها",
]

const alSaadaBenefits = [
  "إصدار بطاقة هوية إماراتية للعاملة",
  "تأمين صحي مشمول",
  "بطاقة WPS لرواتب مؤمّنة",
  "تحويل رواتب شهري تلقائي",
  "لا حاجة إلى إيداع",
]

const nationalities = [
  "العاملات الفلبينيات",
  "العاملات الإندونيسيات",
  "العاملات الإثيوبيات",
  "العاملات الأفريقيات",
]

const visaSteps = [
  {
    number: "1",
    title: "تواصل معنا",
    text: "اتصل بنا أو املأ النموذج الموجود على الموقع لبدء إجراءات التأشيرة.",
  },
  {
    number: "2",
    title: "أرسل المستندات",
    text: "أرسل جميع المستندات المطلوبة عبر واتساب أو خدمة البريد.",
  },
  {
    number: "3",
    title: "نقدّم الطلب",
    text: "يتولى فريقنا إجراءات طلب تأشيرة العاملة التي تختارها.",
  },
  {
    number: "4",
    title: "ابدأ الخدمة",
    text: "بعد إتمام الإجراءات تحصل على عاملة منزلية محترفة وذات خبرة.",
  },
]

const faqs = [
  {
    q: "كم تبلغ تكلفة تأشيرة العاملة المنزلية في الإمارات؟",
    a: "تبدأ تكلفة التأشيرة من 3,500 درهم إماراتي كحد أدنى، ويبلغ راتب العاملة 1,000 درهم شهريًا. تختلف الإجراءات النهائية حسب الحالة والمتطلبات.",
  },
  {
    q: "هل يمكن لحامل التأشيرة الذهبية كفالة عاملة منزلية في الإمارات؟",
    a: "نعم، الصفحة الأصلية توضح توفر خدمات تأشيرة العاملات المنزلية لحاملي التأشيرة الذهبية، بما في ذلك خدمات التجديد.",
  },
  {
    q: "كيف أحصل على تأشيرة عاملة منزلية في الإمارات؟",
    a: "تبدأ بالتواصل مع الفريق وإرسال المستندات المطلوبة، ثم يتم التعامل مع إجراءات الطلب حتى إتمام المعاملة.",
  },
  {
    q: "ما هي متطلبات تأشيرة العاملة المنزلية في الإمارات؟",
    a: "المتطلبات تختلف حسب الحالة ونوع المعاملة. يتم توضيح المستندات المطلوبة أثناء بدء الطلب.",
  },
]

export default function MaidVisaPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F7F9FC] text-[#172033]"
    >
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F7F9FC] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-[#1257D6]/10 bg-[#1257D6]/[0.07] px-4 py-2 text-sm font-black text-[#1257D6]">
              تأشيرة عاملة منزلية في الإمارات
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.12] tracking-[-1.5px] md:text-6xl">
              احصل على تأشيرة
              <br />
              <span className="text-[#1257D6]">
                عاملة لمدة سنتين في أسبوعين فقط!
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              ابتداءً من 3,500 درهم إماراتي كحد أدنى، مع راتب شهري للعاملة قدره 1,000 درهم،
              مع خدمة متكاملة ومتابعة للإجراءات.
            </p>

            <div className="mt-7">
              <div className="mb-3 text-sm font-black text-slate-900">
                ما المتضمن:
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1257D6] text-xs font-black text-white">
                      ✓
                    </span>

                    <span className="text-sm font-bold leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="rounded-2xl bg-[#1257D6] px-7 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(18,87,214,0.18)]"
              >
                اتصل بنا الآن
              </Link>

              <a
                href="https://api.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[#25D366] px-7 py-4 text-sm font-black text-white"
              >
                تواصل عبر واتساب
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-[#F6B56F]/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-[#1257D6]/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[40px] bg-white p-3 shadow-[0_30px_80px_rgba(23,32,51,0.14)]">
              <div className="grid grid-cols-3 gap-2 rounded-[32px] bg-[#F7F9FC] p-3">
                <div className="relative h-[420px] overflow-hidden rounded-3xl bg-white">
                  <SiteImage
                    page="maid-visa" slot={1} fallbackSrc="/images/saada/visa-main.png"
                    alt="عاملة منزلية"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="relative mt-10 h-[380px] overflow-hidden rounded-3xl bg-white">
                  <SiteImage
                    page="maid-visa" slot={2} fallbackSrc="/assets/maid-visa/maid-3.png"
                    alt="عاملة منزلية"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="relative h-[420px] overflow-hidden rounded-3xl bg-white">
                  <SiteImage
                    page="maid-visa" slot={3} fallbackSrc="/assets/maid-visa/maid-1.png"
                    alt="عاملة منزلية"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-2xl bg-white px-5 py-4">
                <div>
                  <div className="text-xs font-bold text-slate-400">
                    AL SAADA
                  </div>
                  <div className="mt-1 font-black">
                    خدمة متكاملة لمدة سنتين
                  </div>
                </div>

                <div className="rounded-xl bg-[#1257D6]/10 px-3 py-2 text-sm font-black text-[#1257D6]">
                  2 Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RATING */}
      <section className="px-5 py-6 md:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <span className="text-2xl font-black">4.8</span>
            <span className="text-[#F6B56F]">★★★★★</span>
            <span className="text-sm font-bold text-slate-500">
              3,980 تقييم على Google
            </span>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center">
            <p className="text-sm font-black text-[#1257D6]">
              لماذا السعادة؟
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              ما الذي يجعل AL SAADA خيارك المفضل؟
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[920px] border-collapse text-right">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-5 text-sm font-black text-slate-500">
                    الميزة والخدمة
                  </th>
                  <th className="bg-[#1257D6] p-5 text-sm font-black text-white">
                    مكتب السعادة
                  </th>
                  <th className="p-5 text-sm font-black text-slate-700">
                    المكاتب والوكالات الأخرى
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="p-5 align-top text-sm font-black text-slate-800">
                      {row.label}
                    </td>

                    <td className="bg-[#1257D6]/[0.04] p-5 align-top text-sm font-semibold text-slate-700">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1257D6] text-xs font-black text-white">
                          ✓
                        </span>

                        <span>
                          {row["AL SAADA"]}
                        </span>
                      </div>
                    </td>

                    <td className="p-5 align-top text-sm leading-7 text-slate-500">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-400">
                          ✕
                        </span>

                        <span>
                          {row.other}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-3xl bg-[#1257D6] p-7 text-white md:p-9">
            <p className="text-sm font-black text-white/70">
              راحة البال
            </p>

            <p className="mt-3 max-w-4xl text-sm font-bold leading-8 md:text-base">
              تحرص في مكتب السعادة على تقديم تجربة استقدام استثنائية ترتكز على
              المصداقية والراحة الكاملة لجميع عملائنا في مختلف إمارات الدولة.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN BENEFITS */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="أقل تكلفة لتأشيرة عاملة في الإمارات"
              items={costBenefits}
            />

            <FeatureCard
              title="عملية تأشيرة مفصّلة باحتراف"
              items={processBenefits}
            />

            <FeatureCard
              title="مزايا حصرية مع AL SAADA"
              items={alSaadaBenefits}
            />
          </div>
        </div>
      </section>

      {/* DUBAI VISA */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-black text-[#1257D6]">
              Maid Visa Service Dubai
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              تأشيرة عاملة منزلية في الإمارات
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500 md:text-base">
              تبحث عن أفضل خدمة إصدار تأشيرة عاملة منزلية في الإمارات؟ أنت في المكان
              الصحيح. نوفر لك خدمة متكاملة لمعالجة التأشيرة مع فريق محترف
              يهتم بكل التفاصيل ويساعدك في إتمام الإجراءات.
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-500 md:text-base">
              سواء كنت تحتاج عاملة منزلية بدوام كامل أو جزئي، نساعدك على الوصول
              إلى الحل المناسب مع إجراءات واضحة ودعم مستمر.
            </p>

            <div className="mt-7">
              <Link
                href="/#contact"
                className="inline-flex rounded-2xl bg-[#1257D6] px-7 py-4 text-sm font-black text-white"
              >
                اتصل بنا الآن
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px]">
            <SiteImage
              page="maid-visa" slot={4} fallbackSrc="/assets/maid-visa/get-maid-visa.webp"
              alt="احصل على تأشيرة عاملة منزلية"
              width={1000}
              height={560}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ALL NATIONALITIES */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[32px]">
            <SiteImage
              page="maid-visa" slot={5} fallbackSrc="/assets/maid-visa/whatsapp-visa.webp"
              alt="إرسال المستندات عبر واتساب"
              width={1000}
              height={560}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-black text-[#1257D6]">
              All Nationalities
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              موافقات تأشيرة لجميع الجنسيات
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500 md:text-base">
              عند التعامل مع AL SAADA Maids يمكنك طلب العاملة من البلد الذي
              ترغب فيه، مع مساعدة فريقنا في إجراءات التأشيرة والمعاملة.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {nationalities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-[#F7F9FC] p-4 text-sm font-black"
                >
                  <span className="ml-2 text-[#1257D6]">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7">
              <Link
                href="/#contact"
                className="inline-flex rounded-2xl bg-[#1257D6] px-7 py-4 text-sm font-black text-white"
              >
                اتصل بنا الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GOLDEN VISA */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black text-[#1257D6]">
              Golden Visa
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              تأشيرة عاملة منزلية لحاملي التأشيرة الذهبية
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500 md:text-base">
              نوفر خدمات تأشيرة العاملات المنزلية لحاملي التأشيرة الذهبية في
              الإمارات، بما في ذلك إجراءات التجديد والمتابعة.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "خدمات تأشيرة عاملة منزلية لحاملي التأشيرة الذهبية",
                "المساعدة في إجراءات الكفالة",
                "العثور على مربية أو عاملة منزلية",
                "تأشيرة سريعة وبسعر مناسب",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 text-sm font-bold text-slate-700"
                >
                  <span className="text-[#1257D6]">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7">
              <Link
                href="/#contact"
                className="inline-flex rounded-2xl bg-[#1257D6] px-7 py-4 text-sm font-black text-white"
              >
                اتصل بنا الآن
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px]">
            <SiteImage
              fallbackSrc="/assets/maid-visa/maid-visa-dubai.webp"
              alt="تأشيرة عاملة منزلية في الإمارات"
              width={1000}
              height={560}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHATSAPP */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="overflow-hidden rounded-[32px]">
            <SiteImage
              page="maid-visa" slot={5} fallbackSrc="/assets/maid-visa/whatsapp-visa.webp"
              alt="إرسال المستندات عبر واتساب"
              width={1000}
              height={560}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-black text-[#1257D6]">
              WhatsApp Application
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              أرسل لنا كل شيء على واتساب لطلب التأشيرة
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500 md:text-base">
              أصبح التقديم لتأشيرة العاملة المنزلية أسهل. يمكنك إرسال المستندات
              المطلوبة عبر واتساب، ويتولى فريقنا المتخصص بقية الإجراءات.
            </p>

            <div className="mt-7">
              <a
                href="https://api.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-2xl bg-[#25D366] px-7 py-4 text-sm font-black text-white"
              >
                تواصل معنا على واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4 STEPS */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center">
            <p className="text-sm font-black text-[#1257D6]">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              احصل على تأشيرة عاملة منزلية في 4 خطوات سهلة
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-8 text-slate-500 md:text-base">
              نوفر لك إجراءات واضحة ومبسطة تبدأ بالتواصل وتنتهي بالحصول على
              الخدمة المطلوبة.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {visaSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1257D6] text-lg font-black text-white">
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-8 text-slate-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1320px] rounded-[36px] bg-[#1257D6] p-8 text-center text-white md:p-14">
          <p className="text-sm font-black text-white/70">
            AL SAADA Maids
          </p>

          <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            أفضل وكالة تأشيرات عاملات بالقرب منك
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-white/80 md:text-base">
            نوفر خدمات تأشيرة العاملة المنزلية في الإمارات للمواطنين وحاملي التأشيرة
            الذهبية، مع إمكانية إتمام العديد من الخطوات عبر واتساب.
          </p>

          <div className="mt-8">
            <Link
              href="/#contact"
              className="inline-flex rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#1257D6]"
            >
              اتصل بنا اليوم
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <p className="text-sm font-black text-[#1257D6]">
              الأسئلة الشائعة
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              أسئلة حول تأشيرة العاملة المنزلية
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none font-black">
                  <div className="flex items-center justify-between gap-4">
                    <span>{faq.q}</span>

                    <span className="text-2xl text-[#1257D6] transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>

                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-8 text-slate-500">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function FeatureCard({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <article className="rounded-[32px] border border-slate-200 bg-[#F7F9FC] p-7 md:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1257D6] text-xl font-black text-white">
        ✓
      </div>

      <h3 className="mt-6 text-2xl font-black leading-tight">
        {title}
      </h3>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-3 text-sm font-semibold leading-7 text-slate-600"
          >
            <span className="font-black text-[#1257D6]">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
