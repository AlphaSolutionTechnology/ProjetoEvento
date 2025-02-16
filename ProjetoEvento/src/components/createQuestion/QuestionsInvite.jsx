import QuestionItem from "./QuestionItem";
import ChatComponent from "../AI/Groq.jsx";

function QuestionsInvite({
  questions,
  setQuestions,
  idPalestra,
  setMessage,
  onReceiveQuestion,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idPalestra) {
      setMessage("ID da palestra não encontrado. Não é possível enviar as questões.");
      return;
    }

    const results = await Promise.all(
      questions.map(async (question, index) => {
        const payload = {
          enunciado: question.questionText,
          choices: question.choices,
          correctAnswer: question.correctAnswer,
          idPalestra: idPalestra,
        };

        try {
          const response = await fetch("http://localhost:8080/api/questoes/createquestion", {
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
      // Reseta para uma questão vazia
      setQuestions([
        { questionText: "", choices: ["", "", "", ""], correctAnswer: "" },
      ]);
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

  const clearForm = () => {
    setQuestions([
      { questionText: "", choices: ["", "", "", ""], correctAnswer: "" },
    ]);
    setMessage("");
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

      {/* Container de botões lado a lado */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {/* Adicionar Questão */}
        <button
          type="button"
          onClick={addQuestion}
          className="flex-1 min-w-[130px] h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
        >
          Adicionar Questão
        </button>

        {/* ChatComponent dentro de um div com tamanho fixo */}
        <div className="flex-1 min-w-[130px] h-12">
          <ChatComponent onReceiveQuestion={onReceiveQuestion} />
        </div>

        {/* Enviar Todas as Questões */}
        <button
          type="submit"
          className="flex-1 min-w-[130px] h-12 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
        >
          Enviar Todas as Questões
        </button>

        {/* Limpar Form */}
        <button
          type="button"
          onClick={clearForm}
          className="flex-1 min-w-[130px] h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
        >
          Limpar Form
        </button>
      </div>
    </form>
  );
}

export default QuestionsInvite;
