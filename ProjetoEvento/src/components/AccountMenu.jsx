import React, { useState, useRef, useEffect } from "react";
import { LogOut, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false); 
  const menuRef = useRef(null); 
  const iconRef = useRef(null); 
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleClick = () => {
    setIsOpen((prev) => !prev); 
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const goTo = () => {
    navigate("/conectar");
    handleClose();
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) && 
      iconRef.current &&
      !iconRef.current.contains(event.target) 
    ) {
      handleClose(); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-999">
      
      {/* Botão para abrir/fechar o menu de conta */}
      <motion.button
        onClick={handleClick} 
        ref={iconRef} 
        aria-expanded={isOpen ? "true" : "false"} // Indica se o menu está aberto
        aria-controls="account-menu" // Relaciona o botão ao menu
        aria-label="Abrir menu de conta" // Descrição acessível para leitores de tela
        className="p-2 rounded-full border-gray-400 dark:border-gray-800 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
        whileTap={{ scale: 0.95 }} // Animação ao clicar no botão
      >
        <User size={32} className="text-gray-700 dark:text-white" /> {/* Ícone do usuário */}
      </motion.button>
  
      {/* Menu de conta visível */}
      {isOpen && (
        <motion.div
          id="account-menu"
          ref={menuRef} 
          className="absolute right-0 mt-2 w-48 rounded-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg dark:bg-gray-800 dark:bg-opacity-60 dark:text-gray-200 z-50"
          initial={{ opacity: 0, y: -10 }} // Inicia invisível e acima
          animate={{ opacity: 1, y: 0 }} // Aparece com transição suave
          exit={{ opacity: 0, y: -10 }} // Desaparece com transição suave
          transition={{ duration: 0.2 }} // Duração da animação
        >
          <ul className="py-2 text-sm">

            {/* Opção de perfil */}
            <li>
              <button
                onClick={goTo}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                aria-label="Ir para o perfil"
              >
                <User size={20} className="mr-2 text-gray-900 dark:text-white" />
                <span className="text-gray-900 dark:text-white">Perfil</span>
              </button>
            </li>
  
            {/* Opção de conexões */}
            <li>
              <button
                onClick={handleClose}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                aria-label="Minhas conexões"
              >
                <Users size={20} className="mr-2 text-gray-900 dark:text-white" />
                <span className="text-gray-900 dark:text-white">Minhas Conexões</span>
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
                aria-label="Sair"
              >
                <LogOut size={20} className="mr-2 text-red" />
                <span className="text-gray-900 dark:text-white">Sair</span>
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
