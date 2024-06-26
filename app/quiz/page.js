"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";

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
    if (typeof window !== "undefined") {
      localStorage.removeItem("quizResults");
    }

    const fetchQuestions = async () => {
      const [quizSetResponse, quizSetEasyResponse] = await Promise.all([
        fetch("/quizSet.json"),
        fetch("/quizSetEasy.json"),
      ]);
      const [quizSetData, quizSetEasyData] = await Promise.all([
        quizSetResponse.json(),
        quizSetEasyResponse.json(),
      ]);

      const quizSetQuestions = quizSetData
        .map((q) => ({ ...q, source: "quizSet" }))
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      const quizSetEasyQuestions = quizSetEasyData
        .map((q) => ({ ...q, source: "quizSetEasy" }))
        .sort(() => 0.5 - Math.random())
        .slice(0, 14);
      const combinedQuestions = [...quizSetQuestions, ...quizSetEasyQuestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);

      setQuestions(combinedQuestions);
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctOption =
      currentQuestion.options[currentQuestion.correctAnswer - 1]; //1 based index
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
        source: currentQuestion.source, // Include source in the answers
      },
    ];

    setUserAnswers(updatedAnswers);
    setSelectedOption(option);
    setShowAnswer(true);

    const delay = process.env.NODE_ENV === "development" ? 100 : 1000;

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(
        () => {
          setShowAnswer(false);
          setSelectedOption(null);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        },
        isCorrectAnswer ? delay : delay
      );
    } else {
      isQuizCompleted.current = true;
      setTimeout(
        () => {
          setIsLoading(true);
          sendQuizData(updatedAnswers);
        },
        isCorrectAnswer ? delay : delay
      );
    }
  };

  const sendQuizData = async (updatedAnswers) => {
    try {
      const correctCount = updatedAnswers.filter(
        (answer) => answer.isCorrect
      ).length;

      const categoryScores = updatedAnswers.reduce((acc, answer) => {
        if (!acc[answer.category]) {
          acc[answer.category] = { correct: 0, total: 0 };
        }
        acc[answer.category].total++;
        if (answer.isCorrect) {
          acc[answer.category].correct++;
        }
        return acc;
      }, {});

      const response = await fetch(
        "https://hook.eu2.make.com/ljtf7563g3lhmyh2iad6ceqmohaiaenh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: updatedAnswers,
            correctCount: correctCount,
            totalQuestions: updatedAnswers.length,
            categoryScores: categoryScores,
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
          categoryScores: categoryScores,
        })
      );
      router.replace("/results");
    } catch (error) {
      console.error("Error sending quiz data:", error);
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
      <div className="w-full max-w-md relative">
        <Player
          autoplay
          loop
          src="/robot-lottie.json"
          style={{ height: "100px" }}
        />

        <div className="h-20">
          {showAnswer && (
            <div className="mt-2 flex justify-center">
              <div
                className={`relative bg-white p-4 rounded-lg shadow-md ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
                style={{ width: "fit-content" }}
              >
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-[6px] border-transparent border-b-white"
                  style={{ borderBottomColor: "white" }}
                ></div>
                {isCorrect ? (
                  <div>정답!!</div>
                ) : (
                  <div>틀렸습니다. 정답은 {correctOption}입니다.</div>
                )}
              </div>
            </div>
          )}
        </div>
        <progress
          className="progress progress-primary w-full mb-4"
          value={(currentQuestionIndex + 1) * (100 / questions.length)}
          max="100"
        ></progress>

        <div className="mb-4 text-lg flex justify-end flex-col gap-2 min-h-14 mb-4">
          {" "}
          {currentQuestion.source === "quizSet" && (
            <div className="badge badge-accent badge-outline text-xs">
              GPT가 틀린 문제
            </div>
          )}
          {currentQuestion.question}
        </div>
        <div className="flex flex-col">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`btn mb-2 ${
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
      </div>
    </div>
  );
};

export default Quiz;
