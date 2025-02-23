// path: src/context/WebSocketContext.jsx

import React, { createContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const WebSocketContext = createContext();

let stompClient = null;

// Remova a checagem de user_data aqui
const initializeWebSocketConnection = (
  onMessage,
  onDisconnect,
  setConnected
) => {
  if (!stompClient || !stompClient.connected) {
    const socket = new SockJS(
      `${import.meta.env.VITE_LOCAL_API_LINK}/websocket`
    );
    stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("Conectado ao WebSocket!");
        setConnected(true);

        // Inscrição em canais
        stompClient.subscribe("/topic/ranking", (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            console.log("Mensagem recebida de /topic/ranking:", parsedMessage);
            onMessage(parsedMessage);
          } catch (error) {
            console.error("Erro ao processar mensagem global:", error);
          }
        });

        stompClient.subscribe("/user/queue/notification", (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            const currentUserId = JSON.parse(
              localStorage.getItem("user_data")
            ).unique_code;

            console.log("Mensagem privada recebida:", parsedMessage);

            if (parsedMessage.to === currentUserId) {
              console.log("Nova notificação recebida:", parsedMessage);
              onMessage(parsedMessage);
            } else {
              console.log(
                "Mensagem ignorada (não é do usuário atual):",
                parsedMessage
              );
            }
          } catch (error) {
            console.error("Erro ao processar mensagem privada:", error);
          }
        });
      },
      (error) => {
        console.error("Erro ao conectar ao WebSocket:", error);
        setConnected(false);
        onDisconnect();
      }
    );

    stompClient.onclose = () => {
      console.warn("WebSocket desconectado.");
      setConnected(false);
      onDisconnect();
    };
  }
};

export const WebSocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const location = useLocation();
  const userData = localStorage.getItem("user_data");

  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const reconnect = useCallback(() => {
    if (reconnectAttempts < 5) {
      console.log(`Tentativa de reconexão #${reconnectAttempts + 1}`);
      setReconnectAttempts((prev) => prev + 1);
      setTimeout(() => {
        initializeWebSocketConnection(addMessage, reconnect, setConnected);
      }, 3000);
    } else {
      console.error("Número máximo de tentativas de reconexão atingido.");
    }
  }, [reconnectAttempts, addMessage]);

  const setupConnection = useCallback(() => {
    initializeWebSocketConnection(addMessage, reconnect, setConnected);
  }, [addMessage, reconnect]);

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

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (!connected && userData) {
      setupConnection();
    }
  }, [userData, connected, setupConnection]);

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
