import { useState, useCallback } from "react";
import QuestionItem from "./QuestionItem";
import pdfToText from "react-pdftotext";

function QuestionsInvite({
  questions,
  setQuestions,
  idPalestra,
  setMessage,
}) {
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [questionCount, setQuestionCount] = useState("2");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState("");

  // Extrai texto do PDF
  const handleExtractText = async (file) => {
    try {
      const text = await pdfToText(file);
      setPdfText(text);
    } catch (error) {
      console.error("Erro ao extrair texto do PDF:", error);
      setPdfText("");
    }
  };

  // Seleção de arquivo PDF
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      handleExtractText(file);
    } else {
      alert("Por favor, selecione um arquivo PDF válido.");
    }
  };

  // Geração de questões via IA
  const handleFetchChatCompletion = useCallback(async () => {
    if (!pdfText.trim() && questions.length === 0) {
      alert("Erro: Nenhum texto extraído do PDF e nenhuma questão existente.");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await fetch("http://localhost:8080/api/AI/requestquestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: pdfText, // Texto extraído do PDF
          questionCount: questionCount || "2",
          existingQuestions: questions // Enviando as questões existentes
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ${res.status}: ${errorText}`);
      }
  
      const data = await res.json();
  
      if (Array.isArray(data)) {
        const formattedQuestions = data.map((q) => ({
          questionText: q.question || "",
          choices: q.choices || ["", "", "", ""],
          correctAnswer: q.correctAnswer || "",
        }));
  
        setQuestions((prevQuestions) => [...prevQuestions, ...formattedQuestions]);
      } else {
        console.warn("A resposta da API não está no formato esperado:", data);
      }
    } catch (error) {
      console.error("Erro ao gerar questões:", error);
    } finally {
      setLoading(false);
      setShowPrompt(false);
      setQuestionCount("2");
      setPdfFile(null);
      setPdfText("");
    }
  }, [questionCount, pdfText, questions, setQuestions]);
  
  // Envio das questões para o backend
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

      {/* Botões */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {/* Adicionar Questão */}
        <button
          type="button"
          onClick={addQuestion}
          className="flex-1 min-w-[130px] h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
        >
          Adicionar Questão
        </button>

        {/* Criar Questões com IA */}
        <button
          type="button"
          onClick={() => setShowPrompt(true)}
          disabled={loading}
          className="flex-1 min-w-[130px] h-12 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Carregando..." : "Criar com IA"}
        </button>

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

      {/* Modal para entrada de IA */}
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
    </form>
  );
}

export default QuestionsInvite;
