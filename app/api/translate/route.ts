import { NextResponse } from "next/server"

export const runtime = "nodejs"

const cache = new Map<
  string,
  {
    translation: string
    expiresAt: number
  }
>()

export async function GET(request: Request) {
  const url = new URL(request.url)

  const q =
    (url.searchParams.get("q") || "").trim()

  if (!q) {
    return NextResponse.json({
      translation: "",
    })
  }

  const cached = cache.get(q)

  if (
    cached &&
    cached.expiresAt > Date.now()
  ) {
    return NextResponse.json({
      translation: cached.translation,
    })
  }

  try {
    const target = new URL(
      "https://api.mymemory.translated.net/get"
    )

    target.searchParams.set("q", q)
    target.searchParams.set(
      "langpair",
      "ar|en"
    )

    const response = await fetch(target, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json({
        translation: q,
      })
    }

    const data = await response.json()

    const translation =
      data?.responseData?.translatedText &&
      typeof data.responseData.translatedText ===
        "string"
        ? data.responseData.translatedText
        : q

    cache.set(q, {
      translation,
      expiresAt:
        Date.now() +
        1000 * 60 * 60 * 24,
    })

    return NextResponse.json({
      translation,
    })
  } catch {
    return NextResponse.json({
      translation: q,
    })
  }
}
