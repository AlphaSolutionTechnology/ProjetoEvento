import React, { useState } from "react";
import { FiFile } from "react-icons/fi";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `
        Olá! Sou o QuizBuddy, seu assistente para criar quizzes. 
        Aqui estão as instruções para criar questões incríveis:

        1️⃣ Defina o enunciado: Escreva a pergunta de forma clara e objetiva.
        2️⃣ Crie as opções de resposta: Forneça até 4 alternativas para a questão.
        3️⃣ Escolha a resposta correta: Indique qual das opções é a correta.
        4️⃣ Envie ou edite: Você pode revisar antes de enviar.

        🚀 Dica: Use o botão de upload para enviar um PDF com conteúdo e eu posso ajudar a criar perguntas automaticamente!

        Vamos começar? Envie sua primeira pergunta ou me peça ajuda! 😊
      `,
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [file, setFile] = useState(null);

  const mockIaResponse = async (userMessage) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return `Resposta para: "${userMessage}" gerada pelo QuizBuddy.`;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = {
      role: "user",
      content: userInput.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    const iaContent = await mockIaResponse(newMessage.content);
    const iaMessage = {
      role: "assistant",
      content: iaContent,
    };

    setMessages((prev) => [...prev, iaMessage]);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `Arquivo "${uploadedFile.name}" carregado.` },
        { role: "assistant", content: "Recebi o PDF! Vou processá-lo." },
      ]);
    } else {
      alert("Envie apenas arquivos em formato PDF.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Cabeçalho do chat */}
      <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md font-bold text-center md:text-left md:flex md:items-center md:justify-between transition-colors">
        <h1 className="text-lg">QuizBuddy - Seu assistente para criar quizzes!</h1>
      </header>

      {/* Área de mensagens */}
      <main className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          const bubbleClass = isUser
            ? "bg-blue-500 text-white self-end rounded-br-md shadow-md"
            : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100 self-start rounded-bl-md shadow-md";

          return (
            <div
              key={index}
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl my-2 p-3 rounded-xl ${bubbleClass}`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {msg.content}
            </div>
          );
        })}
      </main>

      {/* Área de input e upload */}
      <footer className="p-4 bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 shadow-inner">
        <div className="flex items-center">
          {/* Botão de upload de arquivo */}
          <div className="relative">
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FiFile size={24} />
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Campo de texto */}
          <textarea
            className="flex-1 ml-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={1}
            placeholder="Digite sua mensagem..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Botão de enviar mensagem */}
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </footer>
    </div>
  );
}
