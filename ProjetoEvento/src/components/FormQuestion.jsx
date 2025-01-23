import React from "react";

function FormQuestion({
  questionText,
  setQuestionText,
  choices,
  handleChoiceChange,
  correctAnswer,
  setCorrectAnswer,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sm:p-8"
    >
      <div className="mb-6">
        <label
          htmlFor="questionText"
          className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200"
        >
          Enunciado da Questão
        </label>
        <textarea
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full h-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
          placeholder="Digite o enunciado da questão"
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Opções de Resposta
        </label>
        {choices.map((choice, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label
          htmlFor="correctAnswer"
          className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200"
        >
          Resposta Correta
        </label>
        <input
          id="correctAnswer"
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Digite a resposta correta"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-500 sm:w-auto sm:px-8"
      >
        Criar Questão
      </button>
    </form>
  );
}

export default FormQuestion;
