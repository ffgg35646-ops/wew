"use client"

import type { ImgHTMLAttributes } from "react"
import { useEffect, useState } from "react"

type SiteImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "slot"
> & {
  page?: string | number
  slot?: string | number
  fallbackSrc: string | number

  fill?: boolean
  priority?: boolean
  sizes?: string
  quality?: number | `${number}`
  unoptimized?: boolean
}

const pageCache = new Map<string, Record<number, string>>()
const pageRequests = new Map<
  string,
  Promise<Record<number, string>>
>()

function browserCacheKey(page: string) {
  return `maidora-site-images:${page}`
}

function readBrowserCache(
  page: string
): Record<number, string> {
  if (typeof window === "undefined") {
    return {}
  }

  try {
    const raw = window.localStorage.getItem(
      browserCacheKey(page)
    )

    if (!raw) {
      return {}
    }

    const parsed = JSON.parse(raw)

    if (!parsed || typeof parsed !== "object") {
      return {}
    }

    const result: Record<number, string> = {}

    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string" && value) {
        result[Number(key)] = value
      }
    }

    return result
  } catch {
    return {}
  }
}

function writeBrowserCache(
  page: string,
  images: Record<number, string>
) {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(
      browserCacheKey(page),
      JSON.stringify(images)
    )
  } catch {}
}

async function refreshPageImages(page: string) {
  const existing = pageRequests.get(page)

  if (existing) {
    return existing
  }

  const request: Promise<Record<number, string>> = fetch(
    `/api/site-images?page=${encodeURIComponent(page)}`,
  )
    .then(async (response): Promise<Record<number, string>> => {
      if (!response.ok) {
        return pageCache.get(page) ?? readBrowserCache(page)
      }

      const data = await response.json()
      const map: Record<number, string> = {}

      for (const item of data.items ?? []) {
        map[Number(item.slot)] = String(item.url)
      }

      pageCache.set(page, map)
      writeBrowserCache(page, map)

      return map
    })
    .catch((): Record<number, string> => {
      return pageCache.get(page) ?? readBrowserCache(page)
    })
    .finally(() => {
      pageRequests.delete(page)
    })

  pageRequests.set(page, request)

  return request
}

export default function SiteImage({
  page,
  slot,
  fallbackSrc,
  alt = "",
  fill,
  priority: _priority,
  sizes: _sizes,
  quality: _quality,
  unoptimized: _unoptimized,
  className = "",
  style,
  ...props
}: SiteImageProps) {
  // الصورة الاحتياطية تظهر فورًا.
  // صورة الأدمن تُستبدل في الخلفية عند وصولها.
  const [src, setSrc] = useState(String(fallbackSrc))

  useEffect(() => {
    if (page === undefined || slot === undefined) {
      setSrc(String(fallbackSrc))
      return
    }

    let active = true
    const pageName = String(page)
    const slotNumber = Number(slot)

    // 1) استخدم النسخة المخزنة محليًا فورًا إن وُجدت.
    const memoryImages = pageCache.get(pageName)
    const browserImages = readBrowserCache(pageName)
    const cachedSrc =
      memoryImages?.[slotNumber] ??
      browserImages[slotNumber]

    if (cachedSrc) {
      setSrc(cachedSrc)
    } else {
      setSrc(String(fallbackSrc))
    }

    // 2) اجلب آخر نسخة في الخلفية بدون تعطيل الصفحة.
    refreshPageImages(pageName).then((images) => {
      if (!active) {
        return
      }

      const freshSrc = images[slotNumber]

      if (freshSrc) {
        setSrc(freshSrc)
      } else if (!cachedSrc) {
        setSrc(String(fallbackSrc))
      }
    })

    return () => {
      active = false
    }
  }, [page, slot, fallbackSrc])

  const finalClassName = fill
    ? `absolute inset-0 h-full w-full ${className}`
    : className

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={finalClassName}
      style={style}
    />
  )
}
