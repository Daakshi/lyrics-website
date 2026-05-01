import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Vibe Krishna | Premium Bhajan Lyrics & Meanings",
    template: "%s | Vibe Krishna"
  },
  description: "A divine portfolio of Krishna bhajans. Explore premium lyrics, meanings, and immerse yourself in devotion through an aesthetic, seamless experience.",
  keywords: ["krishna", "bhajan", "lyrics", "devotion", "iskcon", "kirtan", "spirituality"],
  openGraph: {
    title: "Vibe Krishna | Premium Bhajan Lyrics",
    description: "A divine portfolio of Krishna bhajans. Explore premium lyrics, meanings, and immerse yourself in devotion.",
    url: "https://vibekrishna.com",
    siteName: "Vibe Krishna",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Krishna | Premium Bhajan Lyrics",
    description: "Explore premium lyrics, meanings, and immerse yourself in devotion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FDF8F1]">{children}</body>
    </html>
  );
}
