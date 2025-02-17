import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import FeedbackMessage from "./FeedbackMessage";
import QuestionsInvite from "./QuestionsInvite.jsx";
import ChatComponent from "../AI/Groq.jsx"; // Importa o componente de geração de questões

function CreateQuestoes() {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const idPalestra = location.state?.idPalestra;

  useEffect(() => {
    if (!idPalestra) {
      setMessage("ID da palestra não encontrado. Verifique o fluxo de navegação.");
    }
  }, [idPalestra]);

  // Callback para receber a questão gerada pela IA
  const handleReceiveQuestion = useCallback((newQuestion) => {
    if (!newQuestion || !newQuestion.question) return;

    const formattedQuestion = {
      questionText: newQuestion.question || "",
      choices: newQuestion.choices || ["", "", "", ""],
      correctAnswer: newQuestion.correctAnswer || "",
    };

    setQuestions((prevQuestions) => [...prevQuestions, formattedQuestion]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 bg-gray-100 p-4">

      <QuestionsInvite
        questions={questions}
        setQuestions={setQuestions}
        idPalestra={idPalestra}
        setMessage={setMessage}
      />

      <FeedbackMessage message={message} />
    </div>
  );
}

export default CreateQuestoes;
