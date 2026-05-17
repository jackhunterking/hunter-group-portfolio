import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://jackhunter.com"),
  title: {
    default: "Hunter Group Real Estate — Toronto Merkezli Türk Emlak Grubu",
    template: "%s | Hunter Group Real Estate",
  },
  description:
    "Toronto Merkezli Türk Emlak Grubu. Jack & Tara Hunter, RE/MAX Hallmark ile Toronto ve GTA'da alım, satım ve yatırım.",
  icons: {
    icon: [
      { url: "/logos/HUNTER_Brandmark_Gold.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Hunter Group Real Estate — Toronto Merkezli Türk Emlak Grubu",
    description: "Toronto Merkezli Türk Emlak Grubu. Jack & Tara Hunter, RE/MAX Hallmark.",
    type: "website",
    locale: "tr_TR",
    siteName: "Hunter Group Real Estate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
