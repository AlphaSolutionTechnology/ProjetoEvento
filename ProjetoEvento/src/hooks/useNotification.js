import { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "../context/WebSocketContext";

function useNotifications() {
  const { messages } = useContext(WebSocketContext);
  const [notifications, setNotifications] = useState([]);
  const [animateBadge, setAnimateBadge] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1]; // Última mensagem recebida
      const currentUser = JSON.parse(localStorage.getItem("user_data"))?.unique_code;

      console.log("🔔 Nova mensagem WebSocket recebida:", newMessage);

      if (newMessage.to === currentUser) {
        setNotifications((prev) => {
          // Verifica se a notificação já existe pelo userId
          const isDuplicate = prev.some((notification) => notification.userId === newMessage.from);

          if (!isDuplicate) {
            console.log("✅ Adicionando nova notificação:", newMessage);
            return [...prev, {
              userId: newMessage.from, 
              name: newMessage.name || "Desconhecido", // Agora usamos `name` diretamente
              message: newMessage.message
            }];
          }
          return prev;
        });

        // Animação do Badge
        setAnimateBadge(true);
        setTimeout(() => setAnimateBadge(false), 1000);
      }
    }
  }, [messages]);

  // Carregar notificações do backend ao iniciar
  useEffect(() => {
    fetch(`${import.meta.env.VITE_NETWORK_API_LINK}/api/connection/retrieveconnectionrequest`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.server) {
          setNotifications((prev) => {
            const uniqueNotifications = data.server.filter(
              (notification) => !prev.some((n) => n.userId === notification.userId)
            );
            return [...prev, ...uniqueNotifications];
          });
        }
      })
      .catch((error) => console.error("❌ Erro ao buscar notificações:", error));
  }, []);

  return { notifications, setNotifications, animateBadge };
}

export default useNotifications;
