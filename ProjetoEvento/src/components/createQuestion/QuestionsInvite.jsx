import { useState, useCallback } from "react";
import QuestionItem from "./QuestionItem";
import pdfToText from "react-pdftotext";
import AlertToast from "../alert/AlertToast";
import { Loader2 } from "lucide-react";

function QuestionsInvite({ questions, setQuestions, idPalestra, setMessage }) {
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [questionCount, setQuestionCount] = useState("2");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showAlert = (message, type = "message") => {
    setAlert({ open: true, message, type });
  };

  const handleExtractText = async (file) => {
    try {
      const text = await pdfToText(file);
      setPdfText(text);
    } catch (error) {
      setPdfText("");
      showAlert("Erro ao extrair texto do PDF.", "error");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      handleExtractText(file);
    } else {
      showAlert("Por favor, selecione um arquivo PDF válido.", "error");
    }
  };

  const handleFetchChatCompletion = useCallback(async () => {
    if (!pdfText.trim() && questions.length === 0) {
      showAlert(
        "Nenhum texto extraído do PDF e nenhuma questão existente.",
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/AI/requestquestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: pdfText,
          questionCount,
          existingQuestions: questions,
        }),
      });

      if (!res.ok) throw new Error(`Erro ${res.status}`);

      const data = await res.json();
      const formattedQuestions = data.map((q) => ({
        questionText: q.question || "",
        choices: q.choices || ["", "", "", ""],
        correctAnswer: q.correctAnswer || "",
      }));

      setQuestions((prev) => [...prev, ...formattedQuestions]);
      showAlert("Questões geradas com sucesso!", "success");
    } catch {
      showAlert("Erro ao gerar questões.", "error");
    } finally {
      setLoading(false);
      setShowPrompt(false);
      setQuestionCount("2");
      setPdfFile(null);
      setPdfText("");
    }
  }, [questionCount, pdfText, questions, setQuestions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idPalestra)
      return showAlert("ID da palestra não encontrado.", "error");

    const results = await Promise.all(
      questions.map(async (question) => {
        const payload = {
          enunciado: question.questionText,
          choices: question.choices,
          correctAnswer: question.correctAnswer,
          idPalestra,
        };
        try {
          const res = await fetch(
            "http://localhost:8080/api/questoes/createquestion",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );
          return res.ok;
        } catch {
          return false;
        }
      })
    );

    results.every(Boolean)
      ? showAlert("Questões enviadas com sucesso!", "success")
      : showAlert("Algumas questões falharam.", "error");
    setQuestions([
      { questionText: "", choices: ["", "", "", ""], correctAnswer: "" },
    ]);
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
            <h2 className="text-lg font-bold mb-4">Configurar Questões</h2>
            <input
              type="number"
              min="1"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="w-full p-2 mb-3 rounded-lg bg-gray-100 dark:bg-gray-700"
              placeholder="Quantidade"
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 mb-3 rounded-lg bg-gray-100 dark:bg-gray-700"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPrompt(false)}
                className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleFetchChatCompletion}
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
