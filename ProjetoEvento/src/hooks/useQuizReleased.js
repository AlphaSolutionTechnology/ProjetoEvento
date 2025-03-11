import { useState, useEffect } from "react";
import { useContext } from "react";
import { WebSocketContext } from "../context/WebSocketContext";

const useQuizReleased = () => {
  const { messages } = useContext(WebSocketContext);
  const [quizReleased, setQuizReleased] = useState(false);

  useEffect(() => {
    // Verifica todas as mensagens para encontrar uma do tipo "quizz-liberado"
    const quizMessage = messages.find((message) => message.type === "quizz-liberado");

    if (quizMessage) {
      setQuizReleased(true); // Define como liberado se encontrar mensagem de "quizz-liberado"
    } else {
      setQuizReleased(false); // Reseta para false caso nenhuma mensagem do tipo "quizz-liberado" seja encontrada
    }
  }, [messages]); // Reage às mudanças nas mensagens recebidas

  return quizReleased;
};

export default useQuizReleased;
