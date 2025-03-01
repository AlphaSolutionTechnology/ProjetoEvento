import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import QuestionsInvite from "./QuestionsInvite.jsx"; 
import AlertToast from "../alert/AlertToast.jsx";

function CreateQuestoes() {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("warning");
  const [openAlert, setOpenAlert] = useState(false);
  const location = useLocation();
  const idPalestra = location.state?.idPalestra;

  useEffect(() => {
    if (!idPalestra) {
      setMessage(
        "ID da palestra não encontrado. Verifique o fluxo de navegação."
      );
      setAlertType("error");
      setOpenAlert(true);
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
    setMessage("Questão gerada com sucesso.");
    setAlertType("success");
    setOpenAlert(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <QuestionsInvite
        questions={questions}
        setQuestions={setQuestions}
        idPalestra={idPalestra}
        setMessage={setMessage}
      />

      {/* Componente de alerta atualizado*/}
      <AlertToast
        open={message}
        message={message}
        type={alertType}
        onClose={() => setOpenAlert(false)}
      />
    </div>
  );
}

export default CreateQuestoes;
