"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isQuizCompleted = useRef(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/quizSet.json");
      const data = await response.json();
      const shuffledQuestions = data
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);
      setQuestions(shuffledQuestions);
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctOption =
      currentQuestion.options[currentQuestion.correctAnswer - 1];
    const isCorrectAnswer = option === correctOption;

    setIsCorrect(isCorrectAnswer);

    const updatedAnswers = [
      ...userAnswers,
      {
        question: currentQuestion.question,
        category: currentQuestion.category,
        correctAnswer: correctOption,
        userAnswer: option,
        isCorrect: isCorrectAnswer,
      },
    ];

    setUserAnswers(updatedAnswers);
    setSelectedOption(option);
    setShowAnswer(true);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(
        () => {
          setShowAnswer(false);
          setSelectedOption(null); // 문제 전환 시 선택된 옵션 초기화
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        },
        isCorrectAnswer ? 100 : 100
      );
    } else {
      isQuizCompleted.current = true;
      setTimeout(
        () => {
          setIsLoading(true);
          sendQuizData(updatedAnswers);
        },
        isCorrectAnswer ? 100 : 100
      );
    }
  };

  const sendQuizData = async (updatedAnswers) => {
    try {
      const correctCount = updatedAnswers.filter(
        (answer) => answer.isCorrect
      ).length;
      const response = await fetch(
        "https://hook.eu2.make.com/x845bxmr5m361he31t4qx58weabrq2hp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: updatedAnswers,
            correctCount: correctCount,
            totalQuestions: updatedAnswers.length,
          }),
        }
      );
      const data = await response.json();
      localStorage.setItem(
        "quizResults",
        JSON.stringify({
          ...data,
          correctCount: correctCount,
          totalQuestions: updatedAnswers.length,
          answers: updatedAnswers,
        })
      );
      router.replace("/results");
    } catch (error) {
      console.error("Error sending quiz data:", error);
      // 에러 처리 로직 추가
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md p-4 text-center">
          <div>상식 등급 분석중...</div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const correctOption =
    currentQuestion.options[currentQuestion.correctAnswer - 1];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <progress
          className="progress progress-primary w-full mb-4"
          value={(currentQuestionIndex + 1) * (100 / questions.length)}
          max="100"
        ></progress>
        <div className="mb-4 text-lg ">{currentQuestion.question}</div>
        <div className="flex flex-col">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`btn btn-neutral mb-2 ${
                showAnswer && option === correctOption ? "bg-green-500" : ""
              } ${
                showAnswer &&
                option === selectedOption &&
                option !== correctOption
                  ? "bg-red-500"
                  : ""
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        {showAnswer && (
          <div className="mt-4">
            {isCorrect ? (
              <div className="text-green-500">정답입니다!</div>
            ) : (
              <div className="text-red-500">
                오답입니다. 정답은 {correctOption} 입니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
