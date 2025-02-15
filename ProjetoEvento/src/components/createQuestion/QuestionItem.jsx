import FormQuestion from "./FormQuestion";

function QuestionItem({ question, index, questions, setQuestions }) {
  const handleQuestionTextChange = (value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, questionText: value } : q
      )
    );
  };

  const handleChoiceChange = (choiceIndex, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index
          ? {
              ...q,
              choices: q.choices.map((choice, ci) =>
                ci === choiceIndex ? value : choice
              ),
            }
          : q
      )
    );
  };

  const handleCorrectAnswerChange = (value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, correctAnswer: value } : q
      )
    );
  };

  const removeQuestion = () => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="mb-6 relative">
      <FormQuestion
        multiMode={true}
        questionText={question.questionText}
        setQuestionText={handleQuestionTextChange}
        choices={question.choices}
        handleChoiceChange={handleChoiceChange}
        correctAnswer={question.correctAnswer}
        setCorrectAnswer={handleCorrectAnswerChange}
      />
      {questions.length > 1 && (
        <button
          type="button"
          onClick={removeQuestion}
          className="absolute top-0 right-0 text-red-500 hover:text-red-700"
        >
          Remover
        </button>
      )}
    </div>
  );
}

export default QuestionItem;
