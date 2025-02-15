import { useState, useCallback } from "react";

export default function ChatComponent({ onReceiveQuestion }) {
  const [loading, setLoading] = useState(false);

  const handleFetchChatCompletion = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:
            "Você é uma Ia que criar questões. Retorne somente um objeto JSON válido, sem usar blocos de código, no seguinte formato: { 'id': number, 'question': string, 'choices': string[], 'correctAnswer': string }.",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro no backend:", res.status, errorText);
        throw new Error(`Erro ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "Sem resposta";

      let questionData = null;
      try {
        questionData = JSON.parse(content);
      } catch (error) {
        console.error("Erro ao parsear JSON:", error);
      }

      if (questionData && typeof onReceiveQuestion === "function") {
        onReceiveQuestion(questionData);
      }
    } catch (error) {
      console.error("Erro ao chamar o backend:", error);
    } finally {
      setLoading(false);
    }
  }, [onReceiveQuestion]);

  return (
    <button
      onClick={handleFetchChatCompletion}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Carregando..." : "Criar com IA"}
    </button>
  );
}
