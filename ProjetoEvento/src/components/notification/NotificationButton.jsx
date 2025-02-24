import React, { useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "./Badge";
import NotificationItem from "./NotificationItem";
import useNotifications from "../../hooks/useNotification";

export default function NotificationButton() {
  const { notifications, setNotifications, animateBadge } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleAccept = async (userId) => {
    const userUniqueCode = JSON.parse(
      localStorage.getItem("user_data")
    )?.unique_code;
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_LOCAL_API_LINK
        }/api/connection/answerconnectionrequest`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: userUniqueCode,
            from: userId,
            status: "ACCEPTED",
          }),
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.filter((notification) => notification.userId !== userId)
        );
      } else {
        console.error("Erro ao aceitar conexão:", await response.text());
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  const handleDeny = async (userId) => {
    const userUniqueCode = JSON.parse(
      localStorage.getItem("user_data")
    )?.unique_code;

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_LOCAL_API_LINK
        }/api/connection/answerconnectionrequest`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: userUniqueCode,
            from: userId,
            status: "DECLINED",
          }),
        }
      );
      if (response.ok) {
        setNotifications((prev) =>
          prev.filter((notification) => notification.userId !== userId)
        );
      } else {
        console.error("Erro ao recusar conexão:", await response.text());
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  return (
    <div className="relative">
      {/* Botão do sino com Badge */}
      <motion.button
        className="relative flex items-center justify-center p-2 rounded-full transition duration-200 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={toggleDropdown}
        whileTap={{ scale: 0.9 }}
      >
        <Bell size={24} className="text-gray-800 dark:text-gray-200" />
      </motion.button>

      {/* Badge reposicionada corretamente */}
      {notifications.length > 0 && (
        <Badge count={notifications.length} animateBadge={animateBadge} />
      )}

      {/* Dropdown de notificações */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-0 mx-auto mt-3 w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-xl rounded-xl overflow-hidden z-50 sm:absolute sm:right-0 sm:left-auto sm:transform-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 text-lg font-bold text-gray-800 dark:text-gray-100">
              Pedidos de Conexão
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
              <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
                Nenhuma notificação
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
