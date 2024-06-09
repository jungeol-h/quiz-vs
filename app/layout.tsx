import "./globals.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import localFont from "next/font/local";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title: "날먹상식: 인간 vs GPT",
  description: "다 맞히면 상식 고수 인정합니다",
  openGraph: {
    title: "날먹상식: 인간 vs GPT",
    description: "다 맞히면 상식 고수 인정합니다",
    url: "https://quiz-vs.vercel.app/",
    siteName: "날먹상식",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

const pretendard = localFont({
  src: "../public/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph meta tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta
          property="og:image:width"
          content={metadata.openGraph.images[0].width.toString()}
        />
        <meta
          property="og:image:height"
          content={metadata.openGraph.images[0].height.toString()}
        />
      </head>
      <body className={pretendard.className}>
        <GoogleTagManager gtmId="GTM-TZWQQC8K" />
        <div className="navbar bg-neutral text-neutral-content justify-center mb-2 h-12">
          <Link href="/" className="btn btn-ghost">
            <FaHome className="text-xl" />
            <span className="text-lg">날먹상식</span>
          </Link>
        </div>
        <div className="px-4">{children}</div>
      </body>
    </html>
  );
}
