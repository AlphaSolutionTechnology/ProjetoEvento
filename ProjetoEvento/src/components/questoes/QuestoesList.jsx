// components/QuestoesList.js
import React from "react";

const QuestoesList = ({ questoes, currentSlide, prevSlide, nextSlide, deleteQuestao }) => {
  return (
    <div className="relative p-4">
      {/* Barra de progresso */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / questoes.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Botão de navegação anterior */}
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors duration-200 shadow-lg"
          onClick={prevSlide}
        >
          {"<"}
        </button>

        {/* Card da questão atual */}
        <div
          className="p-6 rounded-lg shadow-2xl bg-white dark:bg-gray-800 text-center w-full max-w-2xl mx-4 transition-colors duration-200"
          key={questoes[currentSlide].id}
        >
          {/* Enunciado da questão */}
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            {questoes[currentSlide].enunciado}
          </p>

          {/* Opções de resposta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questoes[currentSlide].choices.map((choice, index) => (
              <div
                key={index}
                className="text-center border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                {choice}
              </div>
            ))}
          </div>

          {/* Resposta correta */}
          <p className="text-sm text-blue-500 dark:text-blue-300 mt-6">
            Resposta:{" "}
            <strong className="text-gray-800 dark:text-gray-100">
              {questoes[currentSlide].correctAnswer}
            </strong>
          </p>

          {/* Botão para excluir a questão */}
          <button
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-lg"
            onClick={() => deleteQuestao(questoes[currentSlide].id)}
          >
            Excluir Questão
          </button>
        </div>

        {/* Botão de navegação próximo */}
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors duration-200 shadow-lg"
          onClick={nextSlide}
        >
          {">"}
        </button>
      </div>

      {/* Contador de questões */}
      <div className="text-center mt-6 text-gray-600 dark:text-gray-300">
        Questão {currentSlide + 1} de {questoes.length}
      </div>
    </div>
  );
};

export default QuestoesList;