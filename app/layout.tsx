import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/components/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mccainfoods-tan.vercel.app"),
  title: "McCain Foods Global Corporate Website | McCain.com",
  description:
    "McCain Foods is a global leader in prepared potato products and appetizers. Discover our business, sustainability efforts, careers, and latest news.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "McCain Foods | Celebrating Real Connections",
    description:
      "McCain Foods is a global leader in prepared potato products and appetizers. Discover our business, sustainability efforts, careers, and latest news.",
    url: "https://mccainfoods-tan.vercel.app",
    siteName: "McCain Foods",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "McCain Foods | Celebrating Real Connections",
    description:
      "McCain Foods is a global leader in prepared potato products and appetizers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
