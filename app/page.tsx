"use client";
import { useEffect } from "react";
import Link from "next/link";

// Dynamically import the Player component
// const Player = dynamic(
//   () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
//   { ssr: false }
// );
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  useEffect(() => {
    // 로컬 스토리지 초기화
    localStorage.removeItem("quizResults");
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="mt-6">
        <Player
          autoplay
          loop
          src="/intro.json" // Update path to the JSON file
          style={{ height: "300px", width: "300px" }}
        />
      </div>
      <h1 className="text-5xl font-bold">GPT 상식 대결</h1>
      <p className="mt-4 text-xl">
        GPT보다 똑똑한지 몇 문제나 맞힐 수 있으신가요?
      </p>

      <Link href="/quiz">
        <button className="btn btn-primary mt-6">퀴즈 풀기</button>
      </Link>
    </div>
  );
}
