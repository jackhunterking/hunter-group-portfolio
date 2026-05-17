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
    default: "Jack & Tara Hunter — Toronto Real Estate",
    template: "%s | Jack Hunter",
  },
  description:
    "Toronto'da gayrimenkulün güvenilir adresi. Jack & Tara Hunter, RE/MAX Hallmark.",
  icons: {
    icon: [
      { url: "/logos/HUNTER_Brandmark_Gold.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Jack & Tara Hunter — Toronto Real Estate",
    description: "Toronto'da gayrimenkulün güvenilir adresi.",
    type: "website",
    locale: "tr_TR",
    siteName: "Jack Hunter",
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
