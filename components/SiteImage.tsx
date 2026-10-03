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
const pageRequests = new Map<string, Promise<Record<number, string>>>()

function browserCacheKey(page: string) {
  return `maidora-site-images:${page}`
}

function readBrowserCache(page: string): Record<number, string> {
  if (typeof window === "undefined") return {}

  try {
    const raw = window.localStorage.getItem(browserCacheKey(page))
    if (!raw) return {}

    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return {}

    const result: Record<number, string> = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string" && value) result[Number(key)] = value
    }

    return result
  } catch {
    return {}
  }
}

function writeBrowserCache(page: string, images: Record<number, string>) {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(browserCacheKey(page), JSON.stringify(images))
  } catch {}
}

function preloadImage(src: string): Promise<void> {
  if (typeof window === "undefined" || !src) return Promise.resolve()

  return new Promise((resolve) => {
    const image = new window.Image()
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true
      resolve()
    }

    image.onload = finish
    image.onerror = finish
    image.src = src

    if (image.complete) finish()
  })
}

async function refreshPageImages(page: string) {
  const existing = pageRequests.get(page)
  if (existing) return existing

  const request: Promise<Record<number, string>> = fetch(
    `/api/site-images?page=${encodeURIComponent(page)}`,
    {
      cache: "no-cache",
    },
  )
    .then(async (response): Promise<Record<number, string>> => {
      if (!response.ok) {
        return pageCache.get(page) ?? readBrowserCache(page)
      }

      const data = await response.json()
      const map: Record<number, string> = {}

      for (const item of data.items ?? []) {
        const slot = Number(item.slot)
        const url = String(item.url ?? "")
        if (slot && url) map[slot] = url
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
  const pageName =
    page === undefined ? undefined : String(page)
  const slotNumber =
    slot === undefined ? undefined : Number(slot)

  // نبدأ من الكاش المحلي إن كان متاحًا، بدل عرض الصورة الاحتياطية
  // في كل Refresh ثم استبدالها بعد وصول طلب الـAPI.
  const [src, setSrc] = useState(() => {
    if (pageName === undefined || slotNumber === undefined) {
      return String(fallbackSrc)
    }

    const cached =
      pageCache.get(pageName)?.[slotNumber] ??
      readBrowserCache(pageName)[slotNumber]

    return cached || String(fallbackSrc)
  })

  useEffect(() => {
    if (pageName === undefined || slotNumber === undefined) {
      setSrc(String(fallbackSrc))
      return
    }

    let active = true

    const cachedSrc =
      pageCache.get(pageName)?.[slotNumber] ??
      readBrowserCache(pageName)[slotNumber]

    if (cachedSrc) {
      setSrc(cachedSrc)
    }

    // التحديث يحصل في الخلفية. لا نغير الصورة المعروضة
    // إلا بعد أن تكون الصورة الجديدة قد انتهت من التحميل.
    refreshPageImages(pageName).then(async (images) => {
      if (!active) return

      const freshSrc = images[slotNumber]

      if (!freshSrc) {
        if (!cachedSrc) setSrc(String(fallbackSrc))
        return
      }

      if (freshSrc === (cachedSrc || src)) {
        return
      }

      await preloadImage(freshSrc)

      if (active) {
        setSrc(freshSrc)
      }
    })

    return () => {
      active = false
    }
  }, [pageName, slotNumber, fallbackSrc])

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
