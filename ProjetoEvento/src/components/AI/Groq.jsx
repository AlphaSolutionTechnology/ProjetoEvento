// src/components/AI/Groq.jsx
import { useState } from "react";

export default function ChatComponent({ onReceiveQuestion }) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchChatCompletion() {
    setLoading(true);
  
    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: "Você é uma Ia que criar questões.Retorne somente um objeto JSON válido, sem usar blocos de código, no seguinte formato: { 'id': number, 'question': string, 'choices': string[], 'correctAnswer': string }."
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro no backend:", res.status, errorText);
        throw new Error(`Erro ${res.status}: ${errorText}`);
      }
  
      const data = await res.json();
      const content = data.choices[0]?.message?.content || "Sem resposta";
      setResponse(content);
      
      // Tenta interpretar o conteúdo como JSON
      let questionData = null;
      try {
        questionData = JSON.parse(content);
      } catch (error) {
        console.error("Erro ao parsear JSON:", error);
      }

      // Se obteve uma questão válida e a callback foi informada, passa os dados para o componente pai
      if (questionData && onReceiveQuestion) {
        console.log("Questão recebida do Groq.jsx:", questionData);
        onReceiveQuestion(questionData);
      }
    } catch (error) {
      console.error("Erro ao chamar o backend:", error);
      setResponse("Erro ao obter resposta.");
    }
    
    setLoading(false);
  }
  
  return (
    <div className="mt-4">
      <h2>Criar com IA</h2>
      <button onClick={fetchChatCompletion}>Obter Resposta</button>
    </div>
  );
}
