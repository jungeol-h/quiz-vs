import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">퀴즈 풀기</h1>
      <p className="mt-4 text-xl">당신의 상식을 테스트해보세요!</p>
      <Link href="/quiz">
        <button className="btn btn-primary mt-6">퀴즈 풀기</button>
      </Link>
    </div>
  );
}
