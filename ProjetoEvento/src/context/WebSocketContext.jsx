import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import AuthContext from "../context/AuthContext";
export const WebSocketContext = createContext();

let stompClient = null;
let pingInterval = null;

const initializeWebSocketConnection = (
  onMessage,
  reconnect,
  setConnected,
  user
) => {
  if (!stompClient || !stompClient.connected) {
    const socket = new SockJS(
      `${import.meta.env.VITE_LOCAL_API_LINK}/websocket`
    );

    stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        setConnected(true);

        // Assinatura do tópico onde a liberação do quiz será notificada
        stompClient.subscribe("/topic/quizz-liberado", (message) => {
          const parsedMessage = JSON.parse(message.body);
          onMessage(parsedMessage); // Enviar para o participante que o quiz foi liberado
        });

        stompClient.subscribe("/topic/ranking", (message) => {
          const parsedMessage = JSON.parse(message.body);

          onMessage(parsedMessage);
        });

        stompClient.subscribe("/user/queue/notification", (message) => {
          const parsedMessage = JSON.parse(message.body);

          if (parsedMessage.to === user?.unique_code) {
            onMessage(parsedMessage);
          }
        });

        if (!pingInterval) {
          pingInterval = setInterval(() => {
            if (stompClient && stompClient.connected) {
              stompClient.send("/app/ping", {}, "ping");
            }
          }, 30000);
        }
      },
      (error) => {
        console.error(
          "❌ Erro na conexão WebSocket, tentando reconectar...",
          error
        );
        setConnected(false);
        clearInterval(pingInterval);
        pingInterval = null;
        reconnect();
      }
    );
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
      setTimeout(() => {
        initializeWebSocketConnection(
          addMessage,
          reconnect,
          setConnected,
          user
        );
        setReconnectAttempts((prev) => prev + 1);
      }, delay);
    }
  }, [reconnectAttempts, addMessage, user]);

  useEffect(() => {
    if (!connected && user && location.pathname !== "/login") {
      initializeWebSocketConnection(addMessage, reconnect, setConnected, user);
    } else if (!user) {
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
