import QuestionItem from "./QuestionItem";

function QuestionsInvite({ questions, setQuestions, idPalestra, setMessage }) {
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

  // Adiciona uma nova questão vazia
  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", choices: ["", "", "", ""], correctAnswer: "" }]);
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
