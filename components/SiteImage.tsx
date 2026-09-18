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

async function loadPageImages(page: string) {
  if (pageCache.has(page)) {
    return pageCache.get(page) ?? {}
  }

  const existing = pageRequests.get(page)

  if (existing) {
    return existing
  }

  const request: Promise<Record<number, string>> = fetch(
    `/api/site-images?page=${encodeURIComponent(page)}&_=${Date.now()}`,
    {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
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
  const [src, setSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(
    page !== undefined && slot !== undefined
  )

  useEffect(() => {
    if (page === undefined || slot === undefined) {
      setSrc(String(fallbackSrc))
      setLoading(false)
      return
    }

    let active = true

    setLoading(true)
    setSrc(null)

    loadPageImages(String(page)).then((images) => {
      if (!active) {
        return
      }

      const newSrc = images[Number(slot)]

      if (newSrc) {
        setSrc(newSrc)
      } else {
        setSrc(String(fallbackSrc))
      }

      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [page, slot, fallbackSrc])

  const finalClassName = fill
    ? `absolute inset-0 h-full w-full ${className}`
    : className

  if (loading || !src) {
    return (
      <div
        className={finalClassName}
        style={style}
        aria-hidden="true"
      />
    )
  }

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
