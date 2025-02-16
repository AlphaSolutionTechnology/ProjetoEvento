import { useState, useCallback } from "react";

export default function ChatComponent({ onReceiveQuestion }) {
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [questionCount, setQuestionCount] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleFetchChatCompletion = useCallback(async () => {
    setLoading(true);

    const message = `
Você é uma IA que cria questões em português baseadas EXCLUSIVAMENTE no conteúdo do arquivo PDF fornecido.
Retorne somente um array JSON no seguinte formato:
[
  {
    "question": "string",
    "choices": ["string1", "string2", ...],
    "correctAnswer": "string"
  }
]
Não utilize blocos de código, apenas JSON.
A quantidade de questões é ${questionCount}.
Utilize SOMENTE as informações contidas no PDF para gerar as questões.
    `;

    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ${res.status}: ${errorText}`);
      }
      const data = await res.json();
      let content = data.choices?.[0]?.message?.content || "Sem resposta";
      if (content.startsWith("```")) {
        content = content
          .split("\n")
          .filter((line) => !line.startsWith("```"))
          .join("\n");
      }
      let questionData;
      try {
        questionData = JSON.parse(content);
      } catch (err) {
        questionData = null;
      }
      if (Array.isArray(questionData)) {
        questionData.forEach((q) => onReceiveQuestion?.(q));
      } else if (questionData) {
        onReceiveQuestion?.(questionData);
      }
    } catch (error) {
      // Tratar erros conforme necessário
    } finally {
      setLoading(false);
      setShowPrompt(false);
      setQuestionCount("");
      setPdfFile(null);
    }
  }, [questionCount, onReceiveQuestion]);

  const handleButtonClick = () => {
    setShowPrompt(true);
  };

  const renderPrompt = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">
          Quantas questões você deseja?
        </h2>
        <input
          type="text"
          inputMode="numeric"
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
          onChange={(e) => setPdfFile(e.target.files[0])}
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
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full">
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={loading}
        className="w-full h-full bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Carregando..." : "Criar com IA"}
      </button>
      {showPrompt && renderPrompt()}
    </div>
  );
}
