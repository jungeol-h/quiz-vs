"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Results = () => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [grade, setGrade] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // [question, correctAnswer, userAnswer, isCorrect]
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
        setAnswers(data.answers || []);
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

  const ogImageUrl = "이미지URL"; // 동적으로 설정할 수 있습니다.
  const ogTitle = "날먹상식: 인간 vs GPT";
  const ogDescription = `${score}점 맞힌 이 분을 이겨보세요! 👊`;

  const copyToClipboard = (text) => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("링크가 클립보드에 복사되었습니다. 친구에게 직접 공유해보세요!");
  };

  const handleShare = async () => {
    const shareData = {
      title: ogTitle,
      text: `${correctAnswersCount}개나 맞힌 이 분을 이겨보세요! 👊`,
      url: "https://quiz-vs.vercel.app/",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
        alert("공유 중 오류가 발생했습니다.");
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("링크가 클립보드에 복사되었습니다. 친구에게 직접 공유해보세요!");
      } catch (error) {
        console.error("Clipboard error:", error);
        copyToClipboard(shareData.url);
      }
    } else {
      copyToClipboard(shareData.url);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {loading ? (
        <div className="text-center">
          <div className="spinner"></div>
          <p className="text-xl mt-4">결과 로딩 중...</p>
        </div>
      ) : (
        <div className="text-center">
          {totalQuestions > 0 ? (
            <>
              <h2 className="text-4xl font-bold mb-8 mt-8">🎉 퀴즈 결과 🎉</h2>
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <p className="text-3xl mb-1">
                  당신의 점수는 <br></br>
                  <strong>{score}점</strong>
                </p>
                <p className="text-xs mb-2">
                  ({correctAnswersCount} / {totalQuestions})
                </p>
                <p className="text-2xl mb-4">
                  <strong>{grade}</strong>등급
                </p>
                <p className="text-xl">🤖 한줄평: {nickname}</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>
                    * 등급과 별명은 GPT가 정오답 문제를 기반으로 평가한
                    결과입니다.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <button
                  className="btn btn-secondary px-6 py-3 mr-4"
                  onClick={() => {
                    localStorage.removeItem("quizResults");
                    router.push("/quiz");
                  }}
                >
                  🔄 다시하기
                </button>
                <button
                  className="btn btn-primary px-6 py-3"
                  onClick={handleShare}
                >
                  📢 친구에게 퀴즈 공유하기
                </button>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">문제 리스트</h3>
                <ul className="space-y-4">
                  {answers.map((answer, index) => (
                    <li key={index} className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-lg mb-2">{answer.question}</p>
                      <p className="text-sm text-gray-400 mb-1">
                        정답: {answer.correctAnswer}
                      </p>
                      <p
                        className={`text-sm ${
                          answer.isCorrect ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        내가 고른 답: {answer.userAnswer}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-2xl">풀이한 문제가 없습니다. 😢</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
