import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
title: 'Maidora | خدمات العاملات المنزلية وتأشيراتها في دبي',
description: 'Maidora تقدم أفضل خدمات توظيف العاملات المنزلية وتأشيراتهن في دبي بثقة واحترافية.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="ar" dir="rtl">
<body>{children}</body>
</html>
)
}
