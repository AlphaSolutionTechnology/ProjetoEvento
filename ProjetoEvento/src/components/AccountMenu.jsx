import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false); // Estado que controla a visibilidade do menu
  const menuRef = useRef(null); // Ref para o menu
  const iconRef = useRef(null); // Ref para o ícone
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Função que alterna o estado do menu
  const handleClick = () => {
    setIsOpen((prev) => !prev); // Alterna o estado ao clicar no ícone
  };

  // Função que fecha o menu
  const handleClose = () => {
    setIsOpen(false);
  };

  // Função para ir para a página de "conectar"
  const goTo = () => {
    navigate("/conectar");
    handleClose();
  };

  // Função que verifica se o clique foi fora do menu ou ícone
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) && // Se clicou fora do menu
      iconRef.current &&
      !iconRef.current.contains(event.target) // Se clicou fora do ícone
    ) {
      handleClose(); // Fecha o menu
    }
  };

  // Adiciona o evento de clique fora quando o menu está aberto
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Ícone de conta */}
      <motion.button
        onClick={handleClick} // Alterna o estado ao clicar no ícone
        ref={iconRef} // Ref para o ícone
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="account-menu"
        aria-label="Abrir menu de conta"
        className="p-2 rounded-full bg-transparent border-2 border-gray-400 dark:border-gray-600 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <User size={32} />
      </motion.button>

      {/* Menu de conta */}
      {isOpen && (
        <motion.div
          id="account-menu"
          ref={menuRef} // Ref para o menu
          className="absolute right-0 mt-2 w-48 rounded-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg dark:bg-gray-800 dark:bg-opacity-60 dark:text-gray-200 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ul className="py-2 text-sm">
            <li>
              <button
                onClick={goTo}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                aria-label="Ir para o perfil"
              >
                <User size={20} className="mr-2" />
                Perfil
              </button>
            </li>
            <li>
              <button
                onClick={handleClose}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                aria-label="Minhas conexões"
              >
                <Users size={20} className="mr-2" />
                Minhas Conexões
              </button>
            </li>
            <li>
              <hr className="my-1 border-gray-500 dark:border-gray-600" />
            </li>
            <li>
            <button
              onClick={async () => {
                await logout(); 
                navigate("/login");
              }}
              className="flex items-center px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
              aria-label="Sair"
            >
              <LogOut size={20} className="mr-2" />
              Sair
            </button>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
