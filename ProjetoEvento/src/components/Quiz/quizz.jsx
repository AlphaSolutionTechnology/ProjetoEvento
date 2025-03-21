import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";
import QuizHeader from "./QuizHeader";
import QuizFooter from "./QuizFooter";

const Quiz = () => {
  const { idPalestra } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar as perguntas
  const fetchQuestions = async () => {
    try {
      if (questions.length > 0) return; // Evita requisições duplicadas

      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/questoes/${idPalestra}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok)
        throw new Error(`Erro ao buscar perguntas: ${response.statusText}`);

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error.message);
      navigate(`/quizzes/${idPalestra}`);
    } finally {
      setLoading(false);
    }
  };

  // Carrega as perguntas ao montar o componente
  useEffect(() => {
    fetchQuestions();
  }, [idPalestra]);

  const validateAnswer = async (selectedAnswer) => {
    try {
      const questionId = questions[currentQuestion].id;
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/questoes/validate`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId, selectedAnswer }),
        }
      );
      if (!response.ok) throw new Error("Erro ao validar resposta");
      const data = await response.json();
      return data.isCorrect;
    } catch (error) {
      console.error("Erro ao validar resposta:", error);
      return false;
    }
  };

  const finalizarQuiz = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_NETWORK_API_LINK
        }/api/questoes/finishquiz/${idPalestra}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            palestraId: idPalestra,
            score: score,
            correctAnswerCount: correctAnswers,
            wrongAnswerCount: wrongAnswers,
          }),
        }
      );
      if (!response.ok)
        throw new Error(`Erro ao finalizar quiz: ${response.statusText}`);
      const data = await response.json();
      setFinalResult({
        correctAnswers: data.correctAnswers,
        wrongAnswers: data.wrongAnswers,
        totalTime: data.totalTime.toFixed(2),
        score: data.score,
      });
    } catch (error) {
      console.error("Erro ao finalizar quiz:", error);
    }
  };

  const onAnswerClick = (selectedAnswer, index) => {
    setAnswerIdx(index);
    setAnswer(selectedAnswer);
  };

  const onClickNext = async () => {
    if (answer === null) return;

    const isCorrect = await validateAnswer(answer);
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev + 100);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    const isLastQuestion = currentQuestion === questions.length - 1;
    if (isLastQuestion) {
      await finalizarQuiz();
      setShowResult(true);
    } else {
      setAnswerIdx(null);
      setAnswer(null);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleTimeUp = () => {
    setShowResult(true);
    finalizarQuiz();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando quiz...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Nenhuma questão encontrada.
        <br />
        <button
          onClick={() => navigate(`/quizzes/${idPalestra}`)}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Voltar
        </button>
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
            totalTime={`${finalResult ? finalResult.totalTime : 0} segundos`}
            score={finalResult ? finalResult.score : 0}
            onExit={() => navigate(`/ranking`)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
