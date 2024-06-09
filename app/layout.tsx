import "./globals.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import localFont from "next/font/local";

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
      <body className={pretendard.className}>
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
