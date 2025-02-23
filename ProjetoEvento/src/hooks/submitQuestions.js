// submitQuestions.js
export async function submitQuestions(questions, idPalestra) {
    if (!idPalestra) throw new Error("ID da palestra não encontrado.");
  
    const results = await Promise.all(
      questions.map(async (question) => {
        const payload = {
          enunciado: question.questionText,
          choices: question.choices,
          correctAnswer: question.correctAnswer,
          idPalestra,
        };
        try {
          const res = await fetch(`${import.meta.env.VITE_NETWORK_API_LINK}
/api/questoes/createquestion`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          return res.ok;
        } catch {
          return false;
        }
      })
    );
  
    return results.every(Boolean);
  }