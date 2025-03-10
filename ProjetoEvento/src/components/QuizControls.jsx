import React from "react";

const QuizControls = ({ liberarQuizAgora, liberarQuizProgramado, loading, horaLiberacao, setHoraLiberacao }) => {
  return (
    <div className="space-y-6">
      {/* Botão para liberar o quiz agora */}
      <button
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 disabled:bg-gray-400"
        onClick={liberarQuizAgora}
        disabled={loading}
      >
        {loading ? "Liberando..." : "Liberar o Quiz Agora"}
      </button>

      {/* Opção para programar a liberação */}
      <div className="space-y-4">
        <label className="block text-lg text-gray-600">
          Hora de liberação:
          <input
            type="datetime-local"
            value={horaLiberacao}
            onChange={(e) => setHoraLiberacao(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <button
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-400"
          onClick={liberarQuizProgramado}
          disabled={loading || !horaLiberacao}
        >
          {loading ? "Programando..." : "Programar Liberação"}
        </button>
      </div>
    </div>
  );
};

export default QuizControls;
