import "./globals.css";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export const metadata = {
  title: "GPT 도장 깨기",
  description: "GPT도 틀린 상식 문제 맞히면 인정",
  openGraph: {
    title: "GPT 도장 깨기",
    description: "GPT도 틀린 상식 문제 맞히면 인정",
    url: "https://quiz-vs.vercel.app/",
    siteName: "GPT 도장 깨기",
    images: [
      {
        url: "https://www.example.com/og-image.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body>
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
