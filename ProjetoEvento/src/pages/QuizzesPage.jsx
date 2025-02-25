import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertToast from "../components/alert/AlertToast";
import QuizListCard from "../components/quizList/QuizListCard"; // Importe o QuizListCard
import QuizListActions from "../components/quizList/QuizListActions"; // Importe o QuizListAction
import QuizListConfirmationModal from "../components/quizList/QuizListConfirmationModal"; // Importe o QuizListConfirmationModal

export default function QuizzesPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const { idPalestra } = useParams();

  const desinscreverUsuario = async () => {
    if (!idPalestra) {
      setToastMessage({
        text: "Erro: ID da palestra não encontrado.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_NETWORK_API_LINK
        }/api/palestra/desinscrever/${idPalestra}`,
        { method: "DELETE", credentials: "include" }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        setToastMessage({
          text: `Erro ao desinscrever: ${errorMessage}`,
          type: "error",
        });
        return;
      }

      NETWORKStorage.removeItem("palestraAtual");
      setToastMessage({
        text: "Você foi desinscrito da palestra.",
        type: "success",
      });
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      console.error("Erro ao desinscrever:", error);
      setToastMessage({
        text: "Erro inesperado ao desinscrever.",
        type: "error",
      });
    }
  };

  const handleParticiparQuizz = () => {
    setQuizCompleted(true);
    setProgress(100);
    setScore(850);
    navigate(`/quizz/${idPalestra}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      {/* Usando o QuizListCard */}
      <QuizListCard
        title="Quizz"
        description="Teste seus conhecimentos e veja como você se sai!"
        progress={progress}
        score={score}
        badges={1}
        onAction={handleParticiparQuizz}
        actionLabel="Participar"
      />

      {/* Usando o QuizListAction */}
      <QuizListActions
        quizCompleted={quizCompleted}
        onViewRanking={() => navigate("/ranking")}
        onUnsubscribe={() => setIsConfirmationModalOpen(true)}
      />

      {/* Usando o QuizListConfirmationModal */}
      <QuizListConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={() => {
          setIsConfirmationModalOpen(false);
          desinscreverUsuario();
        }}
        title="Desinscrever da Palestra"
        message="Você tem certeza de que deseja desinscrever da palestra?"
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
      />

      {/* Integração do AlertToast */}
      {toastMessage && (
        <AlertToast
          open={!!toastMessage}
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
          aria-live="polite"
        />
      )}
    </main>
  );
}
