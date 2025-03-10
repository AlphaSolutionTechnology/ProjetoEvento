import { Play, Star, Award } from "lucide-react";

export default function QuizListCard({ score, onAction }) {
  return (
    <section
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center max-w-md w-full border border-gray-200 dark:border-gray-700"
      aria-labelledby="quiz-list-title"
    >
      <header>
        <h1 id="quiz-list-title" className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
          Quizz
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Teste seus conhecimentos e veja como você se sai!
        </p>
      </header>

      {/* Pontuação e Badges */}
      <section className="flex items-center justify-center gap-4 mb-6" aria-labelledby="score-title">
        <h2 id="score-title" className="sr-only">Pontuação e Badges</h2>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={20} aria-hidden="true" />
          <span className="text-gray-800 dark:text-gray-200">{score} pontos</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="text-purple-500" size={20} aria-hidden="true" />
          <span className="text-gray-800 dark:text-gray-200">1 badge</span>
        </div>
      </section>

      {/* Botão "Participar */}
      <button
        onClick={onAction}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-label="Participar do quizz"
      >
        <Play size={18} aria-hidden="true" />
        Participar
      </button>
    </section>
  );
}