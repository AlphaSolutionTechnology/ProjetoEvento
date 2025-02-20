// components/QuestoesList.js
import React from "react";

const QuestoesList = ({ questoes, currentSlide, prevSlide, nextSlide, deleteQuestao }) => {
  return (
    <div className="relative">
      <div className="flex justify-center items-center mb-4">
        {/* Botão de navegação anterior */}
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors duration-200"
          onClick={prevSlide}
        >
          {"<"}
        </button>

        {/* Card da questão atual */}
        <div
          className="p-6 rounded-md shadow-md bg-white dark:bg-gray-800 text-center w-full mx-4 transition-colors duration-200"
          key={questoes[currentSlide].id}
        >
          {/* Enunciado da questão */}
          <p className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
            {questoes[currentSlide].enunciado}
          </p>

          {/* Opções de resposta */}
          <div className="flex flex-col gap-2">
            {questoes[currentSlide].choices.map((choice, index) => (
              <div
                key={index}
                className="text-center border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 py-2 rounded-sm transition-colors duration-200"
              >
                {choice}
              </div>
            ))}
          </div>

          {/* Resposta correta */}
          <p className="text-sm text-blue-500 dark:text-blue-300 mt-4">
            Resposta:{" "}
            <strong className="text-gray-800 dark:text-gray-100">
              {questoes[currentSlide].correctAnswer}
            </strong>
          </p>

          {/* Botão para excluir a questão */}
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
            onClick={() => deleteQuestao(questoes[currentSlide].id)}
          >
            Excluir Questão
          </button>
        </div>

        {/* Botão de navegação próximo */}
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors duration-200"
          onClick={nextSlide}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default QuestoesList;