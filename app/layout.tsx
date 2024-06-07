import "./globals.css";
import Link from "next/link";
import { NextSeo } from "next-seo";

export const metadata = {
  title: "GPT 도장 깨기",
  description: "GPT가 틀린 상식 문제 맞히면 인정",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <head>
        <NextSeo
          title="GPT 도장 깨기"
          description="GPT가 틀린 상식 문제 맞히면 인정"
          openGraph={{
            type: "website",
            url: "https://quiz-vs.vercel.app",
            title: "GPT 도장 깨기",
            description: "GPT가 틀린 상식 문제 맞히면 인정",
            images: [
              {
                url: "https://www.example.com/og-image.jpg",
                width: 800,
                height: 600,
                alt: "GPT 상식 대결 오픈그래프 이미지",
              },
            ],
          }}
        />
      </head>
      <body>
        <div className="navbar bg-neutral text-neutral-content justify-center mb-2">
          <Link href="/" className="btn btn-ghost text-xl">
            GPT 상식 대결
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
