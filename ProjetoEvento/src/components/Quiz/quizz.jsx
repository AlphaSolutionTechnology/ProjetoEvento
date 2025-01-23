import { useState, useEffect } from "react";
import './quizz.css';

import AnswerTimer from "../AnswerTimer/AnswerTimer";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showResult, setShowResult] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/questoes");
        if (!response.ok) {
          throw new Error(`Erro ao buscar perguntas: ${response.statusText}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchQuestions();
  }, []);

  const onAnswerClick = (selectedAnswer, index) => {
    setAnswerIdx(index);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onExit = () => {
    window.location.reload();
  };

  if (questions.length === 0) {
    return <p>Carregando...</p>;
  }

  const { question, choices } = questions[currentQuestion];

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <AnswerTimer duration={10} onTimeUp={() => onClickNext(false)} />
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(choice, index)}
                key={choice}
                className={answerIdx === index ? "selected-answer" : null}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button
              onClick={onClickNext}
              disabled={answerIdx === null}
            >
              {currentQuestion === questions.length - 1 ? "Finalizar" : "Próximo"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Resultado</h3>
          <p>Total de Acertos: <span>{result.correctAnswers}</span></p>
          <p>Total de Erros: <span>{result.wrongAnswers}</span></p>
          <p>Pontuação Final: <span>{result.score}</span></p>
          <button onClick={onExit} className="exit-button">Sair</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
