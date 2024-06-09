// RootLayout.tsx
import "./globals.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import localFont from "next/font/local";
import Head from "next/head";

export const metadata = {
  title: "날먹상식: 상식 퀴즈 나 vs GPT",
  description: "다 맞히면 GPT보다 상식 고수 인정합니다",
  openGraph: {
    title: "날먹상식: 상식 퀴즈 나 vs GPT",
    description: "다 맞히면 GPT보다 상식 고수 인정합니다",
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
      <Head>
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TZWQQC8K');
        `,
          }}
        />
        {/* End Google Tag Manager */}
      </Head>
      <body className={pretendard.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TZWQQC8K"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <div className="navbar bg-neutral text-neutral-content justify-center mb-2 h-12">
          <Link href="/" className="btn btn-ghost">
            <FaHome className="text-xl" />
            <span className="text-lg">GPT 도장 깨기</span>
          </Link>
        </div>
        <div className="px-4">{children}</div>
      </body>
    </html>
  );
}
