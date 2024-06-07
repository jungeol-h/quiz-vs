"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Results = () => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [grade, setGrade] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = () => {
      const storedResults = localStorage.getItem("quizResults");
      if (storedResults) {
        const data = JSON.parse(storedResults);
        setCorrectAnswersCount(data.correctCount || 0);
        setTotalQuestions(data.totalQuestions || 0);
        setGrade(data.tier);
        setNickname(data.nickname);
      }
      setLoading(false);
    };

    fetchResults();

    // Replace the current history state to disable back navigation
    history.replaceState(null, "", location.href);

    const handlePopState = (event) => {
      event.preventDefault();
      router.push("/"); // Redirect to home if back is attempted
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const score =
    totalQuestions > 0
      ? Math.round((correctAnswersCount / totalQuestions) * 100)
      : 0;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {loading ? (
        <progress className="progress progress-primary w-full"></progress>
      ) : (
        <div className="text-center">
          {totalQuestions > 0 ? (
            <>
              <h2 className="text-4xl font-bold mb-4">결과</h2>
              <p className="text-2xl mb-2">점수: {score}점</p>
              <p className="text-xl">
                맞은 문제 수: {correctAnswersCount} / {totalQuestions}
              </p>
              <p className="text-xl">등급: {grade}</p>
              <p className="text-xl">{nickname}</p>
              <div className="flex flex-col items-center">
                <button
                  className="btn btn-secondary mt-4"
                  onClick={() => {
                    localStorage.removeItem("quizResults");
                    router.push("/quiz");
                  }}
                >
                  다시하기
                </button>
                <button
                  className="btn btn-primary mt-6"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "퀴즈 결과",
                        text: `GPT도 틀린 문제를 ${score}점이나 맞힌 이 분을 이겨보세요!`,
                        url: window.location.href,
                      });
                    } else {
                      alert("공유 기능을 지원하지 않는 브라우저입니다.");
                    }
                  }}
                >
                  친구 도발하기
                </button>
              </div>
            </>
          ) : (
            <p className="text-xl">풀이한 문제가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
