const QuizFooter = ({ onClickNext, isLastQuestion, isDisabled }) => {
    return (
      <div className="mt-8 flex justify-center">
        <button
          onClick={onClickNext}
          disabled={isDisabled}
          className="w-full md:w-auto py-3 px-6 bg-teal-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-teal-600 active:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
          aria-label="Próxima pergunta ou finalizar"
        >
          {isLastQuestion ? "Finalizar" : "Próximo"}
        </button>
      </div>
    );
  };
  
  export default QuizFooter;
  