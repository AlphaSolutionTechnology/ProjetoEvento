// src/components/Quiz/createquestoes.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormQuestion from "./FormQuestion";
import FeedbackMessage from "./FeedbackMessage";
import ChatComponent from "../AI/Groq.jsx";

function CreateQuestoes() {
  // Estado para armazenar as questões; cada questão deve ter questionText, choices e correctAnswer
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

  // Função para enviar as questões para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idPalestra) {
      setMessage("ID da palestra não encontrado. Não é possível enviar as questões.");
      return;
    }

    let allSuccessful = true;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const payload = {
        enunciado: question.questionText,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
        idPalestra: idPalestra,
      };

      console.log(`Payload para a questão ${i + 1}:`, payload);

      try {
        const response = await fetch("http://localhost:8080/api/questoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          allSuccessful = false;
          console.error(`Erro ao enviar a questão ${i + 1}:`, response.statusText);
        }
      } catch (error) {
        allSuccessful = false;
        console.error(`Erro ao enviar a questão ${i + 1}:`, error);
      }
    }

    if (allSuccessful) {
      setMessage("Todas as questões foram enviadas com sucesso!");
      setQuestions([{ questionText: "", choices: ["", "", "", ""], correctAnswer: "" }]);
    } else {
      setMessage("Algumas questões não puderam ser enviadas.");
    }
  };

  // Funções para atualizar o estado do formulário
  const handleQuestionTextChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const updated = [...questions];
    updated[questionIndex].choices[choiceIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updated = [...questions];
    updated[index].correctAnswer = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", choices: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleReceiveQuestion = (newQuestion) => {
    const formattedQuestion = {
      questionText: newQuestion.question || "",
      choices: newQuestion.choices || ["", "", "", ""],
      correctAnswer: newQuestion.correctAnswer || ""
    };
  
    console.log("Adicionando questão ao estado:", formattedQuestion);
    setQuestions((prev) => [...prev, formattedQuestion]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {questions.map((question, index) => (
          <div key={index} className="mb-6 relative">
            <FormQuestion
              multiMode={true}
              questionText={question.questionText}
              setQuestionText={(value) => handleQuestionTextChange(index, value)}
              choices={question.choices}
              handleChoiceChange={(choiceIndex, value) =>
                handleChoiceChange(index, choiceIndex, value)
              }
              correctAnswer={question.correctAnswer}
              setCorrectAnswer={(value) => handleCorrectAnswerChange(index, value)}
            />
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Adicionar Questão
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Enviar Todas as Questões
          </button>
        </div>
      </form>
      <FeedbackMessage message={message} />
      {/* Envia a callback para o ChatComponent */}
      <ChatComponent onReceiveQuestion={handleReceiveQuestion} />
    </div>
  );
}

export default CreateQuestoes;
