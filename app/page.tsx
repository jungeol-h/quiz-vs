"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { FaArrowRight } from "react-icons/fa";

const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((module) => module.Player),
  {
    ssr: false,
  }
);

export default function Home() {
  // const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 로컬 스토리지 초기화
    if (typeof window !== "undefined") {
      localStorage.removeItem("quizResults");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">인간 VS GPT</h1>
      <div className="mt-6">
        <Player
          autoplay
          loop
          src="/intro.json"
          style={{ height: "200px", width: "200px" }}
        />
      </div>
      <p className="mt-4 text-xl">GPT가 틀린 상식들, 다 맞히실 수 있나요?</p>
      <Link href="/quiz">
        <button className="btn btn-primary mt-6">
          퀴즈 풀기
          <FaArrowRight className="ml-1" />
        </button>
      </Link>
      <p className="text-sm mt-2">20문제 / 약 3분 소요</p>
    </div>
  );
}
