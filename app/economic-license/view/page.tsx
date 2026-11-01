import LicensePdfViewer from "./LicensePdfViewer"

export const metadata = {
  title: "عرض ترخيص دائرة التنمية الاقتصادية | AL SAADA",
  robots: {
    index: false,
    follow: false,
  },
}

export default function EconomicLicenseViewPage() {
  return <LicensePdfViewer />
}
