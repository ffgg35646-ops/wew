"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Contact = {
  whatsapp: string
  phone: string
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.59 5.96L.06 24l6.28-1.64a11.88 11.88 0 0 0 5.71 1.46h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.23-6.15-3.43-8.44Zm-8.46 18.34h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.73.97 1-3.64-.23-.37a9.85 9.85 0 0 1-1.51-5.3c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.89 9.9Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.73-1.64-2.03-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.28a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"/>
    </svg>
  )
}

export default function Footer() {
  const [contact, setContact] = useState<Contact>({
    whatsapp: "",
    phone: "",
  })

  useEffect(() => {
    fetch("/api/contact", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return
        setContact({
          whatsapp: data.whatsapp ?? "",
          phone: data.phone ?? "",
        })
      })
      .catch(() => {})
  }, [])

  const whatsapp = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`
    : "#"

  const phone = contact.phone ? `tel:${contact.phone}` : "#"

  return (
    <footer dir="rtl" className="bg-[#172033] text-white">
      <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src="/images/saada/logo.svg"
                alt="Al Saada"
                className="h-11 w-auto max-w-[180px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-[330px] text-[13px] font-semibold leading-8 text-white/60">
              خدمات منزلية موثوقة، عاملات باختيارات واضحة، وإجراءات منظمة
              لمساعدتك في الوصول إلى الحل المناسب لمنزلك.
            </p>
          </div>

          <div>
            <h3 className="text-[14px] font-black text-white">
              روابط سريعة
            </h3>

            <div className="mt-5 grid gap-3 text-[13px] font-bold text-white/65">
              <Link href="/" className="transition hover:text-white">
                الرئيسية
              </Link>

              <Link href="/about" className="transition hover:text-white">
                من نحن
              </Link>

              <Link href="/nationalities" className="transition hover:text-white">
                الجنسيات
              </Link>

              <Link href="/get-maids" className="transition hover:text-white">
                العاملات
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-black text-white">
              خدماتنا
            </h3>

            <div className="mt-5 grid gap-3 text-[13px] font-bold text-white/65">
              <Link href="/full-time-maid-service" className="transition hover:text-white">
                عاملة بدوام كامل
              </Link>

              <Link href="/services/maid-visa" className="transition hover:text-white">
                تأشيرة عاملة منزلية
              </Link>

              <Link href="/get-maids" className="transition hover:text-white">
                استعراض العاملات
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-black text-white">
              تواصل معنا
            </h3>

            <p className="mt-4 text-[12px] font-semibold leading-7 text-white/55">
              نحن هنا لمساعدتك في معرفة الخدمات والخيارات المناسبة.
            </p>

            <div className="mt-5 grid gap-3">

              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-4 py-3 text-[12px] font-black text-white transition hover:-translate-y-0.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <WhatsAppIcon />
                </span>
                <span>تواصل عبر واتساب</span>
              </a>

              <a
                href={phone}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[12px] font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <PhoneIcon />
                </span>
                <span>اتصل بنا</span>
              </a>

            </div>
          </div>

        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-[11px] font-bold text-white/40 md:flex-row md:items-center md:justify-between">
          <span>
            AL SAADA © 2026 — جميع الحقوق محفوظة
          </span>

          <Link href="/about" className="transition hover:text-white">
            من نحن
          </Link>
        </div>

      </div>
    </footer>
  )
}
