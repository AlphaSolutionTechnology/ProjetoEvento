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
  const [showResult, setShowResult] = useState(false);
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_NETWORK_API_LINK}/api/questoes/${idPalestra}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error(`Erro ao buscar perguntas: ${response.statusText}`);
        }
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

  const onClickNext = async () => {
    try {
      const questionId = questions[currentQuestion].id;

      const timeSpent = ((Date.now() - quizStartTime) / 1000).toFixed(2);

      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/questoes/validateAndRecord`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: questionId,
            selectedAnswer: answer,
            timeSpent: parseFloat(timeSpent),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao validar e registrar resposta");
      }

      const data = await response.json();
      console.log("Resposta validada, isCorrect:", data.isCorrect);

      setAnswerIdx(null);
      setAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setQuizEndTime(Date.now());
        setShowResult(true);
      }
    } catch (error) {
      console.error("Erro na validação e registro da resposta:", error);
    }
  };

  // Função para finalizar o quiz quando o tempo acabar
  const handleTimeUp = () => {
    setQuizEndTime(Date.now());
    setShowResult(true);
  };

  // Calcula o tempo total de quiz
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
          
            correctAnswers={0}
            wrongAnswers={0}
            totalTime={getTotalTimeTaken()}
            onExit={() => (window.location.href = `/ranking`)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
