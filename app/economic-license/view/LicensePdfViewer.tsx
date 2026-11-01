"use client"

import Link from "next/link"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"

type PdfViewport = {
  width: number
  height: number
}

type PdfRenderTask = {
  promise: Promise<void>
  cancel: () => void
}

type PdfPage = {
  getViewport: (options: { scale: number }) => PdfViewport
  render: (options: {
    canvasContext: CanvasRenderingContext2D
    viewport: PdfViewport
  }) => PdfRenderTask
}

type PdfDocument = {
  numPages: number
  getPage: (pageNumber: number) => Promise<PdfPage>
  destroy: () => Promise<void> | void
}

type PdfLoadingTask = {
  promise: Promise<PdfDocument>
  destroy: () => Promise<void> | void
}

type PdfJsLibrary = {
  GlobalWorkerOptions: {
    workerSrc: string
  }
  getDocument: (options: {
    url: string
    rangeChunkSize: number
    disableStream: boolean
  }) => PdfLoadingTask
}

declare global {
  interface Window {
    pdfjsLib?: PdfJsLibrary
  }
}

const PDF_URL = "/api/economic-license/file?type=view"
const PDFJS_VERSION = "3.11.174"
const PDFJS_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS_VERSION + "/pdf.min.js"
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS_VERSION + "/pdf.worker.min.js"

export default function LicensePdfViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [pdf, setPdf] = useState<PdfDocument | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [containerWidth, setContainerWidth] = useState(0)
  const [loading, setLoading] = useState(true)
  const [rendering, setRendering] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateWidth = () => {
      setContainerWidth(element.getBoundingClientRect().width)
    }

    updateWidth()

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateWidth)
      observer.observe(element)
      return () => observer.disconnect()
    }

    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  useEffect(() => {
    if (!scriptReady || !window.pdfjsLib) return

    let cancelled = false
    let loadingTask: PdfLoadingTask | null = null

    setLoading(true)
    setError("")
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER
    loadingTask = window.pdfjsLib.getDocument({
      url: PDF_URL,
      rangeChunkSize: 65536,
      disableStream: true,
    })

    loadingTask.promise
      .then((loadedPdf) => {
        if (cancelled) {
          void loadedPdf.destroy()
          return
        }

        setPdf(loadedPdf)
        setPageCount(loadedPdf.numPages)
        setPageNumber(1)
        setLoading(false)
      })
      .catch((loadError: unknown) => {
        if (cancelled) return
        console.error("ECONOMIC_LICENSE_PDF_LOAD_ERROR", loadError)
        setError("تعذّر تحميل ملف الترخيص. يرجى تحديث الصفحة والمحاولة مرة أخرى.")
        setLoading(false)
      })

    return () => {
      cancelled = true
      if (loadingTask) void loadingTask.destroy()
    }
  }, [scriptReady])

  useEffect(() => {
    if (!pdf || !canvasRef.current || !containerWidth) return

    let cancelled = false
    let renderTask: PdfRenderTask | null = null

    setRendering(true)

    pdf.getPage(pageNumber)
      .then((page) => {
        if (cancelled || !canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) throw new Error("Canvas 2D context is unavailable")

        const originalViewport = page.getViewport({ scale: 1 })
        const fitScale = Math.min(1.5, Math.max(0.1, (containerWidth - 24) / originalViewport.width))
        const displayScale = fitScale * zoom
        const deviceScale = Math.min(window.devicePixelRatio || 1, 2)
        const viewport = page.getViewport({ scale: displayScale * deviceScale })

        canvas.width = Math.ceil(viewport.width)
        canvas.height = Math.ceil(viewport.height)
        canvas.style.width = String(viewport.width / deviceScale) + "px"
        canvas.style.height = String(viewport.height / deviceScale) + "px"
        context.clearRect(0, 0, canvas.width, canvas.height)

        renderTask = page.render({
          canvasContext: context,
          viewport,
        })

        return renderTask.promise
      })
      .then(() => {
        if (!cancelled) setRendering(false)
      })
      .catch((renderError: unknown) => {
        if (cancelled) return
        console.error("ECONOMIC_LICENSE_PDF_RENDER_ERROR", renderError)
        setError("تعذّر عرض صفحة الترخيص.")
        setRendering(false)
      })

    return () => {
      cancelled = true
      renderTask?.cancel()
    }
  }, [pdf, pageNumber, zoom, containerWidth])

  const previousPage = () => setPageNumber((current) => Math.max(1, current - 1))
  const nextPage = () => setPageNumber((current) => Math.min(pageCount, current + 1))

  return (
    <main className="min-h-screen bg-[#F3F6FA] px-3 py-4 sm:px-6 sm:py-7" dir="rtl">
      <Script
        src={PDFJS_SCRIPT}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => {
          setError("تعذّر تحميل عارض المستندات. تحقق من الاتصال بالإنترنت ثم أعد المحاولة.")
          setLoading(false)
        }}
      />

      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-500">AL SAADA</p>
            <h1 className="mt-1 text-base font-extrabold text-slate-900 sm:text-lg">
              ترخيص دائرة التنمية الاقتصادية
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/api/economic-license/file?type=download"
              className="rounded-xl bg-[#F2A95D] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#E99743] sm:px-4 sm:text-sm"
            >
              تحميل الترخيص
            </a>
            <Link
              href="/"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 sm:px-4 sm:text-sm"
            >
              العودة للموقع
            </Link>
          </div>
        </header>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-3 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((value) => Math.max(0.6, Number((value - 0.2).toFixed(2))))}
                disabled={zoom <= 0.6}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-lg font-bold text-slate-700 disabled:opacity-35"
                aria-label="تصغير"
              >
                −
              </button>
              <span className="min-w-[54px] text-center text-xs font-bold text-slate-600">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((value) => Math.min(2.4, Number((value + 0.2).toFixed(2))))}
                disabled={zoom >= 2.4}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-lg font-bold text-slate-700 disabled:opacity-35"
                aria-label="تكبير"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={previousPage}
                disabled={pageNumber <= 1 || loading}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-35"
              >
                السابقة
              </button>
              <span className="min-w-[76px] text-center text-xs font-bold text-slate-600" aria-live="polite">
                {pageCount ? "صفحة " + pageNumber + " من " + pageCount : "—"}
              </span>
              <button
                type="button"
                onClick={nextPage}
                disabled={!pageCount || pageNumber >= pageCount || loading}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-35"
              >
                التالية
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative flex min-h-[65vh] items-start justify-center overflow-auto bg-[#E9EEF4] p-3 sm:p-6"
          >
            {(loading || rendering) && !error && (
              <div className="absolute inset-x-0 top-4 z-10 mx-auto w-fit rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-600 shadow">
                {loading ? "جاري تحميل الترخيص..." : "جاري تجهيز الصفحة..."}
              </div>
            )}

            {error ? (
              <div className="m-auto max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">
                <p className="font-bold text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-xl bg-[#397EA9] px-5 py-2.5 text-sm font-bold text-white"
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                className="block bg-white shadow-[0_6px_28px_rgba(15,23,42,.16)]"
                aria-label="صفحة من ملف الترخيص"
              />
            )}
          </div>

          <footer className="border-t border-slate-200 px-4 py-3 text-center text-[11px] font-medium text-slate-500">
            يتم عرض المستند داخل الموقع، ويمكنك تكبيره أو التنقل بين صفحاته.
          </footer>
        </section>
      </div>
    </main>
  )
}
