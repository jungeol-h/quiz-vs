"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import useTypingEffect from "../hooks/useTypingEffect";
import { sendGTMEvent } from "@next/third-parties/google";

const Results = () => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [grade, setGrade] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // [question, correctAnswer, userAnswer, isCorrect]
  const [categoryScores, setCategoryScores] = useState({});
  const router = useRouter();

  const typedNickname = useTypingEffect(nickname);

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
        setCategoryScores(data.categoryScores || {});
      }
      setLoading(false);
    };

    fetchResults();

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
  const handleRetakeQuiz = () => {
    sendGTMEvent("retake_quiz", "click");
    localStorage.removeItem("quizResults");
    router.push("/");
  };

  const handleShare = async () => {
    sendGTMEvent("share_quiz", "click");
    const shareData = {
      title: ogTitle,
      text: `${correctAnswersCount}개나 맞힌 이 분을 이겨보세요! 👊`,
      url: "https://nalmuk.com/",
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
              <h2 className="text-3xl font-bold mt-8">🎉 점수는...! 🎉</h2>
              <div className="p-8 rounded-lg shadow-lg">
                <p className="text-4xl mb-1">
                  <strong>{score}점</strong>
                </p>
                <p className="text-xs mb-2">
                  ({correctAnswersCount} / {totalQuestions})
                </p>
                <p className="text-2xl mb-4">
                  <strong>{grade}</strong>등급
                </p>
                <p className="text-l">🤖 한줄평</p>
                <p className="font-bold">{typedNickname}</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>
                    * 등급과 별명은 GPT가 정오답 문제를 기반으로 평가한
                    결과입니다.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-6">분야별 점수</h3>
                  <div className="flex flex-wrap justify-center gap-12">
                    {Object.keys(categoryScores).map((category, index) => {
                      const score = categoryScores[category];
                      const percentage =
                        score.total > 0
                          ? Math.round((score.correct / score.total) * 100)
                          : 0;
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="radial-progress bg-gray-50 text-primary text-xs"
                            style={{
                              "--value": percentage,
                              "--size": "3.5rem",
                            }}
                          >
                            {percentage}%
                          </div>
                          <p className="text-xs mt-2 text-neutral-400">
                            {category}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-20 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
                  <div
                    className="tooltip tooltip-open"
                    data-tip="새로운 문제 포함!"
                  >
                    <button
                      className="btn btn-secondary px-6 py-3"
                      onClick={handleRetakeQuiz}
                    >
                      🔄 다시 도전
                    </button>
                  </div>
                  <button
                    className="btn btn-primary px-6 py-3"
                    onClick={handleShare}
                  >
                    📢 친구에게 퀴즈 공유하기
                  </button>
                </div>
              </div>

              <div className="mt-8 mb-12">
                <h3 className="text-2xl font-bold mb-4">내가 푼 문제 </h3>
                <div className="space-y-4">
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-200 bg-base-100 rounded-box"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-left">
                      🔥 틀린 문제
                    </div>
                    <div className="collapse-content">
                      <ul>
                        {answers
                          .filter((answer) => !answer.isCorrect)
                          .map((answer, index) => (
                            <li key={index} className="text-left mb-7">
                              <p className="text-lg mb-2">{answer.question}</p>
                              <p className="text-sm mb-1">
                                정답: {answer.correctAnswer}
                              </p>
                              <p className="text-sm text-red-500">
                                내가 고른 답: {answer.userAnswer}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-200 bg-base-100 rounded-box"
                  >
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title text-xl font-medium text-left">
                      ✅ 맞은 문제
                    </div>
                    <div className="collapse-content">
                      <ul>
                        {answers
                          .filter((answer) => answer.isCorrect)
                          .map((answer, index) => (
                            <li key={index} className="text-left mb-7">
                              <p className="text-lg mb-2">{answer.question}</p>
                              <p className="text-sm mb-1 text-green-500">
                                정답: {answer.correctAnswer}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
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
