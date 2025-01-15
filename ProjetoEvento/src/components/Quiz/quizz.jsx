import { useState } from "react";
import './quizz.css';
import { resultInitialState } from "./Constants";
const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx,setAnswerIdx] = useState(null);
  const [answer,setAnswer] = useState(null);
  const [Result, setResult] = useState(resultInitialState)

  const { question, choices, correctAnswer  } = questions[currentQuestion];

  const onAnwserClick = (answer, index) => {
    setAnswerIdx(index);
    if(answer === correctAnswer){
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) => 
      answer ? {
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1
      } : {
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,

      }
      
    )
  };

  return (
    <div className="quiz-container">
      <span className="active-question-no">{currentQuestion + 1}</span>
      <span className="total-question">/{questions.length}</span>
      <h2>{question}</h2>
      <ul>
        {
          choices.map((answer, index) => (
              <li 
              onClick={() => onAnwserClick(answer, index)}
              key={answer}
              className = {answerIdx === index ? 'selected-answer' : null}>
              
              {answer}
              </li>
          )) 
        }
      </ul>
      <div className="footer">
        <button onClick={onclick} disabled={answerIdx === null}>
          {currentQuestion === questions.length - 1 ? "Finalizar": "Proxímo"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
