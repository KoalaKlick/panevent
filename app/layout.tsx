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
  title: "PanEvent",
  description: "Create, Manage & Grow Events with Real-Time Power",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-sm.png",
    shortcut: "/logo-sm.png",
    apple: "/logo-sm.png",
  },
  openGraph: {
    title: "PanEvent",
    description: "Create, Manage & Grow Events with Real-Time Power",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "PanEvent",
    description: "Create, Manage & Grow Events with Real-Time Power",
    images: ["/logo-sm.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-sm.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo-sm.png" />
        <link rel="apple-touch-icon" href="/logo-sm.png" />
        <link rel="shortcut icon" href="/logo-sm.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
