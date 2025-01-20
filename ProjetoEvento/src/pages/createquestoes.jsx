import { useState } from "react";

function CreateQuestoes() {
  const [enunciado, setEnunciado] = useState("");
  const [choices, setChoices] = useState(["", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [idPalestra, setIdPalestra] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!enunciado || choices.some((choice) => !choice) || !correctAnswer || !idPalestra) {
      setStatusMessage("Todos os campos são obrigatórios.");
      return;
    }

    const payload = {
      enunciado,
      choices,
      correctAnswer,
      idPalestra: parseInt(idPalestra, 10),
    };

    try {
      const response = await fetch("http://localhost:8080/api/questoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      setStatusMessage("Questão criada com sucesso!");
      setEnunciado("");
      setChoices(["", "", ""]);
      setCorrectAnswer("");
      setIdPalestra("");
    } catch (error) {
      console.error(error.message);
      setStatusMessage("Erro ao criar questão.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Criar Questão</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Enunciado:</label>
          <textarea
            value={enunciado}
            onChange={(e) => setEnunciado(e.target.value)}
            placeholder="Digite o enunciado da questão"
            rows="3"
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Alternativas:</label>
          {choices.map((choice, index) => (
            <input
              key={index}
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              placeholder={`Alternativa ${index + 1}`}
              className="w-full mb-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Resposta Correta:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Digite a resposta correta"
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">ID da Palestra:</label>
          <input
            type="text"
            value={idPalestra}
            onChange={(e) => setIdPalestra(e.target.value)}
            placeholder="Digite o ID da palestra"
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Criar Questão
        </button>
      </form>

      {statusMessage && (
        <p
          className={`mt-4 text-center font-bold ${
            statusMessage.includes("sucesso")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default CreateQuestoes;
