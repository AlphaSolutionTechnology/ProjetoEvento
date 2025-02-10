import React, { useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "./Badge";
import NotificationItem from "./NotificationItem";
import useNotifications from "../../hooks/useNotification";

export default function NotificationButton() {
  const { notifications, setNotifications, animateBadge } = useNotifications();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  // Função para aceitar um pedido de conexão
  const handleAccept =  async (userId) => {
    const userUniqueCode = await JSON.parse(localStorage.getItem("user_data")).unique_code;
    try {
      const response = await fetch("http://localhost:8080/api/connection/answerconnectionrequest", {
        method: "PATCH",
        credentials: "include", // Para enviar o cookie de autenticação
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: userUniqueCode, 
          from: userId, 
          status: "ACCEPTED",
        }),
      });
      console.log(response.status)
      if (response.ok) {
        setNotifications((prev) => prev.filter((notification) => notification.userId !== userId));
      } else {
        console.error("Erro ao aceitar conexão:",  response);
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  // Função para recusar um pedido de conexão
  const handleDeny = async (userId) => {
    const userUniqueCode = await JSON.parse(localStorage.getItem("user_data")).unique_code;
    try {
      const response = await fetch("http://localhost:8080/api/connection/answerconnectionrequest", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: userUniqueCode, 
          from: userId, // Substitua pelo ID real do usuário atual
          status: "DECLINED",
        }),
      });
      if (response.ok) {
        console.log(`Pedido de conexão recusado para: ${userId}`);
        setNotifications((prev) => prev.filter((notification) => notification.userId !== userId));
      } else {
        console.error("Erro ao recusar conexão:", await response.text());
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  return (
    <div className="relative">
      <Badge count={notifications.length} animateBadge={animateBadge} />

      <button
        className="p-2 bg-transparent text-black rounded-full hover:bg-gray-200"
        aria-label="notifications"
        onClick={handleClick}
      >
        <Bell size={24} />
      </button>

      {anchorEl && (
        <motion.div
          className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border-b text-lg font-bold text-gray-700">
            Pedido de Conexão
          </div>

          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <NotificationItem
                key={notification.userId || index}
                notification={notification}
                onConfirm={() => handleAccept(notification.userId)}
                onDeny={() => handleDeny(notification.userId)}
              />
            ))
          ) : (
            <div className="p-4 text-gray-500">Nenhuma notificação</div>
          )}
        </motion.div>
      )}
    </div>
  );
}
