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

  // خصائص كانت موجودة في next/image
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

async function loadPageImages(page: string) {
  if (pageCache.has(page)) {
    return pageCache.get(page) ?? {}
  }

  const existing = pageRequests.get(page)

  if (existing) {
    return existing
  }

  const request: Promise<Record<number, string>> = fetch(
    `/api/site-images?page=${encodeURIComponent(page)}`,
    { cache: "no-store" }
  )
    .then(async (response): Promise<Record<number, string>> => {
      if (!response.ok) {
        return {}
      }

      const data = await response.json()

      const map: Record<number, string> = {}

      for (const item of data.items ?? []) {
        map[Number(item.slot)] = String(item.url)
      }

      pageCache.set(page, map)

      return map
    })
    .catch((): Record<number, string> => ({}))

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
  const [src, setSrc] = useState(String(fallbackSrc))

  useEffect(() => {
    if (page === undefined || slot === undefined) {
      return
    }

    let active = true

    loadPageImages(String(page)).then((images) => {
      if (!active) {
        return
      }

      const newSrc = images[Number(slot)]

      if (newSrc) {
        setSrc(newSrc)
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
