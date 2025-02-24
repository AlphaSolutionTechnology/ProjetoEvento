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
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    idPalestra: idPalestra,
  });
  const [showResult, setShowResult] = useState(false);

  // Buscar perguntas do backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_LINK}/api/questoes/${idPalestra}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
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
    setAnswer(selectedAnswer === questions[currentQuestion].correctAnswer);
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) => ({
      correctAnswers: answer ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: !answer ? prev.wrongAnswers + 1 : prev.wrongAnswers,
    }));

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizEndTime(Date.now());
      setShowResult(true);
    }
  };

  // Função para finalizar o quiz quando o tempo acabar
  const handleTimeUp = () => {
    setQuizEndTime(Date.now());
    setShowResult(true);
  };

  const getTotalTimeTaken = () => {
    if (!quizStartTime || !quizEndTime) return "Calculando...";
    const totalMinutes = Math.round((quizEndTime - quizStartTime) / 60000);
    return `${totalMinutes} minuto(s)`;
  };

  const enviarResultado = async () => {
    const totalTime = ((quizEndTime - quizStartTime) / 1000).toFixed(2);

    const resultData = {
      correctAnswerCount: result.correctAnswers,
      wrongAnswerCount: result.wrongAnswers,
      score: result.correctAnswers * 12,
      totalTime: parseFloat(totalTime),
    };

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_LOCAL_API_LINK
        }/api/questoes/registerresult/${idPalestra}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(resultData),
        }
      );

      if (response.ok) {
        console.log("Resultado enviado com sucesso!");
      } else {
        console.error("Erro ao enviar resultado:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
    }
  };

  useEffect(() => {
    if (showResult) {
      enviarResultado();
    }
  }, [showResult]);

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
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!showResult ? (
          <>
            <QuizHeader
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              onTimeUp={handleTimeUp} // Passando a função para finalizar o quiz
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
            correctAnswers={result.correctAnswers}
            wrongAnswers={result.wrongAnswers}
            totalTime={getTotalTimeTaken()}
            onExit={() => (window.location.href = `/ranking`)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
