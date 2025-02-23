// src/components/notification/useNotifications.js
import { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "../context/WebSocketContext";
function useNotifications() {
  const { messages } = useContext(WebSocketContext);
  const [notifications, setNotifications] = useState([]);
  const [animateBadge, setAnimateBadge] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1];
      const currentUser = JSON.parse(
        localStorage.getItem("user_data")
      )?.unique_code;

      if (newMessage.name && newMessage.to === currentUser) {
        setNotifications((prev) => {
          const isDuplicate = prev.some(
            (notification) => notification.userId === newMessage.from
          );
          if (!isDuplicate) {
            return [...prev, { ...newMessage, userId: newMessage.from }];
          }
          return prev;
        });

        setAnimateBadge(true);
        setTimeout(() => setAnimateBadge(false), 1000);
      }
    }
  }, [messages]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_NETWORK_API_LINK}/api/connection/retrieveconnectionrequest`, {
      method: "GET",
      credentials: "include",
    })
    fetch(
      `${import.meta.env.VITE_NETWORK_API_LINK}
/api/connection/retrieveconnectionrequest`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.server) {
          setNotifications((prev) => {
            const uniqueNotifications = data.server.filter(
              (notification) =>
                !prev.some((n) => n.userId === notification.userId)
            );
            return [...prev, ...uniqueNotifications];
          });
        }
      })
      .catch((error) => console.error("Erro ao buscar notificações:", error));
  }, []);

  return { notifications, setNotifications, animateBadge }; // ✅ Adicionado setNotifications
}

export default useNotifications;
