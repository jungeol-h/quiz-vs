import "./globals.css";
import Link from "next/link";
import localFont from "next/font/local";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title: "날먹상식: 인간 vs GPT",
  description: "다 맞히면 상식 고수 인정합니다",
  openGraph: {
    title: "날먹상식: 인간 vs GPT",
    description: "다 맞히면 상식 고수 인정합니다",
    url: "https://nalmuk.com/",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();

                  ChannelIO('boot', {
                    "pluginKey": "688ea8ec-59af-4f6e-b2d1-e78104183168"
                  });
            `,
          }}
        />{" "}
      </head>
      <body className={pretendard.className}>
        <GoogleTagManager gtmId="GTM-TZWQQC8K" />
        <div className="navbar bg-base-100 justify-center mb-2 h-12">
          <Link href="/" className="btn btn-ghost">
            <img src="/logowithtext.svg" alt="logo" className="w-20" />
          </Link>
        </div>
        <div className="px-4">{children}</div>
        <footer className="footer footer-center p-10 bg-primary text-primary-content">
          <aside>
            {/* logo */}
            <img src="/logowithtext.svg" alt="logo" className="w-20" />
            <p className="text-ghost text-s mt-2 font-bold">
              버그, 기능제안 등의 문의는
            </p>
            <p className="text-ghost text-s">
              우측 하단 메시지 버튼을 통해 언제든지 전달해주세요!
            </p>
          </aside>
          <nav>
            {/* <p className="text-ghost text-s">
              뉴스레터를 구독하면 <strong> 매주 새로운 상식 퀴즈</strong>를
              받아볼 수 있어요.
            </p>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              Email
              <input
                type="text"
                className="grow"
                placeholder="example@naver.com"
              />
            </label>
            <button className="btn mb-10">신청하기</button> */}
            <div className="grid grid-flow-col gap-4">
              <Link
                href="https://www.threads.net/@nalmuk.sense"
                className="btn btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  clipRule="evenodd"
                  viewBox="0 0 512 512"
                >
                  <path d="M105 0h302c57.75 0 105 47.25 105 105v302c0 57.75-47.25 105-105 105H105C47.25 512 0 464.75 0 407V105C0 47.25 47.25 0 105 0z" />
                  <path
                    fill="#fff"
                    d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z"
                  />
                </svg>
              </Link>
              <Link href="https://x.com/nalmuk_sense" className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  clipRule="evenodd"
                  viewBox="0 0 512 462.799"
                >
                  <path d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" />
                </svg>
              </Link>
            </div>
          </nav>
        </footer>
      </body>
    </html>
  );
}
