import QuestionItem from "./QuestionItem";

function QuestionsInvite({ questions, setQuestions, idPalestra, setMessage }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idPalestra) {
      setMessage("ID da palestra não encontrado. Não é possível enviar as questões.");
      return;
    }

    // Envia todas as questões em paralelo
    const results = await Promise.all(
      questions.map(async (question, index) => {
        const payload = {
          enunciado: question.questionText,
          choices: question.choices,
          correctAnswer: question.correctAnswer,
          idPalestra: idPalestra,
        };

        console.log(`Payload para a questão ${index + 1}:`, payload);

        try {
          const response = await fetch("http://localhost:8080/api/questoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!response.ok) {
            console.error(
              `Erro ao enviar a questão ${index + 1}:`,
              response.statusText
            );
            return false;
          }
          return true;
        } catch (error) {
          console.error(`Erro ao enviar a questão ${index + 1}:`, error);
          return false;
        }
      })
    );

    const allSuccessful = results.every((res) => res === true);

    if (allSuccessful) {
      setMessage("Todas as questões foram enviadas com sucesso!");
      setQuestions([{ questionText: "", choices: ["", "", "", ""], correctAnswer: "" }]);
    } else {
      setMessage("Algumas questões não puderam ser enviadas.");
    }
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { questionText: "", choices: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          question={question}
          index={index}
          questions={questions}
          setQuestions={setQuestions}
        />
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
  );
}

export default QuestionsInvite;
