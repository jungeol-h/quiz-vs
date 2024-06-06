"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const router = useRouter();

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

  const handleAnswerClick = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestion.question,
        category: currentQuestion.category,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: option,
      },
    ]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      sendQuizData();
      router.push("/results");
    }
  };

  const sendQuizData = async () => {
    try {
      await fetch(
        "https://hook.eu2.make.com/x845bxmr5m361he31t4qx58weabrq2hp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers: userAnswers }),
        }
      );
    } catch (error) {
      console.error("Error sending quiz data:", error);
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
