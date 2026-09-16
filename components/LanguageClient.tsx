"use client"

const STATIC_TRANSLATIONS: Record<string, string> = {
  "الرئيسية": "Home",
  "خدماتنا": "Services",
  "الحصول على خادمات": "Get Maids",
  "تأشيرة عاملة منزلية": "Maid Visa",
  "الجنسيات": "Nationalities",
  "من نحن": "About Us",
  "ترخيص دائرة التنمية الاقتصادية": "Economic Development License",
  "عرض": "View",
  "تحميل الآن": "Download Now",
  "اتصل بنا": "Contact Us",
  "اتصل بنا الآن": "Contact Us Now",
  "اتصل الآن": "Call Now",
  "واتساب": "WhatsApp",
  "تواصل عبر واتساب": "Contact via WhatsApp",
  "تواصل معنا على واتساب": "Contact us on WhatsApp",
  "تحدث مع فريقنا": "Talk to our team",
  "تواصل سريع معنا": "Quick contact",
  "الاسم": "Name",
  "العمر": "Age",
  "الجنسية": "Nationality",
  "البلد": "Country",
  "الخبرة": "Experience",
  "نوع العمل": "Work Type",
  "اللغات": "Languages",
  "المهارات": "Skills",
  "الوصف": "Description",
  "غير محددة": "Not specified",
  "غير محدد": "Not specified",
  "لا توجد لغات مضافة.": "No languages added.",
  "مصرية": "Egyptian",
  "مصر": "Egypt",
  "الفلبين": "Philippines",
  "فلبينية": "Filipina",
  "إندونيسيا": "Indonesia",
  "إندونيسية": "Indonesian",
  "الهند": "India",
  "هندية": "Indian",
  "نيبال": "Nepal",
  "نيبالية": "Nepali",
  "سريلانكا": "Sri Lanka",
  "سريلانكية": "Sri Lankan",
  "بنغلاديش": "Bangladesh",
  "بنغلاديشية": "Bangladeshi",
  "إثيوبيا": "Ethiopia",
  "إثيوبية": "Ethiopian",
  "كينيا": "Kenya",
  "كينية": "Kenyan",
  "تنظيف": "Cleaning",
  "طبخ": "Cooking",
  "رعاية أطفال": "Childcare",
  "رعاية كبار السن": "Elderly care",
  "دوام كامل": "Full-time",
  "دوام جزئي": "Part-time",
  "مبتدئ": "Beginner",
  "متوسط": "Intermediate",
  "جيد": "Good",
  "جيد جدًا": "Very good",
  "ممتاز": "Excellent",
  "عرض ملف العاملة": "View Maid Profile",
  "عرض الملف الكامل": "View Full Profile",
  "العودة إلى العاملات": "Back to Maids",
  "أرسل المستندات": "Send Documents",
  "تواصل معنا": "Contact Us",
}

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function hasArabic(value: string) {
  return /[\u0600-\u06FF]/.test(value)
}

function shouldSkipNode(node: Text) {
  const parent = node.parentElement

  if (!parent) {
    return true
  }

  if (
    [
      "SCRIPT",
      "STYLE",
      "NOSCRIPT",
      "TEXTAREA",
      "INPUT",
      "SELECT",
    ].includes(parent.tagName)
  ) {
    return true
  }

  if (parent.closest("[data-no-translate='true']")) {
    return true
  }

  return false
}

async function translateText(text: string) {
  const clean = normalize(text)

  if (!clean || !hasArabic(clean)) {
    return clean
  }

  const direct = STATIC_TRANSLATIONS[clean]

  if (direct) {
    return direct
  }

  /*
   * الكلمات القصيرة غالبًا أسماء أشخاص.
   * نتركها كما هي إلا لو كانت موجودة في القاموس.
   */
try {
    const response = await fetch(
      `/api/translate?q=${encodeURIComponent(clean)}`
    )

    if (!response.ok) {
      return clean
    }

    const data = await response.json()

    if (
      typeof data.translation === "string" &&
      data.translation.trim()
    ) {
      return data.translation.trim()
    }

    return clean
  } catch {
    return clean
  }
}


async function translateElementAttributes(
  cache: Map<string, string>
) {
  const elements = Array.from(
    document.querySelectorAll(
      "[alt], [title], [placeholder], [aria-label]"
    )
  )

  for (const element of elements) {
    if (
      element.closest(
        "[data-no-translate='true']"
      )
    ) {
      continue
    }

    for (const attribute of [
      "alt",
      "title",
      "placeholder",
      "aria-label",
    ]) {
      const value =
        element.getAttribute(attribute)

      if (!value || !/[\u0600-\u06FF]/.test(value)) {
        continue
      }

      let translated = cache.get(value)

      if (!translated) {
        translated =
          await translateText(value)

        cache.set(value, translated ?? "")
      }

      element.setAttribute(
        attribute,
        translated ?? ""
      )
    }
  }
}

async function translatePage() {
  document.documentElement.lang = "en"
  document.documentElement.dir = "ltr"
  document.body.dir = "ltr"

  document
    .querySelectorAll("[dir='rtl']")
    .forEach((element) => {
      element.setAttribute("dir", "ltr")
    })

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  )

  const nodes: Text[] = []

  let current: Node | null

  while ((current = walker.nextNode())) {
    if (!(current instanceof Text)) {
      continue
    }

    if (shouldSkipNode(current)) {
      continue
    }

    const value = normalize(current.nodeValue || "")

    if (!value || !hasArabic(value)) {
      continue
    }

    nodes.push(current)
  }

  const cache = new Map<string, string>()
  const queue = [...nodes]

  const workers = Array.from(
    { length: 4 },
    async () => {
      while (queue.length) {
        const node = queue.shift()

        if (!node) {
          return
        }

        const original = normalize(
          node.nodeValue || ""
        )

        if (!original) {
          continue
        }

        if (cache.has(original)) {
          node.nodeValue =
            cache.get(original) || original
          continue
        }

        const translated =
          await translateText(original)

        cache.set(original, translated)
        node.nodeValue = translated
      }
    }
  )

  await Promise.all(workers)

  await translateElementAttributes(cache)
}

export function startLanguageEngine(
  language: "ar" | "en"
) {
  if (language !== "en") {
    document.documentElement.lang = "ar"
    document.documentElement.dir = "rtl"

    return () => {}
  }

  let stopped = false
  let timer: number | null = null

  const run = () => {
    if (!stopped) {
      void translatePage()
    }
  }

  run()

  const observer = new MutationObserver(() => {
    if (timer) {
      window.clearTimeout(timer)
    }

    timer = window.setTimeout(run, 150)
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  return () => {
    stopped = true
    observer.disconnect()

    if (timer) {
      window.clearTimeout(timer)
    }
  }
}
