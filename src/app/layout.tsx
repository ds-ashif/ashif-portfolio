import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashif — Full Stack Developer & AI Engineer",
  description:
    "Full Stack Developer, AI Engineer, and MERN Stack Developer building next-generation digital experiences with modern web technologies.",
  keywords: [
    "Ashif",
    "Full Stack Developer",
    "AI Engineer",
    "MERN Stack",
    "React",
    "Next.js",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Ashif" }],
  openGraph: {
    title: "Ashif — Full Stack Developer & AI Engineer",
    description:
      "Building cosmic digital experiences at the intersection of performance and beauty.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashif — Full Stack Developer & AI Engineer",
    description: "Building cosmic digital experiences.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
