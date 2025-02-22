import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function QuizzesPage() {
  const navigate = useNavigate();
  const [quizzes, SetQuizzes] = useState([]);

  const { idPalestra } = useParams();

  const desinscreverUsuario = async () => {
    // Confirmar se o usuário tem certeza de que deseja desinscrever
    const isConfirmed = window.confirm(
      "Você tem certeza de que deseja desinscrever da palestra?"
    );
    if (!isConfirmed) {
      return;
    }

    if (!idPalestra) {
      alert("Erro: ID da palestra não encontrado.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}
/api/palestra/desinscrever/${idPalestra}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(`Erro ao desinscrever: ${errorMessage}`);
        return;
      }

      localStorage.removeItem("palestraAtual");

      alert("Você foi desinscrito da palestra.");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao desinscrever:", error);
      alert("Erro inesperado ao desinscrever.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="border rounded flex flex-col p-3 items-center bg-purple-950 gap-3 ">
          <h1 className="text-center">Quizz</h1>
          <button
            className="bg-white text-purple-950 hover:bg-purple-400 hover:text-white rounded p-1"
            onClick={() => navigate(`/quizz/${idPalestra}`)}
          >
            Participar
          </button>
        </div>

        <button
          onClick={() => navigate(`/ranking`)}
          className="mt-8 bg-white rounded text-black p-2 hover:bg-gray-700 hover:text-white"
        >
          Ver Ranking
        </button>

        <button
          onClick={desinscreverUsuario}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Desinscrever
        </button>
      </div>
    </>
  );
}

export default QuizzesPage;
