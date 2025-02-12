import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function NotificationItem({ notification, onConfirm, onDeny }) {
  return (
    <motion.div
      className="relative z-50 flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-white/30 dark:bg-gray-800/50 shadow-md backdrop-blur-md transition hover:shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md overflow-visible "
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ícone circular com inicial do nome */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm sm:text-lg">
        {notification.name?.charAt(0) || "?"}
      </div>

      {/* Nome e sobrenome */}
      <div className="flex-1 text-xs sm:text-sm">
        <p className="font-semibold text-gray-800 dark:text-gray-200">
          {notification.name?.split(" ")[0] || "Desconhecido"}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          {notification.name?.split(" ")[1] || ""}
        </p>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-1 sm:gap-2">
        <motion.button
          className="p-1.5 sm:p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            onConfirm(notification.userId);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Check size={14} />
        </motion.button>

        <motion.button
          className="p-1.5 sm:p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            onDeny(notification.userId);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}
