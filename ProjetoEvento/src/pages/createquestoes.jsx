import { useState } from "react";

function CreateQuestoes() {
  // Estados para os campos do formulário
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]); // Quatro opções padrão
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [palestraId, setPalestraId] = useState("");
  const [message, setMessage] = useState(""); // Estado para a mensagem de feedback

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        enunciado: questionText,
        choices: choices,
        correctAnswer: correctAnswer,
        idPalestra: palestraId,
      };

      const response = await fetch("http://localhost:8080/api/questoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Quiz enviado com sucesso!"); // Define a mensagem de sucesso
        // Limpar os campos após o sucesso
        setQuestionText("");
        setChoices(["", "", "", ""]);
        setCorrectAnswer("");
        setPalestraId("");
      } else {
        setMessage("Erro ao enviar o quiz."); // Define a mensagem de erro
      }
    } catch (error) {
      setMessage("Erro ao enviar a requisição."); // Define a mensagem de erro em caso de falha
      console.error("Erro ao enviar a requisição:", error);
    }
  };

  // Função para atualizar as escolhas dinamicamente
  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Criar Nova Questão</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="questionText"
          >
            Enunciado da Questão
          </label>
          <input
            type="text"
            id="questionText"
            placeholder="Digite o enunciado"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Escolhas
          </label>
          {choices.map((choice, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
          ))}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="correctAnswer"
          >
            Resposta Correta
          </label>
          <input
            type="text"
            id="correctAnswer"
            placeholder="Digite a resposta correta"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="palestraId"
          >
            ID da Palestra
          </label>
          <input
            type="text"
            id="palestraId"
            placeholder="Digite o ID da palestra"
            value={palestraId}
            onChange={(e) => setPalestraId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Criar Questão
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`mt-4 text-lg font-bold ${
            message.includes("sucesso")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CreateQuestoes;
