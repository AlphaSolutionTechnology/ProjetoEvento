import { useState } from "react";
import './quizz.css';
const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { question } = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <span className="active-question-no">{currentQuestion + 1}</span>
      <span className="total-question">/{questions.length}</span>
      <h2>{question}</h2>
    </div>
  );
};

export default Quiz;
