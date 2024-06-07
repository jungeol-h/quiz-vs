"use client";

import { useEffect, useState } from "react";

const Results = () => {
  const [score, setScore] = useState(null);
  const [grade, setGrade] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = () => {
      const storedResults = localStorage.getItem("quizResults");
      if (storedResults) {
        const data = JSON.parse(storedResults);
        setScore(data.score);
        setGrade(data.tier);
        setNickname(data.nickname);
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {loading ? (
        <progress className="progress progress-primary w-full"></progress>
      ) : (
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">결과</h2>
          <p className="text-2xl mb-2">점수: {score}점</p>
          <p className="text-xl">등급: {grade}</p>
          <p className="text-xl">{nickname}</p>
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
            친구에게 자랑하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;
