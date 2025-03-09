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

  // Buscar as questões do back-end (note que elas já não contêm o campo "correctAnswer")
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_NETWORK_API_LINK}/api/questoes/${idPalestra}`,
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

  // Armazena apenas a resposta selecionada (string) e o índice escolhido
  const onAnswerClick = (selectedAnswer, index) => {
    setAnswerIdx(index);
    setAnswer(selectedAnswer);
  };

  // Ao clicar em "Próxima", envia a resposta selecionada para o back-end para validação
  const onClickNext = async () => {
    try {
      // Considera que o objeto de questão possui o campo "id"
      const questionId = questions[currentQuestion].id;
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/questoes/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            questionId: questionId,
            selectedAnswer: answer,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na validação da resposta");
      }

      const data = await response.json();
      const isCorrect = data.isCorrect;

      setResult((prev) => ({
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        wrongAnswers: !isCorrect ? prev.wrongAnswers + 1 : prev.wrongAnswers,
        idPalestra: prev.idPalestra,
      }));

      // Limpa a seleção da resposta
      setAnswerIdx(null);
      setAnswer(null);

      // Avança para a próxima pergunta ou finaliza o quiz
      if (currentQuestion !== questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setQuizEndTime(Date.now());
        setShowResult(true);
      }
    } catch (error) {
      console.error("Erro ao validar resposta:", error);
    }
  };

  // Função para finalizar o quiz quando o tempo acabar
  const handleTimeUp = () => {
    setQuizEndTime(Date.now());
    setShowResult(true);
  };

  const getTotalTimeTaken = () => {
    if (!quizStartTime || !quizEndTime) return "Calculando...";
    const totalTimeMs = quizEndTime - quizStartTime;
    const totalSeconds = Math.floor(totalTimeMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${minutes} minuto(s) e ${seconds} segundo(s)`;
  };
  
  const enviarResultado = async () => {
    const totalTime = ((quizEndTime - quizStartTime) / 1000).toFixed(2);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/questoes/${idPalestra}`,
        {
          method: "GET", 
          credentials: "include",   // Envia cookies junto com a requisição
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
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
