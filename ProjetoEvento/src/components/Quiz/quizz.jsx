import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";
import QuizHeader from "./QuizHeader";
import QuizFooter from "./QuizFooter";

const Quiz = () => {
  const { idPalestra } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_LINK}/api/questoes/${idPalestra}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error(`Erro ao buscar perguntas: ${response.statusText}`);
        const data = await response.json();
        setQuestions(data);
        setQuizStartTime(Date.now());
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchQuestions();
  }, [idPalestra]);

  const onAnswerClick = (selectedAnswer, index) => {
    setAnswerIdx(index);
    setAnswer(selectedAnswer);
  };

  const onClickNext = () => {
    const questionId = questions[currentQuestion].id;
    const timeSpent = ((Date.now() - quizStartTime) / 1000).toFixed(2);
    const newAnswer = {
      questionId,
      selectedAnswer: answer,
      timeSpent: parseFloat(timeSpent),
    };
    const updatedAnswers = [...answers, newAnswer];
    const isLastQuestion = currentQuestion === questions.length - 1;
    if (isLastQuestion) {
      setAnswers(updatedAnswers);
      setQuizEndTime(Date.now());
      setShowResult(true);
      sendAllAnswers(updatedAnswers);
    } else {
      setAnswers(updatedAnswers);
      setAnswerIdx(null);
      setAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const sendAllAnswers = async (answersArray) => {
    try {
      const endTime = Date.now();
      const totalTimeSeconds = ((endTime - quizStartTime) / 1000).toFixed(2);
      const payload = {
        idPalestra,
        totalTime: parseFloat(totalTimeSeconds),
        answers: answersArray,
        final: true,
      };
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_LINK}/api/questoes/validateAndRecord`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Erro ao enviar todas as respostas");
      const data = await response.json();
      setFinalResult(data);
    } catch (error) {
      console.error("Erro ao enviar todas as respostas:", error);
    }
  };

  const handleTimeUp = () => {
    setQuizEndTime(Date.now());
    setShowResult(true);
    sendAllAnswers(answers);
  };

  const getTotalTimeTaken = () => {
    if (!quizStartTime || !quizEndTime) return "Calculando...";
    const totalMs = quizEndTime - quizStartTime;
    const totalSec = Math.floor(totalMs / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${minutes} minuto(s) e ${seconds} segundo(s)`;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Nenhuma questão encontrada.
      </div>
    );
  }

  const { enunciado, choices } = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <motion.div
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!showResult ? (
          <>
            <QuizHeader
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              onTimeUp={handleTimeUp}
              idPalestra={idPalestra}
            />
            <QuestionCard
              enunciado={enunciado}
              choices={choices}
              answerIdx={answerIdx}
              onAnswerClick={onAnswerClick}
            />
            <QuizFooter
              onClickNext={onClickNext}
              isLastQuestion={currentQuestion === questions.length - 1}
              isDisabled={answerIdx === null}
            />
          </>
        ) : (
          <ResultCard
            correctAnswers={finalResult ? finalResult.correctAnswers : 0}
            wrongAnswers={finalResult ? finalResult.wrongAnswers : 0}
            totalTime={finalResult ? finalResult.totalTime : getTotalTimeTaken()}
            score={finalResult ? finalResult.score : 0}
            onExit={() => (window.location.href = `/ranking`)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
