import React, { createContext, useState, useEffect, useCallback } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const WebSocketContext = createContext();

let stompClient = null;

const initializeWebSocketConnection = (onMessage, onDisconnect, setConnected) => {
  if (!stompClient || !stompClient.connected) {
    const socket = new SockJS("http://localhost:8080/websocket");
    stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("Conectado ao WebSocket!");
        setConnected(true); // Atualiza o estado para indicar que está conectado

        // Inscreve-se no canal global para mensagens
        stompClient.subscribe("/topic/messages", (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            onMessage(parsedMessage);
          } catch (error) {
            console.error("Erro ao processar mensagem global:", error);
          }
        });

        stompClient.subscribe("/user/queue/notification", (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            const currentUserId = JSON.parse(localStorage.getItem("user_data")).unique_code;
        
            // Verifica se a mensagem pertence ao usuário logado
            if (parsedMessage.to === currentUserId) {
              console.log("Nova notificação recebida:", parsedMessage);
              onMessage(parsedMessage); // Adiciona como notificação válida
            } else {
              console.log("Mensagem de sucesso ignorada:", parsedMessage);
              // Mensagem de sucesso ignorada, pois não é uma notificação válida
            }
          } catch (error) {
            console.error("Erro ao processar mensagem privada:", error);
          }
        });
        
      },
      (error) => {
        console.error("Erro ao conectar ao WebSocket:", error);
        setConnected(false); // Indica que a conexão foi perdida
        onDisconnect(); // Chama a função de reconexão
      }
    );

    // Detectar desconexões
    stompClient.onclose = () => {
      console.warn("WebSocket desconectado.");
      setConnected(false);
      onDisconnect(); // Chama a função de reconexão
    };
  }
};

export const WebSocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  // Adiciona uma nova mensagem ao estado
  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Função de reconexão
  const reconnect = useCallback(() => {
    if (reconnectAttempts < 5) { // Limita o número de tentativas
      console.log(`Tentativa de reconexão #${reconnectAttempts + 1}`);
      setReconnectAttempts((prev) => prev + 1);
      setTimeout(() => {
        initializeWebSocketConnection(addMessage, reconnect, setConnected);
      }, 3000); // Aguarda 3 segundos antes de tentar reconectar
    } else {
      console.error("Número máximo de tentativas de reconexão atingido.");
    }
  }, [reconnectAttempts, addMessage]);

  // Configuração inicial da conexão
  const setupConnection = useCallback(() => {
    initializeWebSocketConnection(addMessage, reconnect, setConnected);
  }, [addMessage, reconnect]);

  // Função para enviar mensagens ao servidor
  const sendMessage = useCallback((destination, message) => {
    if (stompClient && stompClient.connected) {
      try {
        stompClient.send(destination, {}, JSON.stringify(message));
        console.log("Mensagem enviada:", message);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    } else {
      console.error("WebSocket não está conectado. Mensagem não enviada.");
    }
  }, []);

  // Efeito para inicializar a conexão
  useEffect(() => {
    if (!connected) {
      setupConnection();
    }
  }, [connected, setupConnection]);

  // Expondo valores via contexto
  return (
    <WebSocketContext.Provider
      value={{
        connected,
        messages,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
