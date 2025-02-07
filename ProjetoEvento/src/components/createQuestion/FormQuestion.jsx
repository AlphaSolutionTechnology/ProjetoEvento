import React from "react";
import { motion } from "framer-motion";

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
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-lg mb-8 border border-gray-300 dark:border-gray-700"
    >
      {/* Título do formulário */}
      <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
        Criar Questão
      </h1>

      {/* Enunciado da Pergunta */}
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Enunciado da Pergunta
        </label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          rows="3"
          placeholder="Digite o enunciado da questão..."
        />
      </div>

      {/* Alternativas */}
      {choices.map((choice, index) => (
        <div key={index} className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Alternativa {index + 1}
          </label>
          <input
            type="text"
            value={choice}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder={`Digite a alternativa ${index + 1}...`}
          />
        </div>
      ))}

      {/* Resposta Correta */}
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Resposta Correta
        </label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Digite a alternativa correta..."
        />
      </div>

      {/* Botão de envio */}
      <div className="flex justify-center">
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Enviar Questão
        </motion.button>
      </div>
    </motion.form>
  );
}

export default FormQuestion;
