import { useState } from "react";
import './quizz.css';
import { resultInitialState } from "./Constants";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
  const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (selectedAnswer, index) => {
    setAnswerIdx(index);
    if (selectedAnswer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setResult((prev) =>
      finalAnswer
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
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onExit = () => {
    // Implementar lógica adicional, se necessário
    window.location.reload(); // Simula sair, recarregando a página
  };

  const handleTimeup = () => {
    setAnswer(false);
    onClickNext(false);
  }

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <AnswerTimer duration={10} onTimeUp={handleTimeup}/>
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(choice, index)}
                key={choice}
                className={answerIdx === index ? 'selected-answer' : null}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={() => onClickNext} disabled={answerIdx === null}>
              {currentQuestion === questions.length - 1 ? "Finalizar" : "Próximo"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Resultado</h3>
          <p> Total de Acertos: <span>{result.correctAnswers}</span></p>
          <p> Total de Erros: <span>{result.wrongAnswers}</span></p>
          <p> Pontuação Final: <span>{result.score}</span></p>
          <button onClick={onExit} className="exit-button">Sair</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
