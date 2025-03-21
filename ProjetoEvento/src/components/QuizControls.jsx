import React, { useState } from "react";
import { CheckCircle, Clock, CalendarPlus, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const QuizControls = ({
  liberarQuizAgora,
  liberarQuizProgramado,
  loading,
  horaLiberacao,
  setHoraLiberacao,
  quizzLiberado,
  quizzAgendado
}) => {
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);

  if (quizzLiberado) {
    return (
      <div className="p-6 bg-green-100 border border-green-500 rounded-lg text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
        <h2 className="text-2xl font-semibold text-green-700">Quiz Liberado!</h2>
        <p className="text-green-600">O quiz já foi liberado e não pode mais ser alterado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {quizzAgendado && (
        <div className="p-4 bg-blue-100 border border-blue-500 rounded-lg text-center">
          <Clock className="w-10 h-10 text-blue-500 mx-auto mb-2" />
          <p className="text-lg font-medium text-blue-700">
            O quiz será liberado em: <strong>{horaLiberacao ? format(parseISO(horaLiberacao), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "Não definido"}</strong>
          </p>
          <p className="text-blue-600">Você pode ajustar a hora de liberação se necessário.</p>
        </div>
      )}

      {/* Botão para liberar quiz agora */}
      <button
        className="w-full p-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2"
        onClick={liberarQuizAgora}
        disabled={loading || quizzAgendado}
      >
        {loading ? "Liberando..." : "Liberar o Quiz Agora"}
      </button>

      {/* Botão para exibir o agendamento */}
      {!mostrarAgendamento && (
        <button
          className="w-full py-3 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-600 flex items-center justify-center gap-2"
          onClick={() => setMostrarAgendamento(true)}
        >
          <CalendarPlus className="w-5 h-5" /> Programar Quiz
        </button>
      )}

      {/* Input e botão para programar quiz */}
      {mostrarAgendamento && (
        <div className="space-y-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Definir horário de liberação</h3>
            <button
              onClick={() => setMostrarAgendamento(false)}
              className="text-gray-600 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <label className="block text-lg text-gray-600">
            Hora de liberação:
            <input
              type="datetime-local"
              value={horaLiberacao}
              onChange={(e) => setHoraLiberacao(e.target.value)}
              disabled={quizzLiberado}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-200"
            />
          </label>
          <button
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-400"
            onClick={liberarQuizProgramado}
            disabled={loading || !horaLiberacao || quizzLiberado}
          >
            {loading ? "Programando..." : "Confirmar Agendamento"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizControls;
