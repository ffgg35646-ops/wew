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
    data: Uint8Array
    rangeChunkSize: number
    cMapUrl: string
    cMapPacked: boolean
    standardFontDataUrl: string
    useSystemFonts: boolean
    disableFontFace: boolean
  }) => PdfLoadingTask
}

type CachedPreview = {
  version: string
  preview: Blob
  pdfData: ArrayBuffer
  pageCount: number
}

declare global {
  interface Window {
    pdfjsLib?: PdfJsLibrary
  }
}

const PDFJS_VERSION = "3.11.174"
const PDFJS_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS_VERSION + "/pdf.min.js"
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS_VERSION + "/pdf.worker.min.js"
const PDFJS_CMAPS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS_VERSION + "/cmaps/"
const PDFJS_STANDARD_FONTS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS_VERSION + "/standard_fonts/"
const PREVIEW_DB = "maidora-license-preview"
const PREVIEW_STORE = "pages"

function openPreviewDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB unavailable"))
      return
    }

    const request = indexedDB.open(PREVIEW_DB, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(PREVIEW_STORE)) {
        db.createObjectStore(PREVIEW_STORE)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error("Could not open preview cache"))
  })
}

async function readCachedPreview(): Promise<CachedPreview | null> {
  const db = await openPreviewDb()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREVIEW_STORE, "readonly")
    const request = transaction.objectStore(PREVIEW_STORE).get("latest")
    request.onsuccess = () => {
      db.close()
      resolve((request.result as CachedPreview | undefined) ?? null)
    }
    request.onerror = () => {
      db.close()
      reject(request.error || new Error("Could not read preview cache"))
    }
  })
}

async function saveCachedPreview(value: CachedPreview): Promise<void> {
  const db = await openPreviewDb()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREVIEW_STORE, "readwrite")
    transaction.objectStore(PREVIEW_STORE).put(value, "latest")
    transaction.oncomplete = () => {
      db.close()
      resolve()
    }
    transaction.onerror = () => {
      db.close()
      reject(transaction.error || new Error("Could not save preview cache"))
    }
    transaction.onabort = () => {
      db.close()
      reject(transaction.error || new Error("Preview cache transaction aborted"))
    }
  })
}

async function paintCachedPreview(
  canvas: HTMLCanvasElement,
  blob: Blob,
  containerWidth: number,
  zoom: number
) {
  const bitmap = await createImageBitmap(blob)
  const context = canvas.getContext("2d")
  if (!context) {
    bitmap.close()
    return
  }

  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const availableWidth = Math.max(180, (containerWidth || window.innerWidth) - 24)
  const displayWidth = Math.min(bitmap.width, availableWidth) * zoom
  canvas.style.width = String(displayWidth) + "px"
  canvas.style.height = String((bitmap.height / bitmap.width) * displayWidth) + "px"
  context.drawImage(bitmap, 0, 0)
  bitmap.close()
}

export default function LicensePdfViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cachedPreviewRef = useRef<CachedPreview | null>(null)
  const pdfDataRef = useRef<ArrayBuffer | null>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [cacheReady, setCacheReady] = useState(false)
  const [serverVersion, setServerVersion] = useState("")
  const [pdf, setPdf] = useState<PdfDocument | null>(null)
  const [pdfVersion, setPdfVersion] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [containerWidth, setContainerWidth] = useState(0)
  const [hasPreview, setHasPreview] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateWidth = () => setContainerWidth(element.getBoundingClientRect().width)
    updateWidth()
    window.addEventListener("resize", updateWidth)

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateWidth)
      observer.observe(element)
      return () => {
        observer.disconnect()
        window.removeEventListener("resize", updateWidth)
      }
    }

    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  useEffect(() => {
    let mounted = true

    readCachedPreview()
      .then(async (cached) => {
        if (!mounted) return
        if (cached?.preview) {
          cachedPreviewRef.current = cached
          setPageCount(cached.pageCount || 1)
          setHasPreview(true)
          if (canvasRef.current) {
            await paintCachedPreview(
              canvasRef.current,
              cached.preview,
              containerWidth || window.innerWidth,
              zoom
            )
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setCacheReady(true)
      })

    fetch("/api/economic-license/settings", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((settings) => {
        if (!mounted || !settings) return
        if (settings.enabled === false || settings.viewEnabled === false || !settings.viewFileId) {
          setError("ملف عرض الترخيص غير متاح حاليًا.")
          return
        }
        setServerVersion(String(settings.viewFileId))
      })
      .catch(() => {
        // Keep the last saved preview visible when the network is unavailable.
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!cacheReady || !scriptReady || !serverVersion || !window.pdfjsLib) return

    let cancelled = false
    let loadingTask: PdfLoadingTask | null = null

    async function loadLatestDocument() {
      try {
        const cached = cachedPreviewRef.current
        let pdfData: ArrayBuffer

        if (cached?.version === serverVersion && cached.pdfData) {
          pdfData = cached.pdfData
        } else {
          const response = await fetch(
            "/api/economic-license/file?type=view&version=" + encodeURIComponent(serverVersion),
            { cache: "no-store" }
          )

          if (response.status === 409) {
            const latestSettings = await fetch("/api/economic-license/settings", { cache: "no-store" })
            if (latestSettings.ok) {
              const latest = await latestSettings.json()
              if (latest.viewFileId && String(latest.viewFileId) !== serverVersion) {
                setServerVersion(String(latest.viewFileId))
              }
            }
            return
          }

          if (!response.ok) throw new Error("PDF request failed: " + response.status)
          pdfData = await response.arrayBuffer()
        }

        if (cancelled || !window.pdfjsLib) return

        loadingTask = window.pdfjsLib.getDocument({
          data: new Uint8Array(pdfData),
          rangeChunkSize: 65536,
          cMapUrl: PDFJS_CMAPS,
          cMapPacked: true,
          standardFontDataUrl: PDFJS_STANDARD_FONTS,
          useSystemFonts: true,
          disableFontFace: false,
        })

        const loadedPdf = await loadingTask.promise
        if (cancelled) {
          void loadedPdf.destroy()
          return
        }

        pdfDataRef.current = pdfData
        setPdf(loadedPdf)
        setPdfVersion(serverVersion)
        setPageCount(loadedPdf.numPages)
        if (cached?.version !== serverVersion) {
          setPageNumber(1)
        }
        setError("")
      } catch (loadError) {
        if (cancelled) return
        console.error("ECONOMIC_LICENSE_PDF_BACKGROUND_REFRESH_ERROR", loadError)
        if (!hasPreview) {
          setError("تعذّر عرض ملف الترخيص. أعد المحاولة بعد التحقق من الاتصال.")
        }
      }
    }

    void loadLatestDocument()

    return () => {
      cancelled = true
      if (loadingTask) void loadingTask.destroy()
    }
  }, [cacheReady, scriptReady, serverVersion])

  useEffect(() => {
    if (!pdf || !canvasRef.current || !containerWidth) return

    let cancelled = false
    let renderTask: PdfRenderTask | null = null
    const renderCanvas = document.createElement("canvas")

    pdf.getPage(pageNumber)
      .then((page) => {
        if (cancelled) return

        const context = renderCanvas.getContext("2d")
        if (!context) throw new Error("Canvas 2D context is unavailable")

        const originalViewport = page.getViewport({ scale: 1 })
        const fitScale = Math.min(1.5, Math.max(0.1, (containerWidth - 24) / originalViewport.width))
        const deviceScale = Math.min(window.devicePixelRatio || 1, 2)
        const viewport = page.getViewport({ scale: fitScale * zoom * deviceScale })

        renderCanvas.width = Math.ceil(viewport.width)
        renderCanvas.height = Math.ceil(viewport.height)
        renderTask = page.render({ canvasContext: context, viewport })
        return renderTask.promise.then(() => {
          if (cancelled || !canvasRef.current) return

          const visibleCanvas = canvasRef.current
          const visibleContext = visibleCanvas.getContext("2d")
          if (!visibleContext) return

          visibleCanvas.width = renderCanvas.width
          visibleCanvas.height = renderCanvas.height
          visibleCanvas.style.width = String(viewport.width / deviceScale) + "px"
          visibleCanvas.style.height = String(viewport.height / deviceScale) + "px"
          visibleContext.drawImage(renderCanvas, 0, 0)
          setHasPreview(true)

          if (pageNumber === 1 && pdfDataRef.current && pdfVersion) {
            renderCanvas.toBlob((previewBlob) => {
              if (!previewBlob || cancelled) return
              const cached: CachedPreview = {
                version: pdfVersion,
                preview: previewBlob,
                pdfData: pdfDataRef.current!.slice(0),
                pageCount: pdf.numPages,
              }
              cachedPreviewRef.current = cached
              void saveCachedPreview(cached).catch(() => {})
            }, "image/jpeg", 0.94)
          }
        })
      })
      .catch((renderError) => {
        if (cancelled) return
        console.error("ECONOMIC_LICENSE_PDF_RENDER_ERROR", renderError)
        if (!hasPreview) setError("تعذّر رسم صفحة الترخيص.")
      })

    return () => {
      cancelled = true
      renderTask?.cancel()
    }
  }, [pdf, pdfVersion, pageNumber, zoom, containerWidth])

  useEffect(() => {
    const cached = cachedPreviewRef.current
    if (!cached?.preview || pdf) return
    if (canvasRef.current) {
      void paintCachedPreview(canvasRef.current, cached.preview, containerWidth || window.innerWidth, zoom)
    }
  }, [containerWidth, zoom, pdf])

  const previousPage = () => setPageNumber((current) => Math.max(1, current - 1))
  const nextPage = () => setPageNumber((current) => Math.min(pageCount, current + 1))

  return (
    <main className="min-h-screen bg-[#F3F6FA] px-3 py-4 sm:px-6 sm:py-7" dir="rtl">
      <Script
        src={PDFJS_SCRIPT}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => {
          if (!hasPreview) setError("تعذّر تحميل عارض المستندات. تحقق من الاتصال بالإنترنت ثم أعد المحاولة.")
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
                disabled={pageNumber <= 1}
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
                disabled={!pageCount || pageNumber >= pageCount}
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
            {error && !hasPreview ? (
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
