import { useState } from "react";


const Quizz = ({Qts}) => {
    const [currentquestion, setcurrentquestion] = useState(0);
    const {question, choices, correctAnswers} = question[currentquestion]
    return (
        <div className="containerQuizz">
            <>
            <span className="active-question-no">{currentquestion + 1}</span>
            <span className="total-question">{currentquestion}</span>
            </>
        </div>
    );
}

export default Quizz;