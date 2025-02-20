// hooks/useQuestoes.js
import { useState } from "react";

export const useQuestoes = (palestraId) => {
  const [questoes, setQuestoes] = useState([]);
  const [loadingQuestoes, setLoadingQuestoes] = useState(false);

  const searchQuestoes = async () => {
    if (!palestraId) return;

    setLoadingQuestoes(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/questoes/${palestraId}`
      );

      if (response.ok) {
        const data = await response.json();
        setQuestoes(data);
        return { success: true, message: "Questões carregadas com sucesso!" };
      } else {
        throw new Error("Erro ao buscar as questões.");
      }
    } catch (error) {
      console.error("Erro:", error);
      return { success: false, message: "Falha ao carregar questões." };
    } finally {
      setLoadingQuestoes(false);
    }
  };

  const deleteQuestao = async (idQuestao) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/questoes/delete/${idQuestao}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setQuestoes((prevQuestoes) =>
          prevQuestoes.filter((questao) => questao.id !== idQuestao)
        );
        return { success: true, message: "Questão excluída com sucesso!" };
      } else {
        throw new Error("Erro ao excluir a questão.");
      }
    } catch (error) {
      console.error("Erro:", error);
      return { success: false, message: "Falha ao excluir questão." };
    }
  };

  return { questoes, loadingQuestoes, searchQuestoes, deleteQuestao };
};
