"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
export default function Home() {
  useEffect(() => {
    // 로컬 스토리지 초기화
    localStorage.removeItem("quizResults");
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">GPT 도장깨기</h1>

      <div className="mt-6">
        <Player
          autoplay
          loop
          src="/intro.json" // Update path to the JSON file
          style={{ height: "300px", width: "300px" }}
        />
      </div>
      <p className="mt-4 text-xl">GPT가 틀린 상식 문제들, 맞히실 수 있나요?</p>
      <Link href="/quiz">
        <button className="btn btn-primary mt-6">퀴즈 풀기</button>
      </Link>
      <p className="text-sm mt-2">20문제 / 약 3분 소요</p>
      {/* <p className="text-sm mt-2">정치 </p> */}
    </div>
  );
}
