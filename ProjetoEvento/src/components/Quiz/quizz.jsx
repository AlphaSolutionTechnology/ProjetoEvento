import { useState, useEffect } from "react";
import AnswerTimer from "../AnswerTimer/AnswerTimer";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showResult, setShowResult] = useState(false);

  // Buscar perguntas do backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/questoes");
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
  }, []);

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

  const getTotalTimeTaken = () => {
    if (!quizStartTime || !quizEndTime) return "Calculando...";
    const totalSeconds = ((quizEndTime - quizStartTime) / 1000).toFixed(2);
    return `${totalSeconds} segundos`;
  };

  const enviarResultado = async () => {
    const totalTime = ((quizEndTime - quizStartTime) / 1000).toFixed(2);

    const resultData = {
        correctAnswerCount: result.correctAnswers,
        wrongAnswerCount: result.wrongAnswers,
        score: result.correctAnswers * 5, 
        totalTime: parseFloat(totalTime),
    };

    try {
        const response = await fetch("http://localhost:8080/api/questoes/registerresult", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(resultData),
        });

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
    return <p>Carregando...</p>;
  }

  const { question, choices } = questions[currentQuestion];

  return (
    <div className="result text-center mt-6 p-4 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      {!showResult ? (
        <>
          <AnswerTimer duration={10} onTimeUp={() => onClickNext(false)} />

          <div className="flex items-center gap-2 text-xl font-semibold mt-2">
            <span className="active-question-no">{currentQuestion + 1}</span>
            <span className="total-question">/{questions.length}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mt-2">{question}</h2>

          <ul className="mt-4 space-y-4">
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(choice, index)}
                key={choice}
                className={`cursor-pointer p-3 rounded-lg transition-colors duration-300 ease-in-out 
                  ${answerIdx === index ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"} 
                   dark:hover:bg-blue-700 hover:bg-blue-200`}
                role="button"
                aria-pressed={answerIdx === index ? "true" : "false"}
              >
                {choice}
              </li>
            ))}
          </ul>

          <div className="footer mt-6">
            <button
              onClick={onClickNext}
              disabled={answerIdx === null}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg transition-all hover:bg-blue-600 disabled:bg-gray-400"
              aria-label="Próxima pergunta ou finalizar"
            >
              {currentQuestion === questions.length - 1 ? "Finalizar" : "Próximo"}
            </button>
          </div>
        </>
      ) : (
        <div className="result text-center mt-6">
          <h3 className="text-2xl font-semibold mb-4">Resultado</h3>
          <p className="text-lg">
            Total de Acertos: <span className="font-bold">{result.correctAnswers}</span>
          </p>
          <p className="text-lg">
            Total de Erros: <span className="font-bold">{result.wrongAnswers}</span>
          </p>

          <h4 className="text-lg font-semibold mt-4">Tempo total do Quiz:</h4>
          <p className="text-md font-bold">{getTotalTimeTaken()}</p>

          <button
            onClick={() => (window.location.href = "/home")}
            className="exit-button mt-6 py-2 px-4 bg-red-500 text-white rounded-lg transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
