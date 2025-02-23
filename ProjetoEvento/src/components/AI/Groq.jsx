import { useState, useCallback } from "react";
import pdfToText from "react-pdftotext";
import AlertToast from "../alert/AlertToast";

export default function ChatComponent({ onReceiveQuestion }) {
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

  const handleExtractText = async (file) => {
    try {
      const text = await pdfToText(file);
      setPdfText(text);
    } catch (error) {
      console.error("Erro ao extrair texto do PDF:", error);
      setPdfText("");
      setAlert({
        open: true,
        message: "Erro ao extrair texto do PDF.",
        type: "error",
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      handleExtractText(file);
    } else {
      setAlert("Por favor, selecione um arquivo PDF válido.", "error");
    }
  };

  const handleFetchChatCompletion = useCallback(async () => {
    if (!pdfText.trim()) {
      setAlert("Erro: Nenhum texto extraído do PDF.", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_NETWORK_API_LINK}
/api/AI/requestquestion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: pdfText,
          questionCount: questionCount || "2",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        data.forEach(onReceiveQuestion); // Passa as questões corretamente para `CreateQuestoes`
        setAlert({
          open: true,
          message: "Questões geradas com sucesso.",
          type: "success",
        });
      } else {
        console.warn("A resposta da /api não está no formato esperado:", data);
      }
    } catch (error) {
      console.error("Erro ao gerar questões:", error);
      setAlert({
        open: true,
        message: "Erro ao gerar questões.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setShowPrompt(false);
      setQuestionCount("2");
      setPdfFile(null);
      setPdfText("");
    }
  }, [questionCount, pdfText, onReceiveQuestion]);

  return (
    <div className="w-full h-full">
      <button
        type="button"
        onClick={() => setShowPrompt(true)}
        disabled={loading}
        className="w-full h-full bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Carregando..." : "Criar com IA"}
      </button>

      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">
              Quantas questões você deseja?
            </h2>
            <input
              type="number"
              min="1"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Ex: 2"
            />

            <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">
              Selecione um arquivo PDF:
            </h2>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPrompt(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleFetchChatCompletion}
                disabled={loading || !questionCount || !pdfFile}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Gerando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Componente de alerta */}
      <AlertToast
        open={alert.open}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ open: false, message: "", type: "success" })}
      />
    </div>
  );
}
