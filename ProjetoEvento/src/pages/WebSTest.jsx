import React, { useContext, useState } from "react";
import { WebSocketContext } from "../context/WebSocketContext";

const WebSTest = () => {
  const { messages, sendMessage, connected } = useContext(WebSocketContext);
  const [messageToSend, setMessageToSend] = useState("");
  const [recipient, setRecipient] = useState(""); // Adiciona o destinatário

  const handleSendMessage = () => {
    if (messageToSend.trim() !== "" && recipient.trim() !== "") {
      // Envia a mensagem para o canal privado do destinatário
      sendMessage("/app/sendrequest", {
        to: recipient, // Nome ou ID do destinatário
        content: messageToSend, // Conteúdo da mensagem
      });
      setMessageToSend("");
    }
  };

  console.log("Mensagens no WebSTest:", messages); // Debug para garantir que está recebendo

  return (
    <div style={{ padding: "20px" }}>
      <h1>WebSocket Private Messaging Test</h1>
      {connected ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Destinatário"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={{ padding: "10px", width: "300px", marginRight: "10px" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Digite sua mensagem"
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
              style={{ padding: "10px", width: "300px", marginRight: "10px" }}
            />
            <button onClick={handleSendMessage} style={{ padding: "10px" }}>
              Enviar
            </button>
          </div>
          <div>
            <h2>Mensagens Recebidas:</h2>
            <ul>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <li key={index}>{msg.content || msg}</li>
                ))
              ) : (
                <p>Nenhuma mensagem recebida ainda.</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <h2>Conectando ao WebSocket...</h2>
      )}
    </div>
  );
};

export default WebSTest;
