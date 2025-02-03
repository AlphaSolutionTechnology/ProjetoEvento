import React from "react";

function FormQuestion({
  questionText,
  setQuestionText,
  choices,
  handleChoiceChange,
  correctAnswer,
  setCorrectAnswer,
  handleSubmit,
  redirectToChat,
}) {
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-6 rounded shadow-md w-full max-w-md">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Enunciado da Pergunta</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows="3"
          placeholder="Digite o enunciado da questão..."
        />
      </div>
      {choices.map((choice, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Alternativa {index + 1}
          </label>
          <input
            type="text"
            value={choice}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder={`Digite a alternativa ${index + 1}...`}
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Resposta Correta</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Digite a alternativa correta..."
        />
      </div>
      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Enviar Questão
        </button>
      </div>
    </form>
  );
}

export default FormQuestion;
