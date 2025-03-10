import { CheckCircle, XCircle, Clock, Trophy } from "lucide-react";

const ResultCard = ({ correctAnswers, wrongAnswers, totalTime, score, onExit }) => {
  return (
    <section className="text-center p-6">
      <header>
        <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Resultado
        </h3>
      </header>

      <dl className="space-y-4 text-gray-800 dark:text-gray-200">
        <div className="flex items-center gap-3">
          <XCircle className="w-8 h-8 text-red-500" />
          <dt className="text-xl">Erros:</dt>
          <dd className="text-xl font-bold">{wrongAnswers}</dd>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <dt className="text-xl">Acertos:</dt>
          <dd className="text-xl font-bold">{correctAnswers}</dd>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-blue-500" />
          <dt className="text-xl">Tempo:</dt>
          <dd className="text-xl font-bold">{totalTime}</dd>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <dt className="text-xl">Pontuação:</dt>
          <dd className="text-xl font-bold">{score}</dd>
        </div>
      </dl>

      <button
        onClick={onExit}
        className="mt-8 py-3 px-6 bg-yellow-500 text-white rounded-lg transition-all hover:bg-yellow-600 flex items-center justify-center gap-3"
      >
        <Trophy className="w-6 h-6" />
        <span>Ver Ranking</span>
      </button>
    </section>
  );
};

export default ResultCard;