import React, { useRef, useEffect } from "react";
import { LogOut, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

export default function AccountMenu({ isOpen }) {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const goTo = () => {
    navigate("/perfil");
  };

  const navTo = () => {
    navigate("/conectar");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      isOpen = false;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null; // Não renderiza se não estiver aberto

  return (
    <motion.div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 rounded-lg bg-white bg-opacity-60 backdrop-blur-md shadow-lg dark:bg-gray-800 dark:bg-opacity-30 dark:text-gray-200 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <ul className="py-2 text-sm">
        {/* Opção de perfil */}
        <li>
          <button
            onClick={goTo}
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
          >
            <User size={20} className="mr-2 text-gray-900 dark:text-white" />
            <span className="text-gray-900 dark:text-white">Perfil</span>
          </button>
        </li>

        {/* Opção de conexões */}
        <li>
          <button
            onClick={navTo}
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
          >
            <Users size={20} className="mr-2 text-gray-900 dark:text-white" />
            <span className="text-gray-900 dark:text-white">Fazer Conexão</span>
          </button>
        </li>

        {/* Linha separadora */}
        <li>
          <hr className="my-1 border-gray-500 dark:border-gray-600" />
        </li>

        {/* Opção de logout */}
        <li>
          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            className="flex items-center px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
          >
            <LogOut size={20} className="mr-2 text-red" />
            <span className="text-red dark:text-white">Sair</span>
          </button>
        </li>
      </ul>
    </motion.div>
  );
}
