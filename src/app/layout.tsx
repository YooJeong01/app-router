import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScrollerProvider from "../provider/SmoothScrollerProvider";
import QueryProvider from "@/provider/QueryProvider";


export const metadata: Metadata = {
  title: "Triangle",
  description: "다양한 작가, 다양한 사진",

  openGraph: {
    title: 'Triangle',
    description: "다양한 작가, 다양한 사진",
    url: 'https://kindtiger.com',
    type: 'website',
    siteName: 'Triangle',
    images: [
      {
        url: 'https://img.com/og-image.png',
        width: 1200,
        height: 600,
        alt: 'Triangle 사이트 이미지'
      }
    ],
    locale: 'ko_KR'
  },
  twitter: {
    title: 'Triangle',
    description: "다양한 작가, 다양한 사진",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body
        className={`antialiased`}
      >
        <SmoothScrollerProvider>
          <Header />
          <main className="flex-1">
            <QueryProvider>
              {children}
            </QueryProvider>
          </main>
          <Footer />
        </SmoothScrollerProvider>
      </body>
    </html>
  );
}
