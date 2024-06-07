"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
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
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (isQuizCompleted.current) {
      sendQuizData(userAnswers);
    }
  }, [userAnswers]);

  const handleAnswerClick = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const updatedAnswers = [
      ...userAnswers,
      {
        question: currentQuestion.question,
        category: currentQuestion.category,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: option,
        isCorrect: option === currentQuestion.correctAnswer,
      },
    ];

    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      isQuizCompleted.current = true;
    }
  };

  const sendQuizData = async (updatedAnswers) => {
    try {
      const correctAnswersCount = updatedAnswers.filter(
        (answer) => answer.isCorrect
      ).length;
      const score = Math.round((correctAnswersCount / questions.length) * 100);

      const response = await fetch(
        "https://hook.eu2.make.com/x845bxmr5m361he31t4qx58weabrq2hp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers: updatedAnswers }),
        }
      );
      const data = await response.json();
      data.score = score;
      localStorage.setItem("quizResults", JSON.stringify(data));
      router.push("/results");
    } catch (error) {
      console.error("Error sending quiz data:", error);
      router.push("/results");
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-4">
        <div className="mb-4 text-lg">{currentQuestion.question}</div>
        <div className="flex flex-col">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="btn btn-outline mb-2"
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <progress
          className="progress progress-primary w-full mt-4"
          value={(currentQuestionIndex + 1) * (100 / questions.length)}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default Quiz;
