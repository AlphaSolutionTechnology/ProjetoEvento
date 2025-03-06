import { Trophy, XCircle } from "lucide-react";

export default function QuizListActions({ quizCompleted, onViewRanking, onUnsubscribe }) {
  return (
    <section className="mt-8 flex flex-col gap-4 w-full max-w-md" aria-labelledby="actions-title">
      <h2 id="actions-title" className="sr-only">Ações</h2>
      {quizCompleted && (
        <button
          onClick={onViewRanking}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-400 text-white py-3 rounded-lg hover:from-purple-600 hover:to-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Ver ranking"
        >
          <Trophy size={18} aria-hidden="true" />
          Ver Ranking
        </button>
      )}
      <button
        onClick={onUnsubscribe}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-400 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Desinscrever da palestra"
      >
        <XCircle size={18} aria-hidden="true" />
        Desinscrever
      </button>
    </section>
  );
}