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
    <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <h1 className="my-6 text-3xl">Quizzes da Palestra</h1>

      <div className="flex flex-col w-[100%] items-center gap-4">
        {questoes.length === 0 ? (
          <p>Nenhuma questão encontrada.</p>
        ) : (
          questoes.map((questao) => (
            <div
              key={questao.id}
              className="flex flex-col p-5 gap-8 w-[70%] rounded shadow-md bg-white dark:bg-gray-800"
            >
              <p className="text-center">{questao.enunciado}</p>

              <div className="flex flex-col gap-5">
                {questao.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="text-center border border-gray-300 dark:border-gray-600 p-2 shadow-sm rounded-md"
                  >
                    {choice}
                  </div>
                ))}
              </div>
              <p>Resposta correta: {questao.correctAnswer}</p>
            </div>
          ))
        )}
      </div>

      <CreateQuestoes />
    </div>
  );
}

export default AdmQuizz;
