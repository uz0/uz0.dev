import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Unity Zone Zero",
  description: "uz0.dev - Official organization portal. Connect with us on GitHub for projects and collaborations.",
  keywords: ["uz0", "organization", "github", "development", "projects", "unity zone zero"],
  authors: [{ name: "uz0.dev Organization" }],
  creator: "uz0.dev",
  publisher: "uz0.dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://uz0.dev"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/favicon-16x16.jpg",
        sizes: "16x16",
        type: "image/jpeg",
      },
      {
        url: "/favicon-32x32.jpg",
        sizes: "32x32",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
    shortcut: "/apple-touch-icon.jpg",
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.jpg",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uz0.dev",
    title: "Unity Zone Zero",
    description: "uz0.dev - Official organization portal. Connect with us on GitHub for projects and collaborations.",
    siteName: "uz0.dev",
    images: [
      {
        url: "/Neon_W-Fails_Chemistry_Test_00001_.jpg",
        width: 350,
        height: 350,
        alt: "uz0.dev organization portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unity Zone Zero",
    description: "uz0.dev - Official organization portal. Connect with us on GitHub for projects and collaborations.",
    site: "@uz0dev",
    images: ["/Neon_W-Fails_Chemistry_Test_00001_.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T0FR5WS6GT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T0FR5WS6GT');
          `}
        </Script>
      </body>
    </html>
  );
}
