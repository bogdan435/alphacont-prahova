import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://contabilprahova.ro";
const BRAND = "ALPHACONT GROUP";
const DEFAULT_TITLE =
  "Expert contabil Prahova | Contabilitate firme și PFA | ALPHACONT GROUP";
const DEFAULT_DESCRIPTION =
  "Expert contabil în Prahova pentru SRL și PFA. Contabilitate completă, salarizare, declarații fiscale și suport ANAF. Răspuns rapid și comunicare clară.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${BRAND}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "expert contabil Prahova",
    "contabil Prahova",
    "contabilitate Prahova",
    "contabilitate SRL Prahova",
    "contabilitate PFA Prahova",
    "salarizare Prahova",
    "declarații fiscale Prahova",
    "ANAF Prahova",
    BRAND,
  ],
  authors: [{ name: BRAND }],
  creator: BRAND,
  publisher: BRAND,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BRAND,
    locale: "ro_RO",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/office-main.jpg",
        width: 1200,
        height: 630,
        alt: "ALPHACONT GROUP - Expert contabil Prahova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/office-main.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-SSY1RPSFG5"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SSY1RPSFG5');
  `}
</Script>

        {children}
      </body>
    </html>
  );
}