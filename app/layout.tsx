import type { Metadata, Viewport } from "next";
import { Rye, Bungee, Barlow_Condensed, Inter, Permanent_Marker } from "next/font/google";
import { EVENT } from "@/content/event";
import "./globals.css";

// DESIGN.md §3
const rye = Rye({ weight: "400", subsets: ["latin"], variable: "--font-rye", display: "swap" });
const bungee = Bungee({ weight: "400", subsets: ["latin"], variable: "--font-bungee", display: "swap" });
const barlow = Barlow_Condensed({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${EVENT.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trash Fest 2027 | King or Queen of Lockhart BBQ Cookoff & Live Music",
    template: "%s | Trash Fest 2027",
  },
  description:
    `${EVENT.cookoffTitle} and live music festival. ${EVENT.dateLabel} at ${EVENT.venue.name}, ` +
    `${EVENT.city}, ${EVENT.state} — the ${EVENT.cityTagline}. ${EVENT.tagline}`,
  openGraph: {
    type: "website",
    siteName: EVENT.name,
    title: "Trash Fest 2027 | King or Queen of Lockhart BBQ Cookoff & Live Music",
    description: `${EVENT.dateLabel} · ${EVENT.venue.full}. ${EVENT.tagline}`,
    url: siteUrl,
    locale: "en_US",
    images: [{ url: "/brand/flyer-event.webp", width: 1024, height: 1536, alt: `${EVENT.name} official flyer` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trash Fest 2027 | King or Queen of Lockhart BBQ Cookoff",
    description: `${EVENT.dateLabel} · ${EVENT.venue.full}. ${EVENT.tagline}`,
    images: ["/brand/flyer-event.webp"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0B0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${rye.variable} ${bungee.variable} ${barlow.variable} ${inter.variable} ${marker.variable}`}
    >
      <body className="bg-char text-muted antialiased">{children}</body>
    </html>
  );
}
