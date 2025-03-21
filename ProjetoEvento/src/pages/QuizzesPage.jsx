import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertToast from "../components/alert/AlertToast";
import QuizListCard from "../components/quizList/QuizListCard";
import QuizListActions from "../components/quizList/QuizListActions";
import QuizListConfirmationModal from "../components/quizList/QuizListConfirmationModal";


export default function QuizzesPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [quizzReleased, setQuizzReleased] = useState(false);
  const { idPalestra } = useParams();


  const verificarQuizzLiberado = async() => {
    try{

      const response = await fetch(`${import.meta.env.VITE_NETWORK_API_LINK}/api/palestra/isReleased/${idPalestra}`,
        {
          method: "GET",
          credentials: "include",
          headers: {"Content-Type":"application/json"},
        }
      );
      if (!response.ok) {
        console.error(`Erro: ${response.status} - ${response.statusText}`);
        return false;
        
      }
  
      const data = await response.json();
      const {message, horaLiberacao} = data;

      const horaLiberacaoDate = new Date(horaLiberacao).getTime();
      const currentTime = Date.now();

      console.log("curerntTime: ", currentTime,"horaLiberacao: ", horaLiberacao);
  
      if (message === "Quizz está liberado!") {
        return true;
      } else if (message === "Quizz ainda não foi liberado.") {
        if (currentTime >= horaLiberacaoDate)
        return true;
      } else {
        return false;
      }


    } catch (error){
      console.error("Erro ao verificar status do quiz:", error.message);
      setToastMessage({
        text: "Erro ao verificar se quizz está liberado.",
        type: "error"
      });
    }



  }


  // Função para verificar o status do quiz
  const verificarStatusQuizz = async () => {
    try {
      console.log("ID enviado:" , idPalestra)
      const response = await fetch(
        `${
          import.meta.env.VITE_NETWORK_API_LINK
        }/api/questoes/verificarStatus/${idPalestra}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 404) {
        return true; // Resultado não encontrado, pode iniciar o quiz
      }
      if (response.ok) {
        return false; // Resultado existe, quiz já cadastrado
      }
      throw new Error(`Erro ao verificar status: ${response.statusText}`);
    } catch (error) {
      console.error("Erro ao verificar status do quiz:", error.message);
      setToastMessage({
        text: "Erro ao verificar status do quiz.",
        type: "error",
      });
      return false; // Em caso de erro, assume que não pode iniciar
    }
  };

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
          text: `Erro ao sair: ${errorMessage}`,
          type: "error",
        });
        return;
      }

      localStorage.removeItem("palestraAtual");
      setToastMessage({
        text: "Você saiu da palestra.",
        type: "success",
      });
      setTimeout(() => navigate("/lista-de-palestras"), 2000);
    } catch (error) {
      console.error("Erro ao desinscrever:", error);
      setToastMessage({
        text: "Erro inesperado ao desinscrever.",
        type: "error",
      });
    }
  };

  const handleParticiparQuizz = async () => {
    try {
      // Verifica se o quiz pode ser iniciado
      const podeIniciar = await verificarStatusQuizz();

      if (!podeIniciar) {
        setToastMessage({
          text: "Você já participou deste quiz. Veja o ranking!",
          type: "info",
        });
        navigate("/ranking");
        return;
      }

      // Inicia o quiz se o resultado não existir (404)
      const iniciarResponse = await fetch(
        `${
          import.meta.env.VITE_NETWORK_API_LINK
        }/api/questoes/startquiz/${idPalestra}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!iniciarResponse.ok)
        throw new Error(`Erro ao iniciar quiz: ${iniciarResponse.statusText}`);

      // Após iniciar o quiz com sucesso, atualiza o estado e navega
      setQuizCompleted(false);
      setProgress(0);
      setScore(0);
      localStorage.setItem("palestraAtual", idPalestra); // Salva o idPalestra no localStorage
      navigate(`/quizz/${idPalestra}`);
    } catch (error) {
      console.error("Erro ao iniciar o quiz:", error.message);
      setToastMessage({
        text: "Erro ao iniciar o quiz. Tente novamente.",
        type: "error",
      });
    }
  };

  // Verifica o status ao carregar a página para atualizar o estado inicial
  useEffect(() => {
    const checkQuizStatus = async () => {
      const podeIniciar = await verificarStatusQuizz();
      setQuizCompleted(!podeIniciar); // Se não pode iniciar, o quiz está 
      console.log("quizz completed da pagina:", quizCompleted)
    };
  
    checkQuizStatus();


  }, [idPalestra]);

  useEffect(() => {
    const checkQuizzRelease = async () => {
      const releaseStatus = await verificarQuizzLiberado();
      setQuizzReleased(releaseStatus); // Atualiza o estado com o status de liberação do quiz
      console.log("quizz released da página:", releaseStatus);
    };
  
    // Inicia a verificação do status do quiz
    if (!quizzReleased) {
      // Inicia a verificação do status do quiz
      checkQuizzRelease();
    
      // Configura o intervalo para verificar o status a cada 5 segundos
      const intervalId = setInterval(checkQuizzRelease, 1000); // A cada 1 segundos
    
      // Cleanup: Limpar o intervalo quando o componente for desmontado ou quando o quiz for liberado
      return () => clearInterval(intervalId);
    }
  }, [idPalestra, quizzReleased]);

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
        quizzReleased={quizzReleased}
        quizCompleted={quizCompleted}
        
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
