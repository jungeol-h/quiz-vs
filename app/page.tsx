"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    // 로컬 스토리지 초기화
    localStorage.removeItem("quizResults");
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">GPT와 상식 퀴즈 대결</h1>
      <p className="mt-4 text-xl">
        GPT가 틀린 상식 문제, 몇 문제나 맞힐 수 있으신가요?
      </p>
      <Link href="/quiz">
        <button className="btn btn-primary mt-6">퀴즈 풀기</button>
      </Link>
    </div>
  );
}
