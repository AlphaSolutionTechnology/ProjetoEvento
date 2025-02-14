// src/components/Quiz/CreateQuestoes.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FeedbackMessage from "./FeedbackMessage";
import ChatComponent from "../AI/Groq.jsx";
import QuestionsInvite from "./QuestionsInvite.jsx";

function CreateQuestoes() {
  const [questions, setQuestions] = useState([
    { questionText: "", choices: ["", "", "", ""], correctAnswer: "" }
  ]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const idPalestra = location.state?.idPalestra;

  useEffect(() => {
    if (!idPalestra) {
      setMessage("ID da palestra não encontrado. Verifique o fluxo de navegação.");
    }
  }, [idPalestra]);

  // Callback para receber a questão gerada pelo ChatComponent (IA)
  const handleReceiveQuestion = (newQuestion) => {
    const formattedQuestion = {
      questionText: newQuestion.question || "",
      choices: newQuestion.choices || ["", "", "", ""],
      correctAnswer: newQuestion.correctAnswer || ""
    };
    console.log("Adicionando questão ao estado:", formattedQuestion);
    setQuestions(prev => [...prev, formattedQuestion]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 bg-gray-100 p-4">
      <QuestionsInvite
        questions={questions}
        setQuestions={setQuestions}
        idPalestra={idPalestra}
        setMessage={setMessage}
      />
      <FeedbackMessage message={message} />
      <ChatComponent onReceiveQuestion={handleReceiveQuestion} />
    </div>
  );
}

export default CreateQuestoes;
