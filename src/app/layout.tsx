import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mirae Kim — AI Researcher",
  description:
    "Portfolio of Mirae Kim, an AI researcher specializing in NLP, Healthcare AI, and empathetic conversational systems for childhood cancer survivors.",
  metadataBase: new URL("https://mirae.kim"),
  openGraph: {
    title: "Mirae Kim — AI Researcher",
    description:
      "NLP & Healthcare AI researcher building empathetic conversational systems.",
    url: "https://mirae.kim",
    siteName: "Mirae Kim",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirae Kim — AI Researcher",
    description:
      "NLP & Healthcare AI researcher building empathetic conversational systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
