// src/components/Quiz/QuestionItem.jsx
import FormQuestion from "./FormQuestion";

function QuestionItem({ question, index, questions, setQuestions }) {
  const handleQuestionTextChange = (value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleChoiceChange = (choiceIndex, value) => {
    const updated = [...questions];
    updated[index].choices[choiceIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (value) => {
    const updated = [...questions];
    updated[index].correctAnswer = value;
    setQuestions(updated);
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
