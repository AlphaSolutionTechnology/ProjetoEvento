import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import AuthContext from "../context/AuthContext";
export const WebSocketContext = createContext();

let stompClient = null;
let pingInterval = null; 

const initializeWebSocketConnection = (onMessage, reconnect, setConnected, user) => {
  if (!stompClient || !stompClient.connected) {
    //("📡 Tentando conectar ao WebSocket...");

    const socket = new SockJS(`${import.meta.env.VITE_LOCAL_API_LINK}/websocket`);
    
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      //("✅ Conectado ao WebSocket!");
      setConnected(true);

      stompClient.subscribe("/topic/ranking", (message) => {
        const parsedMessage = JSON.parse(message.body);
        //("📩 Mensagem de /topic/ranking:", parsedMessage);
        onMessage(parsedMessage);
      });

      stompClient.subscribe("/user/queue/notification", (message) => {
        const parsedMessage = JSON.parse(message.body);

        if (parsedMessage.to === user?.unique_code) {
          //("✅ Nova notificação recebida:", parsedMessage);
          onMessage(parsedMessage);
        }
      });

      if (!pingInterval) {
        pingInterval = setInterval(() => {
          if (stompClient && stompClient.connected) {
            stompClient.send("/app/ping", {}, "ping");
            //("📡 Enviando keep-alive ping para manter conexão ativa.");
          }
        }, 30000);
      }

    }, (error) => {
      console.error("❌ Erro na conexão WebSocket, tentando reconectar...", error);
      setConnected(false);
      clearInterval(pingInterval);
      pingInterval = null;
      reconnect(); 
    });
  }
};

export const WebSocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const location = useLocation();

  const addMessage = useCallback((message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const reconnect = useCallback(() => {
    const maxAttempts = 10;
    const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000);

    if (reconnectAttempts < maxAttempts) {
      //(`🔄 Tentativa de reconexão #${reconnectAttempts + 1} em ${delay / 1000}s`);
      
      setTimeout(() => {
        initializeWebSocketConnection(addMessage, reconnect, setConnected, user);
        setReconnectAttempts((prev) => prev + 1);
      }, delay);
    } else {
      //onsole.error("⛔ Número máximo de tentativas de reconexão atingido.");
    }
  }, [reconnectAttempts, addMessage, user]);

  useEffect(() => {

    if (!connected && user && location.pathname !== "/login") {
      //("🔄 Tentando conectar WebSocket...");
      initializeWebSocketConnection(addMessage, reconnect, setConnected, user);
    } else if (!user) {
      //("🛑 Usuário deslogado, desconectando WebSocket...");
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
      clearInterval(pingInterval);
      pingInterval = null;
      setConnected(false);
    }
  }, [connected, user, addMessage, reconnect, location]);

  return (
    <WebSocketContext.Provider value={{ connected, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};
