import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Maidora | خدمات العاملات المنزلية وتأشيراتها في دبي',
  description:
    'Maidora تقدم أفضل خدمات توظيف العاملات المنزلية وتأشيراتهن في دبي بثقة واحترافية.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}

        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
        >{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '1940138284036945');
          fbq('track', 'PageView');
        `}</Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1940138284036945&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Snapchat Pixel */}
        <Script
          id="snap-pixel"
          strategy="afterInteractive"
        >{`
          (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
          {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
          a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
          r.src=n;var u=t.getElementsByTagName(s)[0];
          u.parentNode.insertBefore(r,u);})(window,document,
          'https://sc-static.net/scevent.min.js');

          snaptr('init', 'a3a18a97-5892-4118-a5a7-691589bc686b', {});
          snaptr('track', 'PAGE_VIEW');
        `}</Script>
      </body>
    </html>
  )
}
