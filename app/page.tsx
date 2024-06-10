"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { sendGTMEvent } from "@next/third-parties/google";

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

  const handleStartQuiz = () => {
    sendGTMEvent({
      event: "start_quiz",
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-l font-bold ">인간 VS GPT</h1>
      <h1 className="text-3xl font-bold mb-4">상식 퀴즈</h1>
      <div className="mt-6 mb-6">
        <Player
          autoplay
          loop
          src="/robot-lottie.json"
          style={{ height: "100px", width: "100px" }}
        />
      </div>
      <div role="alert" className="alert mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-s">GPT가 틀린 문제가 포함되어 있어요.</span>
      </div>
      <div role="alert" className="alert ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-s">20문제, 약 3분 정도 걸려요.</span>
      </div>
      <Link href="/quiz">
        <button className="btn btn-primary mt-6" onClick={handleStartQuiz}>
          퀴즈 풀기
          <FaArrowRight className="ml-1" />
        </button>
      </Link>
    </div>
  );
}
