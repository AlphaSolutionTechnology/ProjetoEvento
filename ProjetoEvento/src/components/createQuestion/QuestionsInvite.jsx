import { useState, useCallback } from "react";
import QuestionItem from "./QuestionItem";
import AlertToast from "../alert/AlertToast";
import { Loader2 } from "lucide-react";
import { usePdfText } from "../../hooks/usePdfText.js";
import { useGenerateQuestions } from "../../hooks/useGenerateQuestions";
import { submitQuestions } from "../../hooks/submitQuestions";

function QuestionsInvite({ questions, setQuestions, idPalestra, setMessage }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [questionCount, setQuestionCount] = useState("2");
  const [pdfFile, setPdfFile] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const { pdfText, handleExtractText } = usePdfText();
  const { loading, handleFetchChatCompletion } = useGenerateQuestions();

  const showAlert = (message, type = "message") => {
    setAlert({ open: true, message, type });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      handleExtractText(file).catch((error) => showAlert(error.message, "error"));
    } else {
      showAlert("Por favor, selecione um arquivo PDF válido.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await submitQuestions(questions, idPalestra);
      if (success) {
        showAlert("Questões enviadas com sucesso!", "success");
        setQuestions([
          { questionText: "", choices: ["", "", "", ""], correctAnswer: "" },
        ]);
      } else {
        showAlert("Algumas questões falharam.", "error");
      }
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  const addQuestion = () =>
    setQuestions((prev) => [
      ...prev,
      { questionText: "", choices: ["", "", "", ""], correctAnswer: "" },
    ]);

  const clearForm = () => {
    setQuestions([
      { questionText: "", choices: ["", "", "", ""], correctAnswer: "" },
    ]);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl p-4 backdrop-blur-lg bg-white/60 dark:bg-gray-900/70 rounded-2xl shadow-lg"
    >
      <AlertToast
        {...alert}
        onClose={() => setAlert({ open: false, message: "", type: "success" })}
      />
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          {...{ question, index, questions, setQuestions }}
        />
      ))}

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          onClick={addQuestion}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-3"
        >
          Adicionar Questão
        </button>
        <button
          type="button"
          onClick={() => setShowPrompt(true)}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-3"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Criar com IA"}
        </button>
        <button
          type="submit"
          className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl p-3"
        >
          Enviar Questões
        </button>
        <button
          type="button"
          onClick={clearForm}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl p-3"
        >
          Limpar Formulário
        </button>
      </div>

      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h2 className="text-lg text-black dark:text-white font-bold mb-4">Configurar Questões</h2>
            <input
              type="number"
              min="1"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="w-full p-2 mb-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
              placeholder="Quantidade"
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full text-black dark:text-white p-2 mb-3 rounded-lg bg-gray-100 dark:bg-gray-700"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPrompt(false)}
                className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleFetchChatCompletion(pdfText, questionCount, questions, setQuestions)
                  .then(() => {
                    showAlert("Questões geradas com sucesso!", "success");
                    setShowPrompt(false);
                    setQuestionCount("2");
                    setPdfFile(null);
                  })
                  .catch((error) => showAlert(error.message, "error"))}
                className="bg-blue-500 px-4 py-2 text-white rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default QuestionsInvite;