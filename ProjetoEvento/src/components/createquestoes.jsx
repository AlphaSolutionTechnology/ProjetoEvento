import { useEffect, useState } from "react";
import FormQuestion from "../components/FormQuestion";
import FeedbackMessage from "./FeedbackMessage";
import { useLocation } from "react-router-dom";

function CreateQuestoes() {
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [palestraId, setPalestraId] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  // Configura o palestraId a partir da localização
  useEffect(() => {
    const id = location.state?.idPalestra; // Recupera idPalestra do state
    setPalestraId(id || "");
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        enunciado: questionText,
        choices,
        correctAnswer,
        idPalestra: palestraId,
      };

      const response = await fetch("http://localhost:8080/api/questoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Quiz enviado com sucesso!");
        setQuestionText("");
        setChoices(["", "", "", ""]);
        setCorrectAnswer("");
        setPalestraId("");
      } else {
        setMessage("Erro ao enviar o quiz.");
      }
    } catch (error) {
      setMessage("Erro ao enviar a requisição.");
      console.error("Erro ao enviar a requisição:", error);
    }
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Criar Nova Questão</h1>
      <FormQuestion
        questionText={questionText}
        setQuestionText={setQuestionText}
        choices={choices}
        handleChoiceChange={handleChoiceChange}
        correctAnswer={correctAnswer}
        setCorrectAnswer={setCorrectAnswer}
        palestraId={palestraId}
        setPalestraId={setPalestraId}
        handleSubmit={handleSubmit}
      />
      <FeedbackMessage message={message} />
    </div>
  );
}

export default CreateQuestoes;
