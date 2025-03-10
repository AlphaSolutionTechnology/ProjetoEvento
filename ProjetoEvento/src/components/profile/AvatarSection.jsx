import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const AvatarSection = ({ userData }) => {
  const { darkMode } = useTheme();
  const backgroundColor = darkMode ? "bg-gray-800" : "bg-gray-200";
  const textColor = darkMode ? "text-white" : "text-gray-800";

  // Estado para armazenar o avatar
  const [avatar, setAvatar] = useState(null);

  // Efeito para carregar o avatar do localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data")).avatar
      : null;

    if (savedAvatar) {
      setAvatar(savedAvatar); // Carrega o avatar salvo no localStorage
    } else if (userData?.name) {
      // Gera um avatar padrão com a inicial do nome
      const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`;
      setAvatar(defaultAvatar);
    }
  }, [userData]);

  return (
    <div className="text-center mb-8">
      <motion.div
        className={`inline-block rounded-full ${backgroundColor} ${textColor} mb-4`}
        style={{ width: "100px", height: "100px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Exibe o avatar ou a inicial do nome */}
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl flex items-center justify-center h-full w-full">
            {userData?.name?.[0][1] || "U"}
          </span>
        )}
      </motion.div>
      <motion.p
        className={`text-lg ${textColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {userData?.name ? userData.name.split(' ').slice(0, 2).join(' ') : "Usuário"}
      </motion.p>
    </div>
  );
};

export default AvatarSection;