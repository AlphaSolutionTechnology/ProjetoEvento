// useGenerateQuestions.js
import { useState } from "react";

export function useGenerateQuestions() {
  const [loading, setLoading] = useState(false);

  const handleFetchChatCompletion = async (pdfText, questionCount, questions, setQuestions) => {
    if (!pdfText.trim() && questions.length === 0) {
      throw new Error("Nenhum texto extraído do PDF e nenhuma questão existente.");
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
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFetchChatCompletion };
}