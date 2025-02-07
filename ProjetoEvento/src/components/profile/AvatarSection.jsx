// path: src/components/profile/AvatarSection.jsx

import React from "react";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const AvatarSection = ({ userData }) => {
  const { darkMode } = useTheme();
  const backgroundColor = darkMode ? "bg-gray-800" : "bg-gray-200";
  const textColor = darkMode ? "text-white" : "text-gray-800";

  return (
    <div className="text-center mb-8">
      <motion.div
        className={`inline-block rounded-full ${backgroundColor} ${textColor} mb-4`}
        style={{ width: "100px", height: "100px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Adicionando a imagem do avatar caso exista */}
        {userData?.avatar ? (
          <img
            src={userData.avatar}
            alt="Avatar"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl flex items-center justify-center h-full w-full">
            {userData?.name?.[0] || "U"}
          </span>
        )}
      </motion.div>
      <motion.p
        className={`text-lg ${textColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {userData?.name || "Usuário"}
      </motion.p>
    </div>
  );
};

export default AvatarSection;
