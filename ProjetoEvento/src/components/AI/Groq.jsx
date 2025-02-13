import { useState } from "react";

export default function ChatComponent() {
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
        body: JSON.stringify({ message: "Você é uma IA para criar questões. você vai receber um tema e vai retornar um JSON assim {id:/question:/choices:/correctAnswer:} o tema é comidas tipicas do NE, OBS: só me retorne UMA por chamada"  }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro no backend:", res.status, errorText);
        throw new Error(`Erro ${res.status}: ${errorText}`);
      }
  
      const data = await res.json();
      setResponse(data.choices[0]?.message?.content || "Sem resposta");
    } catch (error) {
      console.error("Erro ao chamar o backend:", error);
      setResponse("Erro ao obter resposta.");
    }
    
    setLoading(false);
  }
  
  return (
    <div>
      <h2>Resposta da IA:</h2>
      {loading ? <p>Carregando...</p> : <p>{response}</p>}
      <button onClick={fetchChatCompletion}>Obter Resposta</button>
    </div>
  );
}
