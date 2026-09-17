"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type PhoneContactButtonProps = {
  phone?: string;
  className?: string;
  title?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function PhoneContactButton({
  phone,
  className = "",
  title = "اتصل بنا",
  ariaLabel = "Call",
  children,
}: PhoneContactButtonProps) {
  const [open, setOpen] = useState(false);
  const [resolvedPhone, setResolvedPhone] = useState(phone ?? "");
  const [loading, setLoading] = useState(false);

  async function handleOpen() {
    setOpen(true);

    if (resolvedPhone) return;

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        cache: "no-store",
      });

      const data = await response.json();

      if (response.ok) {
        setResolvedPhone(data.phone ?? "");
      }
    } catch {
      setResolvedPhone("");
    } finally {
      setLoading(false);
    }
  }

  const telPhone = resolvedPhone
    ? `tel:${resolvedPhone.replace(/[^0-9+]/g, "")}`
    : "#";

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        title={title}
        onClick={handleOpen}
        className={className}
      >
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/35 p-5 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            dir="rtl"
            className="w-full max-w-[360px] rounded-[24px] border border-white/70 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,.20)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F4FF] text-[#397EA9]">
                ☎
              </div>

              <h3 className="mt-4 text-lg font-black text-[#172033]">
                رقم الهاتف
              </h3>

              {loading ? (
                <p className="mt-3 text-sm font-bold text-slate-400">
                  جاري تحميل الرقم...
                </p>
              ) : resolvedPhone ? (
                <>
                  <div className="mt-3 rounded-[16px] bg-[#F4F9FD] px-4 py-3 text-center text-lg font-black tracking-wide text-[#397EA9]">
                    {resolvedPhone}
                  </div>

                  <a
                    href={telPhone}
                    className="mt-4 flex items-center justify-center rounded-[15px] bg-[#F6B56F] px-5 py-3.5 text-sm font-black text-white shadow-[0_10px_25px_rgba(246,181,111,.20)] transition hover:-translate-y-0.5"
                  >
                    اتصال الآن
                  </a>
                </>
              ) : (
                <p className="mt-3 text-sm font-bold text-slate-400">
                  لا يوجد رقم هاتف مضاف حاليًا
                </p>
              )}

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 w-full rounded-[15px] border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-black text-slate-500 transition hover:bg-slate-100"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
