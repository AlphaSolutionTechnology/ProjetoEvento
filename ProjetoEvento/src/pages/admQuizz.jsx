import { useEffect, useState } from "react";
import CreateQuestoes from "../components/createquestoes";
import { useLocation } from "react-router-dom";

function AdmQuizz() {
  const [questoes, setQuestoes] = useState([]);
  const [palestraId, setPalestraId] = useState(null);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gerenciar Quizzes da Palestra
      </h1>

      {/* Componente principal para criação de questões */}
      <div className="w-full max-w-4xl mb-12">
        <CreateQuestoes />
      </div>

      {/* Visualização das questões */}
      <div className="flex flex-col w-full max-w-4xl gap-6">
        {questoes.length === 0 ? (
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
            Nenhuma questão encontrada.
          </p>
        ) : (
          questoes.map((questao) => (
            <div
              key={questao.id}
              className="flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800"
            >
              <p className="text-lg font-medium text-white text-center">
                {questao.enunciado}
              </p>
              <div className="flex flex-col gap-3">
                {questao.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="text-center border border-white text-white py-2 rounded-md"
                  >
                    {choice}
                  </div>
                ))}
              </div>
              <p className="text-sm text-right text-blue-300">
                Resposta correta:{" "}
                <strong className="text-white">{questao.correctAnswer}</strong>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdmQuizz;
