import { useEffect, useState } from "react";
import CreateQuestoes from "../components/createQuestion/createquestoes";
import { useLocation } from "react-router-dom";

function AdmQuizz() {
  const [questoes, setQuestoes] = useState([]);
  const [palestraId, setPalestraId] = useState(null);
  const [showQuestoes, setShowQuestoes] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const id = location.state?.idPalestra;
    setPalestraId(id || "");
  }, [location.search]);

  const searchQuestoes = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/questoes/palestraQuizz?idPalestra=${palestraId}`
      );

      if (response.ok) {
        const data = await response.json();
        setQuestoes(data);
      } else {
        throw new Error("Erro ao buscar as questões.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    if (palestraId) {
      searchQuestoes();
    }
  }, [palestraId]);

  const deleteQuestao = async (idQuestao) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/questoes/delete/${idQuestao}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Garante que cookies sejam enviados
        }
      );
  
      if (response.ok) {
        setQuestoes(questoes.filter((questao) => questao.id !== idQuestao));
      } else {
        throw new Error("Erro ao excluir a questão.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };
  
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % questoes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + questoes.length) % questoes.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gerenciar Quizzes da Palestra
      </h1>

      <div className="mb-8 flex gap-4">
        {!showQuestoes ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => setShowQuestoes(true)}
          >
            Ver Questões
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => setShowQuestoes(false)}
          >
            Voltar para Criar Questões
          </button>
        )}
      </div>

      {showQuestoes ? (
        <div className="w-full max-w-4xl">
          {questoes.length === 0 ? (
            <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
              Nenhuma questão encontrada.
            </p>
          ) : (
            <div className="relative">
              <div className="flex justify-center items-center mb-4">
                <button
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                  onClick={prevSlide}
                >
                  {"<"}
                </button>
                <div
                  className="p-6 rounded-md shadow-md bg-gray-100 dark:bg-gray-700 text-center w-full mx-4"
                  key={questoes[currentSlide].id}
                >
                  <p className="text-lg font-medium text-white mb-4">
                    {questoes[currentSlide].enunciado}
                  </p>
                  <div className="flex flex-col gap-2">
                    {questoes[currentSlide].choices.map((choice, index) => (
                      <div
                        key={index}
                        className="text-center border border-white text-white py-2 rounded-sm"
                      >
                        {choice}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-blue-300 mt-4">
                    Resposta: <strong className="text-white">{questoes[currentSlide].correctAnswer}</strong>
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => deleteQuestao(questoes[currentSlide].id)}
                  >
                    Excluir Questão
                  </button>
                </div>
                <button
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                  onClick={nextSlide}
                >
                  {">"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <CreateQuestoes />
        </div>
      )}
    </div>
  );
}

export default AdmQuizz;
