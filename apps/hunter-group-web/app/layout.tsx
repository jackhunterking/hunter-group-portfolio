import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { PostHogProvider } from "./providers";
import "./globals.css";
import "./theme.css";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
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
    default: "Hunter Group Real Estate, Toronto Merkezli Türk Emlak Grubu",
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
    title: "Hunter Group Real Estate, Toronto Merkezli Türk Emlak Grubu",
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
    <html lang="tr" className={`${lora.variable} ${manrope.variable}`}>
      <body>
        <PostHogProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
